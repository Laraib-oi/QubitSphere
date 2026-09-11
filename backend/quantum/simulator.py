"""Qiskit Aer execution and framework-neutral result normalization."""

from __future__ import annotations

from collections.abc import Mapping

from ..circuit_ir.models import CircuitIR
from .errors import SimulationFailed, SimulationUnavailable
from .models import SimulationResult
from .qiskit_adapter import build_qiskit_circuit


DEFAULT_SHOTS = 1024
MAX_SHOTS = 10_000


def _load_aer_simulator():
    try:
        from qiskit_aer import AerSimulator
    except ImportError as exc:  # pragma: no cover - depends on deployment state
        raise SimulationUnavailable(
            "The Qiskit Aer simulator dependency is unavailable."
        ) from exc
    return AerSimulator


def _normalize_counts(
    raw_counts: Mapping[str, int],
    *,
    classical_bits: int,
    measurement_count: int,
) -> dict[str, int]:
    """Return bitstrings in Circuit IR measurement order.

    Qiskit returns one string for the whole classical register and prints the
    highest classical bit first.  Measurements are assigned to classical bits
    in the order listed by the Circuit IR, so this extracts those positions and
    presents the learner-facing string in that same order.
    """

    if measurement_count == 0:
        return {}

    normalized: dict[str, int] = {}
    for raw_key, raw_count in raw_counts.items():
        key = str(raw_key).replace(" ", "").zfill(classical_bits)
        bits = "".join(
            key[classical_bits - 1 - classical_index]
            for classical_index in range(measurement_count)
        )
        normalized[bits] = normalized.get(bits, 0) + int(raw_count)

    return dict(sorted(normalized.items()))


def simulate_circuit(circuit: CircuitIR, *, shots: int = DEFAULT_SHOTS) -> SimulationResult:
    """Run a validated Circuit IR through the local Qiskit Aer simulator."""

    if not 1 <= shots <= MAX_SHOTS:
        raise ValueError(f"shots must be between 1 and {MAX_SHOTS}.")

    quantum_circuit = build_qiskit_circuit(circuit)
    AerSimulator = _load_aer_simulator()

    try:
        simulator = AerSimulator()
        result = simulator.run(quantum_circuit, shots=shots).result()
        raw_counts = (
            result.get_counts()
            if circuit.measurements
            else {}
        )
    except Exception as exc:  # noqa: BLE001 - stable boundary for simulator failures
        raise SimulationFailed("The quantum simulator could not execute the circuit.") from exc

    counts = _normalize_counts(
        raw_counts,
        classical_bits=circuit.classical_bits,
        measurement_count=len(circuit.measurements),
    )
    probabilities = {
        key: count / shots
        for key, count in counts.items()
    }

    return SimulationResult(
        shots=shots,
        probabilities=probabilities,
        counts=counts,
    )
