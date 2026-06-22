from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pydantic import ConfigDict


class VehicleBase(BaseModel):
    plate: str
    brand: str
    model: str
    year: int
    current_km: int

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    plate: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    current_km: Optional[int] = None

class VehicleResponse(VehicleBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )