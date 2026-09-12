"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { BellStateLesson } from "@/components/BellStateLesson";
import { BellStatePractice } from "@/components/BellStatePractice";
import { CircuitApiError, simulateCircuit, validateCircuit } from "@/lib/circuit-api";
import { CircuitCanvas } from "@/components/CircuitCanvas";
import {
  LearningProgress,
  type LearningProgressState,
  type LearningStep,
} from "@/components/LearningProgress";
import { ResultsPanel } from "@/components/ResultsPanel";
import { TutorPanel } from "@/components/TutorPanel";
import { askTutor, TutorApiError } from "@/lib/tutor-api";
import type {
  CircuitIR,
  CircuitOperation,
  CircuitSimulationResult,
  CircuitValidationResult,
} from "@/types/circuit";
import type { TutorResponseData } from "@/types/tutor";

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

const PROGRESS_STORAGE_KEY = "qubitsphere.bell-state-progress.v1";
const EMPTY_PROGRESS: LearningProgressState = {
  learn: false,
  build: false,
  run: false,
  challenge: false,
  ask: false,
  practice: false,
};

function normalizeOperations(operations: CircuitOperation[]): CircuitOperation[] {
  return operations.map((operation, position) => ({ ...operation, position }));
}

function isBellStateCnot(operation: CircuitOperation): boolean {
  return operation.gate === "CX" && operation.control === 0 && operation.target === 1;
}

function isCanonicalBellState(circuit: CircuitIR): boolean {
  const [hadamard, controlledNot] = circuit.operations;

  return (
    circuit.qubits === 2 &&
    circuit.classicalBits === 2 &&
    circuit.operations.length === 2 &&
    circuit.measurements.length === 2 &&
    circuit.measurements[0] === 0 &&
    circuit.measurements[1] === 1 &&
    hadamard?.gate === "H" &&
    hadamard.targets?.length === 1 &&
    hadamard.targets[0] === 0 &&
    hadamard.position === 0 &&
    controlledNot !== undefined &&
    isBellStateCnot(controlledNot) &&
    controlledNot.position === 1
  );
}

function isCnotRemovedExperiment(circuit: CircuitIR): boolean {
  return (
    circuit.qubits === 2 &&
    circuit.measurements.length === 2 &&
    circuit.measurements[0] === 0 &&
    circuit.measurements[1] === 1 &&
    circuit.operations.some(
      (operation) => operation.gate === "H" && operation.targets?.[0] === 0
    ) &&
    !circuit.operations.some(isBellStateCnot)
  );
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
  const [baselineResult, setBaselineResult] =
    useState<CircuitSimulationResult | null>(null);
  const [simulationError, setSimulationError] = useState("");
  const [tutorState, setTutorState] = useState<RequestState>("idle");
  const [tutorResponse, setTutorResponse] = useState<TutorResponseData | null>(null);
  const [tutorError, setTutorError] = useState("");
  const [tutorErrorCode, setTutorErrorCode] = useState("");
  const [progress, setProgress] = useState<LearningProgressState>(EMPTY_PROGRESS);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const circuitContextVersion = useRef(0);
  const tutorRequestVersion = useRef(0);

  const selectedOperation = useMemo(
    () =>
      selectedOperationIndex === null
        ? null
        : circuit.operations[selectedOperationIndex] ?? null,
    [circuit.operations, selectedOperationIndex]
  );

  useEffect(() => {
    const loadProgress = () => {
      try {
        const saved = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            const savedProgress = parsed as Partial<LearningProgressState>;
            setProgress({
              learn: savedProgress.learn === true,
              build: savedProgress.build === true,
              run: savedProgress.run === true,
              challenge: savedProgress.challenge === true,
              ask: savedProgress.ask === true,
              practice: savedProgress.practice === true,
            });
          }
        }
      } catch {
        window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
      } finally {
        setIsProgressLoaded(true);
      }
    };

    const timer = window.setTimeout(loadProgress, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isProgressLoaded) {
      return;
    }
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [isProgressLoaded, progress]);

  function completeStep(step: LearningStep) {
    setProgress((current) => (current[step] ? current : { ...current, [step]: true }));
  }

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
    invalidateTutorContext();
  }

  function invalidateTutorContext() {
    circuitContextVersion.current += 1;
    tutorRequestVersion.current += 1;
    setTutorState("idle");
    setTutorResponse(null);
    setTutorError("");
    setTutorErrorCode("");
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
    invalidateTutorContext();
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

  function removeBellStateCnot() {
    const nextOperations = circuit.operations.filter(
      (operation) => !isBellStateCnot(operation)
    );
    updateCircuit(nextOperations);
    setSelectedOperationIndex(nextOperations.length ? 0 : null);
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
    const isModifiedBellExperiment = isCnotRemovedExperiment(circuit);
    invalidateTutorContext();
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
      const nextSimulationResult = response.data ?? null;
      setSimulationResult(nextSimulationResult);
      if (nextSimulationResult && isCanonicalBellState(circuit)) {
        setBaselineResult(nextSimulationResult);
      }
      setSimulationState("success");
      completeStep("build");
      completeStep("run");
      if (response.data && isModifiedBellExperiment) {
        completeStep("challenge");
      }
      invalidateTutorContext();
    } catch (error) {
      const message =
        error instanceof CircuitApiError
          ? error.message
          : "The circuit could not be simulated.";
      setSimulationError(message);
      setSimulationState("error");
    }
  }

  async function handleAskTutor(question: string) {
    const requestCircuit = circuit;
    const requestResult = simulationResult;
    const requestContextVersion = circuitContextVersion.current;
    const requestVersion = ++tutorRequestVersion.current;

    setTutorState("loading");
    setTutorError("");
    setTutorErrorCode("");
    setTutorResponse(null);

    try {
      const response = await askTutor({
        question,
        lessonId: "bell-state-001",
        circuit: requestCircuit,
        ...(requestResult ? { executionId: requestResult.executionId } : {}),
        mode: "interpret",
      });

      if (
        requestVersion !== tutorRequestVersion.current ||
        requestContextVersion !== circuitContextVersion.current
      ) {
        return;
      }

      setTutorResponse(response.data ?? null);
      setTutorState("success");
      if (requestResult) {
        completeStep("ask");
      }
    } catch (error) {
      if (
        requestVersion !== tutorRequestVersion.current ||
        requestContextVersion !== circuitContextVersion.current
      ) {
        return;
      }

      const message =
        error instanceof TutorApiError
          ? error.message
          : "The tutor could not answer this question.";
      setTutorError(message);
      setTutorErrorCode(error instanceof TutorApiError ? error.code : "UNKNOWN_ERROR");
      setTutorState("error");
    }
  }

  const isValidating = validationState === "loading";
  const isRunning = simulationState === "loading";
  const isRequestActive = isValidating || isRunning;
  const selectedPosition = selectedOperation?.position ?? null;
  const cnotRemoved = isCnotRemovedExperiment(circuit);
  const hasVerifiedModifiedExecution = Boolean(
    cnotRemoved && simulationState === "success" && simulationResult
  );

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
        <BellStateLesson
          isComplete={progress.learn}
          onComplete={() => completeStep("learn")}
        />

        <section className="challenge-card panel" aria-labelledby="challenge-heading">
          <div className="challenge-copy">
            <p className="eyebrow">Experiment · Bell State</p>
            <h2 id="challenge-heading">Break the Bell State</h2>
            <p>
              The Bell State is created because the CNOT gate links the two qubits.
              Remove the CNOT and see what changes.
            </p>
          </div>
          <div className="challenge-actions">
            <span
              className={
                progress.challenge ? "challenge-status challenge-status-complete" : "challenge-status"
              }
              aria-live="polite"
            >
              {progress.challenge
                ? "Challenge complete"
                : cnotRemoved
                  ? "CNOT removed · run to verify"
                  : "Challenge ready"}
            </span>
            <button
              type="button"
              className="button button-primary"
              onClick={removeBellStateCnot}
              disabled={isRequestActive || cnotRemoved}
            >
              Remove CNOT
            </button>
          </div>
          {cnotRemoved ? (
            <div className="challenge-feedback">
              {hasVerifiedModifiedExecution ? (
                <>
                  <div>
                    <strong>What changed?</strong>
                    <p>
                      <b>Before:</b> CNOT creates the correlation between the qubits. <b>After:</b>{" "}
                      removing it changes the circuit&apos;s correlations.
                    </p>
                  </div>
                  <div className="challenge-feedback-actions">
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={() =>
                        handleAskTutor("Why did the result change after I removed the CNOT gate?")
                      }
                      disabled={tutorState === "loading"}
                    >
                      Ask Gemini: Why did the result change?
                    </button>
                    <span>Try it: restore the Bell State and run again.</span>
                  </div>
                </>
              ) : (
                <p>
                  CNOT removed. Run the modified circuit to verify the change with the simulator.
                </p>
              )}
            </div>
          ) : null}
        </section>

        <section className="intro" id="circuit-lab" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow">Learn · Build · Run · Understand</p>
            <h1 id="page-title">Build your first Bell State.</h1>
            <p className="intro-description">
              Experiment with a two-qubit circuit, validate your Circuit IR, and
              inspect the verified measurement result from the simulator.
            </p>
          </div>
          <LearningProgress progress={progress} />
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
                  Reset Bell State
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
            baselineResult={baselineResult}
            modifiedResult={cnotRemoved ? simulationResult : null}
            isRunning={isRunning}
            error={simulationState === "error" ? simulationError : ""}
          />

          <TutorPanel
            isLoading={tutorState === "loading"}
            response={tutorResponse}
            error={tutorState === "error" ? tutorError : ""}
            errorCode={tutorState === "error" ? tutorErrorCode : ""}
            hasVerifiedSimulation={Boolean(simulationResult)}
            onAsk={handleAskTutor}
          />

          <BellStatePractice
            isComplete={progress.practice}
            hasVerifiedSimulation={simulationState === "success" && simulationResult !== null}
            onComplete={() => completeStep("practice")}
          />
        </div>
      </div>
    </main>
  );
}
