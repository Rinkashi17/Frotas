from fastapi import FastAPI
from app.api.vehicle import router as vehicle_router
from app.api.maintenance import router as maintenance_router
from app.api.mileage import router as mileage_router
from app.api.inspection import router as inspection_router
from app.api.service_rule import router as service_rule_router
from app.api.dashboard import router as dashboard_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vehicle_router)
app.include_router(maintenance_router)
app.include_router(mileage_router)
app.include_router(inspection_router)
app.include_router(service_rule_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {"message": "API funcionando"}