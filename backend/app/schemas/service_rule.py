from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ServiceRuleBase(BaseModel):
    description: str
    interval_km: Optional[int] = None
    interval_days: Optional[int] = None
    interval_months: Optional[int] = None
    inspection_type: Optional[str] = None
    is_active: bool = True

class ServiceRuleCreate(ServiceRuleBase):
    pass

class ServiceRuleUpdate(BaseModel):
    description: Optional[str] = None
    interval_km: Optional[int] = None
    interval_days: Optional[int] = None
    interval_months: Optional[int] = None
    inspection_type: Optional[str] = None
    is_active: Optional[bool] = None
    
class ServiceRuleResponse(ServiceRuleBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True