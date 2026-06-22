from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.mileage import Mileage

from app.schemas.mileage import (
    MileageCreate,
    MileageResponse,
    MileageUpdate
)

router = APIRouter(
    prefix="/vehicles/{vehicle_id}/mileages",
    tags=["Mileages"]
)

@router.get("/")
def list_mileages(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    mileages = (
        db.query(Mileage)
        .filter(Mileage.vehicle_id == vehicle_id)
        .all()
    )

    return mileages

@router.post(
    "/",
    response_model=MileageResponse
)
def create_mileage(
    vehicle_id: int,
    mileage: MileageCreate,
    db: Session = Depends(get_db)
):
    new_mileage = Mileage(
        vehicle_id=vehicle_id,
        km=mileage.km
    )

    db.add(new_mileage)
    db.commit()
    db.refresh(new_mileage)

    return new_mileage

@router.put(
    "/{mileage_id}",
    response_model=MileageResponse
)
def update_mileage(
    vehicle_id: int,
    mileage_id: int,
    mileage_data: MileageUpdate,
    db: Session = Depends(get_db)
):
    mileage = (
        db.query(Mileage)
        .filter(Mileage.id == mileage_id, Mileage.vehicle_id == vehicle_id)
        .first()
    )

    if not mileage:
        raise HTTPException(
            status_code=404,
            detail="Mileage record not found"
        )

    mileage.km = mileage_data.km

    db.commit()
    db.refresh(mileage)

    return mileage

@router.delete(
    "/{mileage_id}"
)
def delete_mileage(
    vehicle_id: int,
    mileage_id: int,
    db: Session = Depends(get_db)
):
    mileage = (
        db.query(Mileage)
        .filter(Mileage.id == mileage_id, Mileage.vehicle_id == vehicle_id)
        .first()
    )

    if not mileage:
        raise HTTPException(
            status_code=404,
            detail="Mileage record not found"
        )

    db.delete(mileage)
    db.commit()

    return {
        "message": "Mileage record deleted successfully"
    }