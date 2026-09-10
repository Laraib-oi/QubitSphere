export type CircuitMetadata = Record<string, unknown>;

export type CircuitOperation = {
  gate: string;
  targets?: number[];
  control?: number;
  target?: number;
  parameters?: Record<string, number>;
  position?: number;
  label?: string;
};

export type CircuitIR = {
  version: string;
  id?: string;
  name?: string;
  qubits: number;
  classicalBits: number;
  operations: CircuitOperation[];
  measurements: number[];
  metadata?: CircuitMetadata;
};

export type CircuitValidationError = {
  code: string;
  message: string;
  operationIndex?: number;
};

export type CircuitValidationResult = {
  valid: boolean;
  errors: CircuitValidationError[];
};
