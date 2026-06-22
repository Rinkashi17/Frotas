from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.vehicle import Vehicle

from app.schemas.vehicle import (
    VehicleCreate,
    VehicleResponse,
    VehicleUpdate
)

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"]
)

@router.get("/")
def list_vehicles(
    db: Session = Depends(get_db)
):
    vehicles = db.query(Vehicle).all()

    return vehicles

@router.get(
    "/{vehicle_id}",
    response_model=VehicleResponse
)
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    return vehicle

@router.post(
    "/",
    response_model=VehicleResponse
)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db)
    ):
        new_vehicle = Vehicle(
            plate=vehicle.plate,
            brand=vehicle.brand,
            model=vehicle.model,
            year=vehicle.year,
            current_km=vehicle.current_km
        )

        db.add(new_vehicle)
        db.commit()
        db.refresh(new_vehicle)

        return new_vehicle

@router.delete(
    "/{vehicle_id}"
)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    db.delete(vehicle)
    db.commit()

    return {
        "message": "Vehicle deleted successfully"
    }

@router.put(
    "/{vehicle_id}",
    response_model=VehicleResponse
)
def update_vehicle(
    vehicle_id: int,
    vehicle_data: VehicleUpdate,
    db: Session = Depends(get_db)
):
    existing_vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not existing_vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )
    
    if vehicle_data.current_km is not None:
        existing_vehicle.current_km = vehicle_data.current_km

    if vehicle_data.plate is not None:
        existing_vehicle.plate = vehicle_data.plate

    if vehicle_data.brand is not None:
        existing_vehicle.brand = vehicle_data.brand

    if vehicle_data.model is not None:
        existing_vehicle.model = vehicle_data.model

    if vehicle_data.year is not None:
        existing_vehicle.year = vehicle_data.year

    db.commit()
    db.refresh(existing_vehicle)

    return existing_vehicle