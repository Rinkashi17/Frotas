from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.db.dependencies import get_db
from app.models.inspection import Inspection

from app.schemas.inspection import (
    InspectionCreate,
    InspectionResponse,
    InspectionUpdate
)

router = APIRouter(
    prefix="/vehicles/{vehicle_id}/inspections",
    tags=["Inspections"]
)

@router.get("/")
def list_inspections(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    inspections = (
        db.query(Inspection)
        .filter(Inspection.vehicle_id == vehicle_id)
        .all()
    )

    return inspections

@router.post(
    "/",
    response_model=InspectionResponse
)
def create_inspection(
    vehicle_id: int,
    inspection: InspectionCreate,
    db: Session = Depends(get_db)
):
    new_inspection = Inspection(
        vehicle_id=vehicle_id,
        description=inspection.description,
        inspection_date=inspection.inspection_date,
        km_at_inspection=inspection.km_at_inspection,
        inspection_type=inspection.inspection_type,
        expiration_date=inspection.expiration_date,
        status=inspection.status,
        notes=inspection.notes
    )

    db.add(new_inspection)
    db.commit()
    db.refresh(new_inspection)

    return new_inspection

@router.put(
    "/{inspection_id}",
    response_model=InspectionResponse
)
def update_inspection(
    vehicle_id: int,
    inspection_id: int,
    inspection_data: InspectionUpdate,
    db: Session = Depends(get_db)
):
    inspection = (
        db.query(Inspection)
        .filter(Inspection.id == inspection_id, Inspection.vehicle_id == vehicle_id)
        .first()
    )

    if not inspection:
        raise HTTPException(
            status_code=404,
            detail="Inspection not found"
        )

    for field, value in inspection_data.dict(exclude_unset=True).items():
        setattr(inspection, field, value)

    db.commit()
    db.refresh(inspection)

    return inspection

@router.delete(
    "/{inspection_id}"
)
def delete_inspection(
    vehicle_id: int,
    inspection_id: int,
    db: Session = Depends(get_db)
):
    inspection = (
        db.query(Inspection)
        .filter(Inspection.id == inspection_id, Inspection.vehicle_id == vehicle_id)
        .first()
    )

    if not inspection:
        raise HTTPException(
            status_code=404,
            detail="Inspection not found"
        )

    db.delete(inspection)
    db.commit()

    return {
        "message": "Inspection deleted successfully"
    }