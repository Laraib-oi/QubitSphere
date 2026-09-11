import type {
  CircuitIR,
  CircuitSimulationResponse,
  CircuitValidationResponse,
} from "@/types/circuit";

class CircuitApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "CircuitApiError";
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isPositiveInteger(value: unknown): value is number {
  return isFiniteNumber(value) && Number.isInteger(value) && value > 0;
}

function isCountMap(value: unknown): value is Record<string, number> {
  return (
    isRecord(value) &&
    Object.values(value).every(
      (count) => isFiniteNumber(count) && Number.isInteger(count) && count >= 0
    )
  );
}

function isProbabilityMap(value: unknown): value is Record<string, number> {
  return (
    isRecord(value) &&
    Object.values(value).every(
      (probability) =>
        isFiniteNumber(probability) && probability >= 0 && probability <= 1
    )
  );
}

function isFiniteNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isFiniteNumber);
}

function apiErrorFromPayload(payload: unknown): CircuitApiError {
  if (isRecord(payload) && isRecord(payload.error)) {
    const { code, message } = payload.error;
    if (isNonEmptyString(code) && isNonEmptyString(message)) {
      return new CircuitApiError(code, message);
    }
  }

  return new CircuitApiError(
    "MALFORMED_RESPONSE",
    "The backend returned an invalid error response."
  );
}

function apiBaseUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredUrl) {
    throw new CircuitApiError(
      "API_CONFIGURATION_ERROR",
      "The QubitSphere API URL is not configured."
    );
  }

  return configuredUrl.replace(/\/$/, "");
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl()}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new CircuitApiError(
      "BACKEND_UNAVAILABLE",
      "QubitSphere could not reach the backend. Check that the API is running."
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new CircuitApiError(
      "MALFORMED_RESPONSE",
      "The backend returned a response QubitSphere could not understand."
    );
  }

  if (!response.ok) {
    throw apiErrorFromPayload(payload);
  }

  return payload as T;
}

function assertValidationResponse(
  response: CircuitValidationResponse
): CircuitValidationResponse {
  if (!isRecord(response) || typeof response.success !== "boolean") {
    throw new CircuitApiError(
      "MALFORMED_RESPONSE",
      "The validation response was missing its success status."
    );
  }

  if (!response.success) {
    throw apiErrorFromPayload(response);
  }

  if (
    !isRecord(response.data) ||
    typeof response.data.valid !== "boolean" ||
    !Array.isArray(response.data.errors) ||
    !response.data.errors.every(
      (error) =>
        isRecord(error) &&
        isNonEmptyString(error.code) &&
        isNonEmptyString(error.message)
    )
  ) {
    throw new CircuitApiError(
      "MALFORMED_RESPONSE",
      "The validation response did not contain validation data."
    );
  }

  return response;
}

function assertSimulationResponse(
  response: CircuitSimulationResponse
): CircuitSimulationResponse {
  if (!isRecord(response) || typeof response.success !== "boolean") {
    throw new CircuitApiError(
      "MALFORMED_RESPONSE",
      "The simulation response was missing its success status."
    );
  }

  if (!response.success) {
    throw apiErrorFromPayload(response);
  }

  const result = response.data;
  if (
    !isRecord(result) ||
    !isPositiveInteger(result.shots) ||
    !isNonEmptyString(result.backend) ||
    !isCountMap(result.counts) ||
    !isProbabilityMap(result.probabilities) ||
    !isFiniteNumberArray(result.statevector)
  ) {
    throw new CircuitApiError(
      "MALFORMED_RESPONSE",
      "The simulation response did not contain a verified result."
    );
  }

  return response;
}

export async function validateCircuit(
  circuit: CircuitIR
): Promise<CircuitValidationResponse> {
  const response = await postJson<CircuitValidationResponse>(
    "/api/circuit/validate",
    { circuit }
  );

  return assertValidationResponse(response);
}

export async function simulateCircuit(
  circuit: CircuitIR
): Promise<CircuitSimulationResponse> {
  const response = await postJson<CircuitSimulationResponse>(
    "/api/circuit/simulate",
    { circuit }
  );

  return assertSimulationResponse(response);
}

export { CircuitApiError };
