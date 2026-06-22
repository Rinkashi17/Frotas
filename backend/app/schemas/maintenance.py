from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date

from app.db.dependencies import get_db
from app.models.maintenance import Maintenance


class MaintenanceBase(BaseModel):
    description: str
    cost: float
    vehicle_id: int
    km_at_service: int
    maintenance_date: date

class MaintenanceCreate(MaintenanceBase):
    pass

class MaintenanceUpdate(BaseModel):
    description: Optional[str] = None
    maintenance_date: Optional[date] = None
    cost: Optional[float] = None
    vehicle_id: Optional[int] = None
    km_at_service: Optional[int] = None

class MaintenanceResponse(MaintenanceBase):
    id: int
    km_at_service: int
    maintenance_date: date

    model_config = ConfigDict(
        from_attributes=True
    )