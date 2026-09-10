"""Canonical MVP gate registry for Circuit IR validation."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class GateDefinition:
    """Structural requirements for one supported gate."""

    name: str
    target_count: int = 1
    required_parameters: tuple[str, ...] = ()
    uses_control_target: bool = False


GATE_REGISTRY: dict[str, GateDefinition] = {
    name: GateDefinition(name=name)
    for name in ("H", "X", "Y", "Z", "S", "T")
}

GATE_REGISTRY.update(
    {
        "CX": GateDefinition(
            name="CX",
            target_count=0,
            uses_control_target=True,
        ),
        "RX": GateDefinition(name="RX", required_parameters=("theta",)),
        "RY": GateDefinition(name="RY", required_parameters=("theta",)),
        "RZ": GateDefinition(name="RZ", required_parameters=("theta",)),
    }
)


SUPPORTED_GATES = frozenset(GATE_REGISTRY)
