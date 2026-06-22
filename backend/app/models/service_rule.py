from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import (String, DateTime, Boolean)
from datetime import datetime
from typing import Optional

from app.db.base import Base

class ServiceRule(Base):
    __tablename__ = "services_rules"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(100), unique=True)

    description: Mapped[str] = mapped_column(String(255))

    interval_km: Mapped[Optional[int]] = mapped_column(default=None)

    interval_days: Mapped[Optional[int]] = mapped_column(default=None)

    interval_months: Mapped[Optional[int]] = mapped_column(default=None)

    is_active: Mapped[bool] = mapped_column(default=True)

    inspection_type: Mapped[Optional[str]] = mapped_column(String(50), default=None)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )
