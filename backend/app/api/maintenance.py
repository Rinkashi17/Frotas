from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.db.dependencies import get_db
from app.models.maintenance import Maintenance

from app.schemas.maintenance import (
    MaintenanceCreate,
    MaintenanceResponse,
    MaintenanceUpdate
)

router = APIRouter(
    prefix="/vehicles/{vehicle_id}/maintenances",
    tags=["Maintenances"]
)

@router.get("/")
def list_maintenances(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    maintenances = (
        db.query(Maintenance)
        .filter(Maintenance.vehicle_id == vehicle_id)
        .all()
    )

    return maintenances

@router.post(
    "/",
    response_model=MaintenanceResponse
)
def create_maintenance(
    vehicle_id: int,
    maintenance: MaintenanceCreate,
    db: Session = Depends(get_db)
):
    new_maintenance = Maintenance(
        vehicle_id=vehicle_id,
        description=maintenance.description,
        cost=maintenance.cost,
        maintenance_date=maintenance.maintenance_date,
        km_at_service=maintenance.km_at_service
    )

    db.add(new_maintenance)
    db.commit()
    db.refresh(new_maintenance)

    return new_maintenance

@router.put(
    "/{maintenance_id}",
    response_model=MaintenanceResponse
)
def update_maintenance(
    vehicle_id: int,
    maintenance_id: int,
    maintenance_data: MaintenanceUpdate,
    db: Session = Depends(get_db)
):
    maintenance = (
        db.query(Maintenance)
        .filter(
            Maintenance.id == maintenance_id,
            Maintenance.vehicle_id == vehicle_id
        )
        .first()
    )

    if not maintenance:
        raise HTTPException(
            status_code=404,
            detail="Maintenance record not found"
        )

    for key, value in maintenance_data.model_dump(exclude_unset=True).items():
        setattr(maintenance, key, value)

    db.commit()
    db.refresh(maintenance)

    return maintenance

@router.delete(
    "/{maintenance_id}"
)
def delete_maintenance(
    vehicle_id: int,
    maintenance_id: int,
    db: Session = Depends(get_db)
):
    maintenance = (
        db.query(Maintenance)
        .filter(
            Maintenance.id == maintenance_id,
            Maintenance.vehicle_id == vehicle_id
        )
        .first()
    )

    if not maintenance:
        raise HTTPException(
            status_code=404,
            detail="Maintenance record not found"
        )

    db.delete(maintenance)
    db.commit()

    return {
        "message": "Maintenance record deleted successfully"
    }