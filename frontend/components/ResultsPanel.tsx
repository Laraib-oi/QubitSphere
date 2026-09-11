import type { CircuitIR, CircuitSimulationResult } from "@/types/circuit";

type ResultsPanelProps = {
  circuit: CircuitIR;
  result: CircuitSimulationResult | null;
  isRunning: boolean;
  error: string;
};

function percentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

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

export function ResultsPanel({ circuit, result, isRunning, error }: ResultsPanelProps) {
  const countEntries = result ? Object.entries(result.counts) : [];
  const probabilityEntries = result
    ? Object.entries(result.probabilities)
    : [];
  const bellStateRun = Boolean(
    result &&
      isBellStateCircuit(circuit) &&
      "00" in result.counts &&
      "11" in result.counts
  );

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

          {result ? (
            <div className="result-insight">
              <span className="insight-mark" aria-hidden="true">
                ✓
              </span>
              {bellStateRun ? (
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
          ) : null}

          <div className="result-section">
            <div className="result-section-heading">
              <h3>Measurement counts</h3>
              <span>Observed shots</span>
            </div>
            {countEntries.length ? (
              <div className="measurement-list">
                {countEntries.map(([state, count]) => (
                  <div className="measurement-row" key={state}>
                    <code>{state}</code>
                    <div className="measurement-bar-track" aria-hidden="true">
                      <span
                        className="measurement-bar"
                        style={{
                          width: `${Math.min(
                            100,
                            (result.probabilities[state] ?? 0) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted-copy">No measured outcomes were returned.</p>
            )}
          </div>

          <div className="result-section">
            <div className="result-section-heading">
              <h3>Probabilities</h3>
              <span>Derived by the simulator</span>
            </div>
            {probabilityEntries.length ? (
              <div className="probability-list">
                {probabilityEntries.map(([state, probability]) => (
                  <div className="probability-row" key={state}>
                    <code>{state}</code>
                    <span>{percentage(probability)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted-copy">No probabilities were returned.</p>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
