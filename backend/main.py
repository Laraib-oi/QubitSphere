from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="QubitSphere API")

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