from datetime import date

from sqlalchemy import (
    String,
    ForeignKey,
    Numeric,
    Date
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.db.base import Base


class Maintenance(Base):
    __tablename__ = "maintenances"

    id: Mapped[int] = mapped_column(primary_key=True)

    vehicle_id: Mapped[int] = mapped_column(
        ForeignKey("vehicles.id")
    )

    description: Mapped[str] = mapped_column(
        String(255)
    )

    cost: Mapped[float] = mapped_column(
        Numeric(10, 2)
    )

    maintenance_date: Mapped[date] = mapped_column(
        Date
    )

    km_at_service: Mapped[int]

    vehicle = relationship("Vehicle")