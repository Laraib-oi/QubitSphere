"""Circuit validation API routes."""

from fastapi import APIRouter

from ..circuit_ir.models import CircuitValidationRequest, CircuitValidationResponse
from ..circuit_ir.validation import validate_circuit


router = APIRouter(prefix="/api/circuit", tags=["circuit"])


@router.post("/validate", response_model=CircuitValidationResponse)
async def validate_circuit_endpoint(
    payload: CircuitValidationRequest,
) -> CircuitValidationResponse:
    """Validate Circuit IR without executing it."""

    result = validate_circuit(payload.circuit)
    return CircuitValidationResponse(data=result)
