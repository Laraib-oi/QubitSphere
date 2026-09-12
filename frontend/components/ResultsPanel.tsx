import type { CircuitIR, CircuitSimulationResult } from "@/types/circuit";

import { MeasurementHistogram } from "@/components/MeasurementHistogram";
import { ProbabilityBars } from "@/components/ProbabilityBars";

type ResultsPanelProps = {
  circuit: CircuitIR;
  result: CircuitSimulationResult | null;
  baselineResult?: CircuitSimulationResult | null;
  modifiedResult?: CircuitSimulationResult | null;
  isRunning: boolean;
  error: string;
};

function isBellStateCircuit(circuit: CircuitIR): boolean {
  const [hadamard, controlledNot] = circuit.operations;

  return (
    circuit.qubits === 2 &&
    circuit.operations.length === 2 &&
    circuit.measurements.length === 2 &&
    circuit.measurements[0] === 0 &&
    circuit.measurements[1] === 1 &&
    hadamard?.gate === "H" &&
    hadamard.targets?.length === 1 &&
    hadamard.targets[0] === 0 &&
    hadamard.position === 0 &&
    controlledNot?.gate === "CX" &&
    controlledNot.control === 0 &&
    controlledNot.target === 1 &&
    controlledNot.position === 1
  );
}

function isCnotRemovedBellExperiment(circuit: CircuitIR): boolean {
  return (
    circuit.qubits === 2 &&
    circuit.operations.some(
      (operation) => operation.gate === "H" && operation.targets?.[0] === 0
    ) &&
    !circuit.operations.some(
      (operation) => operation.gate === "CX" && operation.control === 0 && operation.target === 1
    )
  );
}

function resultContext(circuit: CircuitIR): {
  title: string;
  description: string;
} {
  if (isBellStateCircuit(circuit)) {
    return {
      title: "Results for Bell State",
      description: "H on q0 followed by CX(q0 → q1)",
    };
  }

  const operationLabel = `${circuit.operations.length} operation${
    circuit.operations.length === 1 ? "" : "s"
  }`;
  const measurementLabel = circuit.measurements.length
    ? `measured q${circuit.measurements.join(", q")}`
    : "no measured qubits";

  return {
    title: "Results for current circuit",
    description: `${circuit.qubits} qubits · ${operationLabel} · ${measurementLabel}`,
  };
}

function ResultComparisonCard({
  title,
  result,
}: {
  title: string;
  result: CircuitSimulationResult;
}) {
  return (
    <article className="result-comparison-card">
      <div className="result-comparison-heading">
        <h3>{title}</h3>
        <span>{result.shots} shots</span>
      </div>

      <div className="result-section">
        <div className="result-section-heading">
          <h4>Measurement counts</h4>
          <span>Observed shots</span>
        </div>
        <MeasurementHistogram counts={result.counts} />
      </div>

      <div className="result-section">
        <div className="result-section-heading">
          <h4>Probabilities</h4>
          <span>Derived by the simulator</span>
        </div>
        <ProbabilityBars probabilities={result.probabilities} />
      </div>
    </article>
  );
}

export function ResultsPanel({
  circuit,
  result,
  baselineResult,
  modifiedResult,
  isRunning,
  error,
}: ResultsPanelProps) {
  const currentContext = resultContext(circuit);
  const bellStateRun = Boolean(
    result &&
      isBellStateCircuit(circuit) &&
      "00" in result.counts &&
      "11" in result.counts
  );
  const cnotRemovedRun = Boolean(result && isCnotRemovedBellExperiment(circuit));

  return (
    <section className="panel results-panel" aria-labelledby="results-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Verified output</p>
          <h2 id="results-heading">Simulation results</h2>
        </div>
        {result ? (
          <span className="status-pill status-success">Simulation complete</span>
        ) : null}
      </div>

      {isRunning ? (
        <div className="state-message state-message-running" role="status">
          <span className="status-dot status-dot-running" aria-hidden="true" />
          Running circuit through Qiskit Aer…
        </div>
      ) : null}

      {error ? (
        <div className="state-message state-message-error" role="alert">
          <strong>Simulation failed.</strong>
          <span>{error}</span>
        </div>
      ) : null}

      {!isRunning && !error && !result ? (
        <div className="empty-results">
          <span className="empty-results-icon" aria-hidden="true">
            ∿
          </span>
          <p>Run your circuit to see verified measurement results.</p>
          <span>Counts and probabilities will appear here.</span>
        </div>
      ) : null}

      {result ? (
        <div className="results-content">
          <div className="result-meta" aria-label="Simulation metadata">
            <div>
              <span>Shots</span>
              <strong>{result.shots}</strong>
            </div>
            <div>
              <span>Backend</span>
              <strong>{result.backend}</strong>
            </div>
            <div>
              <span>Statevector</span>
              <strong>{result.statevector.length ? "Available" : "Shot-only"}</strong>
            </div>
          </div>

          <div className="result-context" aria-label="Current circuit result context">
            <span className="result-context-label">Current circuit</span>
            <strong>{currentContext.title}</strong>
            <span>{currentContext.description}</span>
          </div>

          <div className="result-insight">
            <span className="insight-mark" aria-hidden="true">
              ✓
            </span>
            {cnotRemovedRun ? (
              <span>
                Without the CNOT, the qubits are no longer being entangled by this circuit.
                The histogram shows the simulator&apos;s verified modified result.
              </span>
            ) : bellStateRun ? (
              <span>
                The Bell State run produced the correlated outcomes <strong>00</strong>{" "}
                and <strong>11</strong>.
              </span>
            ) : (
              <span>
                The simulator returned verified outcomes for the current Circuit IR.
              </span>
            )}
          </div>

          {baselineResult && modifiedResult ? (
            <div className="result-comparison" aria-label="Before and after result comparison">
              <ResultComparisonCard title="Bell State (baseline)" result={baselineResult} />
              <ResultComparisonCard title="Modified circuit (current)" result={modifiedResult} />
            </div>
          ) : (
            <>
              {!baselineResult ? (
                <p className="comparison-prompt">
                  Run the Bell State (Reset → Run) to capture baseline for comparison.
                </p>
              ) : null}

              <div className="result-section">
                <div className="result-section-heading">
                  <h3>Measurement counts</h3>
                  <span>Observed shots</span>
                </div>
                <MeasurementHistogram counts={result.counts} />
              </div>

              <div className="result-section">
                <div className="result-section-heading">
                  <h3>Probabilities</h3>
                  <span>Derived by the simulator</span>
                </div>
                <ProbabilityBars probabilities={result.probabilities} />
              </div>
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}
