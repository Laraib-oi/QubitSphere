"use client";

import { useMemo, useState } from "react";

import { CircuitApiError, simulateCircuit, validateCircuit } from "@/lib/circuit-api";
import { CircuitCanvas } from "@/components/CircuitCanvas";
import { ResultsPanel } from "@/components/ResultsPanel";
import type {
  CircuitIR,
  CircuitOperation,
  CircuitSimulationResult,
  CircuitValidationResult,
} from "@/types/circuit";

const BELL_STATE: CircuitIR = {
  version: "1.0",
  name: "Bell State",
  qubits: 2,
  classicalBits: 2,
  operations: [
    { gate: "H", targets: [0], position: 0 },
    { gate: "CX", control: 0, target: 1, position: 1 },
  ],
  measurements: [0, 1],
  metadata: {
    algorithm: "bell-state",
    difficulty: "beginner",
  },
};

type RequestState = "idle" | "loading" | "success" | "error";

function normalizeOperations(operations: CircuitOperation[]): CircuitOperation[] {
  return operations.map((operation, position) => ({ ...operation, position }));
}

export function CircuitLab() {
  const [circuit, setCircuit] = useState<CircuitIR>(BELL_STATE);
  const [selectedOperationIndex, setSelectedOperationIndex] = useState<number | null>(0);
  const [targetQubit, setTargetQubit] = useState(0);
  const [validationState, setValidationState] = useState<RequestState>("idle");
  const [validationResult, setValidationResult] =
    useState<CircuitValidationResult | null>(null);
  const [validationError, setValidationError] = useState("");
  const [simulationState, setSimulationState] = useState<RequestState>("idle");
  const [simulationResult, setSimulationResult] =
    useState<CircuitSimulationResult | null>(null);
  const [simulationError, setSimulationError] = useState("");

  const selectedOperation = useMemo(
    () =>
      selectedOperationIndex === null
        ? null
        : circuit.operations[selectedOperationIndex] ?? null,
    [circuit.operations, selectedOperationIndex]
  );

  function updateCircuit(nextOperations: CircuitOperation[]) {
    setCircuit((current) => ({
      ...current,
      operations: normalizeOperations(nextOperations),
    }));
    setValidationState("idle");
    setValidationResult(null);
    setValidationError("");
    setSimulationState("idle");
    setSimulationResult(null);
    setSimulationError("");
  }

  function loadBellState() {
    setCircuit({
      ...BELL_STATE,
      operations: BELL_STATE.operations.map((operation) => ({ ...operation })),
      metadata: { ...BELL_STATE.metadata },
    });
    setSelectedOperationIndex(0);
    setTargetQubit(0);
    setValidationState("idle");
    setValidationResult(null);
    setValidationError("");
    setSimulationState("idle");
    setSimulationResult(null);
    setSimulationError("");
  }

  function addSingleQubitGate(gate: "H" | "X") {
    const nextOperations = [
      ...circuit.operations,
      { gate, targets: [targetQubit] },
    ];
    updateCircuit(nextOperations);
    setSelectedOperationIndex(nextOperations.length - 1);
  }

  function addControlledNot() {
    const nextOperations = [
      ...circuit.operations,
      { gate: "CX", control: 0, target: 1 } as CircuitOperation,
    ];
    updateCircuit(nextOperations);
    setSelectedOperationIndex(nextOperations.length - 1);
  }

  function removeSelectedOperation() {
    if (selectedOperationIndex === null) {
      return;
    }

    const nextOperations = circuit.operations.filter(
      (_, index) => index !== selectedOperationIndex
    );
    updateCircuit(nextOperations);
    setSelectedOperationIndex(nextOperations.length ? nextOperations.length - 1 : null);
  }

  async function requestValidation(): Promise<CircuitValidationResult | null> {
    setValidationState("loading");
    setValidationError("");

    try {
      const response = await validateCircuit(circuit);
      const result = response.data ?? null;
      setValidationResult(result);
      setValidationState(result?.valid ? "success" : "error");
      return result;
    } catch (error) {
      const message =
        error instanceof CircuitApiError
          ? error.message
          : "The circuit could not be validated.";
      setValidationError(message);
      setValidationResult(null);
      setValidationState("error");
      return null;
    }
  }

  async function handleValidate() {
    await requestValidation();
  }

  async function handleRun() {
    setSimulationState("loading");
    setSimulationError("");
    setSimulationResult(null);

    const result = await requestValidation();
    if (!result?.valid) {
      setSimulationState("idle");
      setSimulationError("");
      return;
    }

    try {
      const response = await simulateCircuit(circuit);
      setSimulationResult(response.data ?? null);
      setSimulationState("success");
    } catch (error) {
      const message =
        error instanceof CircuitApiError
          ? error.message
          : "The circuit could not be simulated.";
      setSimulationError(message);
      setSimulationState("error");
    }
  }

  const isValidating = validationState === "loading";
  const isRunning = simulationState === "loading";
  const isRequestActive = isValidating || isRunning;
  const selectedPosition = selectedOperation?.position ?? null;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="QubitSphere home">
          <span className="brand-mark" aria-hidden="true">
            ◈
          </span>
          <span>QubitSphere</span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a className="topnav-link" href="#learn">
            Learn
          </a>
          <a className="topnav-link topnav-link-active" href="#circuit-lab" aria-current="page">
            Circuit Lab
          </a>
          <span className="phase-label">MVP / Bell State</span>
        </nav>
      </header>

      <div className="page-content" id="top">
        <section className="intro" id="circuit-lab" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow">Learn · Build · Run · Understand</p>
            <h1 id="page-title">Build your first Bell State.</h1>
            <p className="intro-description">
              Experiment with a two-qubit circuit, validate your Circuit IR, and
              inspect the verified measurement result from the simulator.
            </p>
          </div>
          <div className="concept-note" id="learn">
            <span className="concept-note-icon" aria-hidden="true">
              ∴
            </span>
            <div>
              <span className="concept-note-label">Concept</span>
              <strong>Superposition → correlation</strong>
              <p>
                H creates a superposition on q0. CX correlates q1 with q0.
              </p>
            </div>
          </div>
        </section>

        <div className="lab-layout">
          <aside className="panel palette-panel" aria-labelledby="palette-heading">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Operations</p>
                <h2 id="palette-heading">Gate palette</h2>
              </div>
              <span className="gate-count">3 gates</span>
            </div>

            <div className="target-picker">
              <label htmlFor="target-qubit">Single-qubit target</label>
              <select
                id="target-qubit"
                value={targetQubit}
                onChange={(event) => setTargetQubit(Number(event.target.value))}
                disabled={isRequestActive}
              >
                <option value={0}>q0</option>
                <option value={1}>q1</option>
              </select>
            </div>

            <div className="palette-actions">
              <button
                type="button"
                className="palette-button"
                onClick={() => addSingleQubitGate("H")}
                disabled={isRequestActive}
              >
                <span className="palette-symbol">H</span>
                <span>
                  <strong>Hadamard</strong>
                  <small>Creates superposition</small>
                </span>
              </button>
              <button
                type="button"
                className="palette-button"
                onClick={() => addSingleQubitGate("X")}
                disabled={isRequestActive}
              >
                <span className="palette-symbol">X</span>
                <span>
                  <strong>Pauli-X</strong>
                  <small>Flips a qubit</small>
                </span>
              </button>
              <button
                type="button"
                className="palette-button palette-button-wide"
                onClick={addControlledNot}
                disabled={isRequestActive}
              >
                <span className="palette-symbol palette-symbol-cx">CX</span>
                <span>
                  <strong>Controlled-X</strong>
                  <small>q0 controls q1</small>
                </span>
              </button>
            </div>

            <div className="palette-divider" />
            <div className="palette-note">
              <span aria-hidden="true">i</span>
              <p>Choose a target, then place a gate after the current operations.</p>
            </div>
          </aside>

          <section className="panel workspace-panel" aria-labelledby="workspace-heading">
            <div className="panel-heading workspace-heading">
              <div>
                <p className="eyebrow">Circuit workspace</p>
                <h2 id="workspace-heading">{circuit.name ?? "Untitled circuit"}</h2>
              </div>
              <span className="ir-badge">Circuit IR v{circuit.version}</span>
            </div>

            <CircuitCanvas
              circuit={circuit}
              selectedOperationIndex={selectedOperationIndex}
              onSelectOperation={setSelectedOperationIndex}
            />

            <div className="workspace-footer">
              <div className="selection-summary" aria-live="polite">
                {selectedOperation ? (
                  <>
                    <span className="selection-indicator" aria-hidden="true" />
                    <span>
                      Selected <strong>{selectedOperation.gate}</strong>
                      {selectedPosition !== null ? ` · Step ${selectedPosition}` : ""}
                    </span>
                  </>
                ) : (
                  <span className="muted-copy">Select a gate to inspect it.</span>
                )}
              </div>
              <button
                type="button"
                className="button button-quiet"
                onClick={removeSelectedOperation}
                disabled={selectedOperationIndex === null || isRequestActive}
              >
                Remove selected gate
              </button>
            </div>

            {selectedOperation ? (
              <div className="inspector" aria-label="Selected gate details">
                <div>
                  <span className="eyebrow">Inspector</span>
                  <strong>{selectedOperation.gate} gate</strong>
                </div>
                <p>
                  {selectedOperation.gate === "CX"
                    ? `Control q${selectedOperation.control} → target q${selectedOperation.target}`
                    : `Target q${selectedOperation.targets?.[0]}`}
                </p>
              </div>
            ) : null}

            <div className="action-bar">
              <div className="action-copy">
                <span className="eyebrow">Ready to verify?</span>
                <p>Validate the current IR before running the simulator.</p>
              </div>
              <div className="action-buttons">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={handleValidate}
                  disabled={isValidating || isRunning}
                >
                  {isValidating ? "Validating…" : "Validate circuit"}
                </button>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={handleRun}
                  disabled={isValidating || isRunning}
                >
                  <span aria-hidden="true">▶</span>
                  {isRunning ? "Running…" : "Run circuit"}
                </button>
                <button
                  type="button"
                  className="button button-quiet"
                  onClick={loadBellState}
                  disabled={isRequestActive}
                >
                  Reset starter
                </button>
              </div>
            </div>

            <div className="validation-area" aria-live="polite">
              {validationState === "success" && validationResult?.valid ? (
                <div className="state-message state-message-success" role="status">
                  <span aria-hidden="true">✓</span>
                  Circuit IR is valid and ready to simulate.
                </div>
              ) : null}
              {validationState === "error" ? (
                <div className="state-message state-message-error" role="alert">
                  <strong>Validation needs attention.</strong>
                  {validationError ? <span>{validationError}</span> : null}
                  {validationResult?.errors.map((error, index) => (
                    <span key={`${error.code}-${index}`}>
                      {error.operationIndex !== undefined
                        ? `Step ${error.operationIndex}: `
                        : ""}
                      {error.message}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          <ResultsPanel
            circuit={circuit}
            result={simulationResult}
            isRunning={isRunning}
            error={simulationState === "error" ? simulationError : ""}
          />
        </div>
      </div>
    </main>
  );
}
