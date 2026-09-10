from fastapi import FastAPI

app = FastAPI(title="QubitSphere API")


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