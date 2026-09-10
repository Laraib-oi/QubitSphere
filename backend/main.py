from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .routes.circuit import router as circuit_router


app = FastAPI(title="QubitSphere API")

app.include_router(circuit_router)


@app.exception_handler(RequestValidationError)
async def request_validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    """Return the documented error envelope for malformed API requests."""

    details = [
        {
            "loc": list(error.get("loc", ())),
            "message": error.get("msg", "Request validation failed."),
            "type": error.get("type", "validation_error"),
        }
        for error in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder(
            {
                "success": False,
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Request validation failed.",
                    "details": details,
                },
            }
        ),
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "QubitSphere API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.get("/api/test")
def api_test():
    return {
        "success": True,
        "message": "FastAPI is successfully connected to QubitSphere frontend"
    }
