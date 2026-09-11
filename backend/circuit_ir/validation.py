"""Deterministic semantic validation for Circuit IR."""

from __future__ import annotations

import math
from collections.abc import Iterable

from .gates import GATE_REGISTRY
from .models import CircuitIR, CircuitOperation, ValidationError, ValidationResult


def _error(
    code: str,
    message: str,
    operation_index: int | None = None,
) -> ValidationError:
    return ValidationError(
        code=code,
        message=message,
        operationIndex=operation_index,
    )


def _validate_qubit_index(
    index: int | None,
    qubits: int,
    *,
    code: str = "INVALID_QUBIT_INDEX",
    description: str = "Qubit index",
    operation_index: int | None = None,
) -> ValidationError | None:
    if index is None or not 0 <= index < qubits:
        value = "missing" if index is None else str(index)
        return _error(
            code,
            f"{description} {value} does not exist in a {qubits}-qubit circuit.",
            operation_index,
        )
    return None


def _validate_parameters(
    operation: CircuitOperation,
    required_parameters: Iterable[str],
    operation_index: int,
) -> list[ValidationError]:
    parameters = operation.parameters or {}
    required = set(required_parameters)
    errors: list[ValidationError] = []

    missing = sorted(required - parameters.keys())
    if missing:
        errors.append(
            _error(
                "INVALID_GATE_PARAMETER",
                f"Missing required parameter(s): {', '.join(missing)}.",
                operation_index,
            )
        )

    unexpected = sorted(parameters.keys() - required)
    if unexpected:
        errors.append(
            _error(
                "INVALID_GATE_PARAMETER",
                f"Unsupported parameter(s): {', '.join(unexpected)}.",
                operation_index,
            )
        )

    for name in required & parameters.keys():
        value = parameters[name]
        if not math.isfinite(value):
            errors.append(
                _error(
                    "INVALID_GATE_PARAMETER",
                    f"Parameter '{name}' must be a finite number.",
                    operation_index,
                )
            )

    return errors


def _validate_operation(
    operation: CircuitOperation,
    qubits: int,
    operation_index: int,
) -> list[ValidationError]:
    errors: list[ValidationError] = []
    definition = GATE_REGISTRY.get(operation.gate)

    if definition is None:
        return [
            _error(
                "INVALID_GATE",
                f"Unsupported gate '{operation.gate}'.",
                operation_index,
            )
        ]

    if definition.uses_control_target:
        if operation.targets is not None:
            errors.append(
                _error(
                    "VALIDATION_ERROR",
                    f"Gate '{operation.gate}' must use control and target fields, not targets.",
                    operation_index,
                )
            )

        control_error = _validate_qubit_index(
            operation.control,
            qubits,
            description="Control qubit",
            operation_index=operation_index,
        )
        if control_error:
            errors.append(control_error)

        target_error = _validate_qubit_index(
            operation.target,
            qubits,
            description="Target qubit",
            operation_index=operation_index,
        )
        if target_error:
            errors.append(target_error)

        if (
            operation.control is not None
            and operation.target is not None
            and operation.control == operation.target
        ):
            errors.append(
                _error(
                    "VALIDATION_ERROR",
                    "Control and target qubits must be different.",
                    operation_index,
                )
            )
    else:
        if operation.control is not None or operation.target is not None:
            errors.append(
                _error(
                    "VALIDATION_ERROR",
                    f"Gate '{operation.gate}' does not accept control or target fields.",
                    operation_index,
                )
            )

        if operation.targets is None or len(operation.targets) != definition.target_count:
            errors.append(
                _error(
                    "VALIDATION_ERROR",
                    f"Gate '{operation.gate}' requires {definition.target_count} target.",
                    operation_index,
                )
            )
        else:
            for target in operation.targets:
                target_error = _validate_qubit_index(
                    target,
                    qubits,
                    operation_index=operation_index,
                )
                if target_error:
                    errors.append(target_error)

    if definition.required_parameters:
        errors.extend(
            _validate_parameters(
                operation,
                definition.required_parameters,
                operation_index,
            )
        )
    elif operation.parameters:
        errors.append(
            _error(
                "INVALID_GATE_PARAMETER",
                f"Gate '{operation.gate}' does not accept parameters.",
                operation_index,
            )
        )

    return errors


def validate_circuit(circuit: CircuitIR) -> ValidationResult:
    """Validate Circuit IR structure beyond Pydantic's type checks."""

    errors: list[ValidationError] = []

    if not circuit.version.strip():
        errors.append(_error("INVALID_CIRCUIT", "version must be a non-empty string."))

    if circuit.qubits <= 0:
        errors.append(_error("INVALID_CIRCUIT", "The circuit must contain at least one qubit."))

    if circuit.classical_bits < 0:
        errors.append(
            _error(
                "INVALID_CIRCUIT",
                "classicalBits must be a non-negative integer.",
            )
        )

    if circuit.qubits > 0:
        for index, operation in enumerate(circuit.operations):
            errors.extend(_validate_operation(operation, circuit.qubits, index))

        for measurement in circuit.measurements:
            measurement_error = _validate_qubit_index(
                measurement,
                circuit.qubits,
                description="Measurement qubit",
            )
            if measurement_error:
                errors.append(measurement_error)

        if len(circuit.measurements) > circuit.classical_bits:
            errors.append(
                _error(
                    "INVALID_CIRCUIT",
                    "classicalBits must be at least the number of measured qubits.",
                )
            )

    return ValidationResult(valid=not errors, errors=errors)
