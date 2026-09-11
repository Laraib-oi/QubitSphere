"""Normalized quantum execution result models."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, StrictInt


class SimulationData(BaseModel):
    """Simulation fields carried inside the API's success envelope."""

    model_config = ConfigDict(extra="forbid")

    backend: str = "qiskit-aer"
    shots: StrictInt
    # Statevector simulation is not requested by this shot-based execution path.
    # An empty list is the documented representation for an unavailable value.
    statevector: list[float] = Field(default_factory=list)
    probabilities: dict[str, float] = Field(default_factory=dict)
    counts: dict[str, StrictInt] = Field(default_factory=dict)


class SimulationResult(SimulationData):
    """Framework-neutral result, including the normalized success flag."""

    success: bool = True


class SimulationResponse(BaseModel):
    """Success envelope for POST /api/circuit/simulate."""

    model_config = ConfigDict(extra="forbid")

    success: bool = True
    data: SimulationData
