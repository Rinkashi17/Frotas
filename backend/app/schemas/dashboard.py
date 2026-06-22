from pydantic import BaseModel


class TopCostVehicle(BaseModel):
    plate: str
    brand: str
    model: str
    total_cost: float