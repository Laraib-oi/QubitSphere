"""Translate validated Circuit IR into a Qiskit QuantumCircuit.

The adapter deliberately uses an explicit gate allowlist.  Client data is
interpreted only as typed Circuit IR and is never evaluated as Python code.
"""

from __future__ import annotations

from ..circuit_ir.models import CircuitIR, CircuitOperation
from .errors import SimulationUnavailable


def _load_quantum_circuit():
    try:
        from qiskit import QuantumCircuit
    except ImportError as exc:  # pragma: no cover - depends on deployment state
        raise SimulationUnavailable(
            "The Qiskit simulator dependencies are unavailable."
        ) from exc
    return QuantumCircuit


def _single_target(operation: CircuitOperation) -> int:
    # Semantic validation guarantees this shape before the adapter is called.
    assert operation.targets is not None
    return operation.targets[0]


def _theta(operation: CircuitOperation) -> float:
    # Semantic validation guarantees that theta exists and is finite.
    assert operation.parameters is not None
    return float(operation.parameters["theta"])


def build_qiskit_circuit(circuit: CircuitIR):
    """Build a Qiskit circuit while preserving IR operation order."""

    QuantumCircuit = _load_quantum_circuit()
    quantum_circuit = QuantumCircuit(circuit.qubits, circuit.classical_bits)

    for operation in circuit.operations:
        gate = operation.gate
        if gate == "H":
            quantum_circuit.h(_single_target(operation))
        elif gate == "X":
            quantum_circuit.x(_single_target(operation))
        elif gate == "Y":
            quantum_circuit.y(_single_target(operation))
        elif gate == "Z":
            quantum_circuit.z(_single_target(operation))
        elif gate == "S":
            quantum_circuit.s(_single_target(operation))
        elif gate == "T":
            quantum_circuit.t(_single_target(operation))
        elif gate == "CX":
            assert operation.control is not None
            assert operation.target is not None
            quantum_circuit.cx(operation.control, operation.target)
        elif gate == "RX":
            quantum_circuit.rx(_theta(operation), _single_target(operation))
        elif gate == "RY":
            quantum_circuit.ry(_theta(operation), _single_target(operation))
        elif gate == "RZ":
            quantum_circuit.rz(_theta(operation), _single_target(operation))
        else:
            # The API validates this before reaching the adapter.  Keep this
            # defensive branch explicit so future callers cannot bypass the
            # supported-gate boundary accidentally.
            raise ValueError(f"Unsupported gate '{gate}'.")

    # Circuit IR measurement order maps to classical bit order.  Qiskit
    # displays classical bits most-significant first; the simulator normalizes
    # that representation back to this order before returning counts.
    for classical_index, qubit in enumerate(circuit.measurements):
        quantum_circuit.measure(qubit, classical_index)

    return quantum_circuit
