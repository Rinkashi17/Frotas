from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from datetime import datetime
from sqlalchemy import DateTime

from app.db.base import Base



class Mileage(Base):
    __tablename__ = "mileages"

    id: Mapped[int] = mapped_column(primary_key=True)

    vehicle_id: Mapped[int] = mapped_column(
        ForeignKey("vehicles.id")
    )

    km: Mapped[int]

    recorded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    vehicle = relationship("Vehicle")