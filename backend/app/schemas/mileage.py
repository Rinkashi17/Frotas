from pydantic import BaseModel

class MileageBase(BaseModel):
    vehicle_id: int
    km: int
    recorded_at: str


class MileageCreate(MileageBase):
    pass

class MileageUpdate(BaseModel):
    km: int
    recorded_at: str

class MileageResponse(MileageBase):
    id: int
    recorded_at: str

    class Config:
        orm_mode = True