"""Pydantic models for the QubitSphere Circuit IR contract."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict, Field, StrictFloat, StrictInt


ParameterValue = StrictInt | StrictFloat


class CircuitOperation(BaseModel):
    """One framework-neutral operation in a circuit."""

    model_config = ConfigDict(extra="forbid")

    gate: str
    targets: list[StrictInt] | None = None
    control: StrictInt | None = None
    target: StrictInt | None = None
    parameters: dict[str, ParameterValue] | None = None
    position: StrictInt | None = None
    label: str | None = None


class CircuitIR(BaseModel):
    """The canonical, JSON-compatible representation of a circuit."""

    model_config = ConfigDict(
        alias_generator=None,
        extra="forbid",
        populate_by_name=True,
    )

    version: str
    id: str | None = None
    name: str | None = None
    qubits: StrictInt
    classical_bits: StrictInt = Field(alias="classicalBits")
    operations: list[CircuitOperation]
    measurements: list[StrictInt]
    metadata: dict[str, Any] = Field(default_factory=dict)


class CircuitValidationRequest(BaseModel):
    """Request model for POST /api/circuit/validate."""

    model_config = ConfigDict(extra="forbid")

    circuit: CircuitIR


class ValidationError(BaseModel):
    """A stable, learner-displayable circuit validation error."""

    model_config = ConfigDict(populate_by_name=True, extra="forbid")

    code: str
    message: str
    operation_index: StrictInt | None = Field(default=None, alias="operationIndex")


class ValidationResult(BaseModel):
    valid: bool
    errors: list[ValidationError] = Field(default_factory=list)


class CircuitValidationResponse(BaseModel):
    """Stable API response for circuit validation."""

    success: bool = True
    data: ValidationResult
