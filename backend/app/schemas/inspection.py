from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

from app.db.dependencies import get_db
from app.models.inspection import Inspection


class InspectionBase(BaseModel):
    description: str
    inspection_date: datetime
    km_at_inspection: int
    vehicle_id: int
    inspection_type: str
    expiration_date: Optional[datetime] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class InspectionCreate(InspectionBase):
    pass

class InspectionUpdate(BaseModel):
    description: Optional[str] = None
    inspection_date: Optional[datetime] = None
    km_at_inspection: Optional[int] = None
    vehicle_id: Optional[int] = None
    inspection_type: Optional[str] = None
    expiration_date: Optional[datetime] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class InspectionResponse(InspectionBase):
    id: int
    km_at_inspection: int
    inspection_date: datetime
    expiration_date: datetime
    status: str
    notes: str

    model_config = ConfigDict(
        from_attributes=True
    )