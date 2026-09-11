import type { CircuitIR, CircuitOperation } from "@/types/circuit";

type CircuitCanvasProps = {
  circuit: CircuitIR;
  selectedOperationIndex: number | null;
  onSelectOperation: (operationIndex: number) => void;
};

function operationLabel(operation: CircuitOperation): string {
  if (operation.gate === "CX") {
    return `CX control q${operation.control}, target q${operation.target}`;
  }

  return `${operation.gate} on q${operation.targets?.[0] ?? "?"}`;
}

function gateForCell(
  circuit: CircuitIR,
  qubit: number,
  position: number
): { operation: CircuitOperation; operationIndex: number } | null {
  const operationIndex = circuit.operations.findIndex((operation) => {
    if (operation.position !== position) {
      return false;
    }

    if (operation.gate === "CX") {
      return operation.control === qubit || operation.target === qubit;
    }

    return operation.targets?.includes(qubit) ?? false;
  });

  if (operationIndex < 0) {
    return null;
  }

  return {
    operation: circuit.operations[operationIndex],
    operationIndex,
  };
}

export function CircuitCanvas({
  circuit,
  selectedOperationIndex,
  onSelectOperation,
}: CircuitCanvasProps) {
  const positions = Math.max(circuit.operations.length, 2);

  return (
    <div className="circuit-scroll" aria-label="Two-qubit circuit canvas">
      <div
        className="circuit-grid"
        style={{ gridTemplateColumns: `5.25rem repeat(${positions}, 7rem) 5rem` }}
      >
        <div className="circuit-corner" aria-hidden="true" />
        {Array.from({ length: positions }, (_, position) => (
          <div className="step-label" key={`step-${position}`}>
            Step {position}
          </div>
        ))}
        <div className="step-label">Readout</div>

        {Array.from({ length: circuit.qubits }, (_, qubit) => (
          <div className="circuit-row" key={`qubit-${qubit}`}>
            <div className="qubit-label">q{qubit}</div>
            {Array.from({ length: positions }, (_, position) => {
              const cell = gateForCell(circuit, qubit, position);
              const isControl = cell?.operation.control === qubit;
              const isTarget = cell?.operation.target === qubit;
              const selected = cell?.operationIndex === selectedOperationIndex;

              return (
                <div className="circuit-cell" key={`${qubit}-${position}`}>
                  {cell ? (
                    <button
                      type="button"
                      className={`gate-chip ${
                        selected ? "gate-chip-selected" : ""
                      } ${cell.operation.gate === "CX" ? "gate-chip-cx" : ""}`}
                      onClick={() => onSelectOperation(cell.operationIndex)}
                      aria-label={`Select ${operationLabel(cell.operation)}`}
                      aria-pressed={selected}
                    >
                      {cell.operation.gate === "CX" ? (
                        <span className="cx-mark" aria-hidden="true">
                          {isControl ? "●" : isTarget ? "⊕" : "CX"}
                        </span>
                      ) : (
                        cell.operation.gate
                      )}
                      <span className="sr-only">
                        {operationLabel(cell.operation)}
                      </span>
                    </button>
                  ) : (
                    <span className="empty-cell" aria-hidden="true" />
                  )}
                </div>
              );
            })}
            <div className="measurement-cell" aria-label={`Measure q${qubit}`}>
              {circuit.measurements.includes(qubit) ? "M" : "—"}
            </div>
          </div>
        ))}
      </div>
      <p className="canvas-help">
        Select a gate to inspect or remove it. The readout shows the measured
        qubits from the current Circuit IR.
      </p>
    </div>
  );
}
