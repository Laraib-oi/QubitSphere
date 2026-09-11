"""Circuit validation and simulation API routes."""

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from ..circuit_ir.models import (
    CircuitSimulationRequest,
    CircuitValidationRequest,
    CircuitValidationResponse,
)
from ..circuit_ir.validation import validate_circuit
from ..quantum.errors import SimulationFailed, SimulationUnavailable
from ..quantum.models import SimulationData, SimulationResponse
from ..quantum.simulator import simulate_circuit


router = APIRouter(prefix="/api/circuit", tags=["circuit"])


@router.post("/validate", response_model=CircuitValidationResponse)
async def validate_circuit_endpoint(
    payload: CircuitValidationRequest,
) -> CircuitValidationResponse:
    """Validate Circuit IR without executing it."""

    result = validate_circuit(payload.circuit)
    return CircuitValidationResponse(data=result)


def _error_response(
    status_code: int,
    code: str,
    message: str,
    details: list[dict[str, object]] | None = None,
) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content=jsonable_encoder(
            {
                "success": False,
                "error": {
                    "code": code,
                    "message": message,
                    "details": details or [],
                },
            }
        ),
    )


@router.post("/simulate", response_model=SimulationResponse)
async def simulate_circuit_endpoint(payload: CircuitSimulationRequest):
    """Validate and execute a Circuit IR through Qiskit Aer."""

    validation = validate_circuit(payload.circuit)
    if not validation.valid:
        return _error_response(
            422,
            "INVALID_CIRCUIT",
            "Circuit validation failed.",
            [error.model_dump(by_alias=True) for error in validation.errors],
        )

    try:
        result = simulate_circuit(payload.circuit, shots=payload.shots)
    except SimulationUnavailable:
        return _error_response(
            503,
            "SIMULATION_UNAVAILABLE",
            "The quantum simulator is currently unavailable.",
        )
    except SimulationFailed:
        return _error_response(
            500,
            "SIMULATION_FAILED",
            "The quantum simulator could not execute the circuit.",
        )
    except ValueError:
        return _error_response(
            422,
            "VALIDATION_ERROR",
            "The simulation request is invalid.",
        )

    return SimulationResponse(
        data=SimulationData.model_validate(result.model_dump(exclude={"success"}))
    )
