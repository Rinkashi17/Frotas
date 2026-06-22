from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.db.dependencies import get_db
from app.models.vehicle import Vehicle
from app.models.maintenance import Maintenance
from app.models.inspection import Inspection

from app.schemas.dashboard import TopCostVehicle

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    total_vehicles = db.query(Vehicle).count()

    total_maintenances = db.query(Maintenance).count()

    active_vehicles = (
        db.query(Vehicle)
        .filter(Vehicle.status == "ATIVO")
        .count()
    )

    return {
        "total_vehicles": total_vehicles,
        "total_maintenances": total_maintenances,
        "active_vehicles": active_vehicles
    }

@router.get("/upcoming-inspections")
def upcoming_inspections(
    db: Session = Depends(get_db)
):
    total_upcoming_inspections = (
        db.query(Inspection)
        .filter(Inspection.status == "PENDENTE")
        .count()
    )

    return {
        "total_upcoming_inspections": total_upcoming_inspections
    }

@router.get("/top-cost-vehicles", response_model=list[TopCostVehicle])
def top_cost_vehicles(
    db: Session = Depends(get_db)
):
    top_vehicles = (
        db.query(
            Vehicle.plate,
            Vehicle.brand,
            Vehicle.model,
            func.sum(Maintenance.cost).label("total_cost")
        )
        .join(Maintenance, Maintenance.vehicle_id == Vehicle.id)
        .group_by(Vehicle.id)
        .order_by(desc("total_cost"))
        .limit(5)
        .all()
    )

    return [
        TopCostVehicle(
            plate=vehicle.plate,
            brand=vehicle.brand,
            model=vehicle.model,
            total_cost=float(vehicle.total_cost)
        )
        for vehicle in top_vehicles
    ]