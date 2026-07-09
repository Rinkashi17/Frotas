from pydantic import BaseModel
from datetime import datetime

class MileageBase(BaseModel):
    vehicle_id: int
    km: int
    recorded_at: datetime


class MileageCreate(MileageBase):
    pass

class MileageUpdate(BaseModel):
    km: int
    recorded_at: datetime

class MileageResponse(MileageBase):
    id: int
    recorded_at: datetime

    class Config:
        orm_mode = True