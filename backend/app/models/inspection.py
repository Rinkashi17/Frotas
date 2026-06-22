from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String

from datetime import datetime
from sqlalchemy import DateTime

from app.db.base import Base

INSPECTION_TYPE = (
    "VISTORIA",
    "LICENCIAMENTO",
    "SEGURO",
    "CRLV"
)

STATUS = (
    "PENDENTE",
    "VENCIDO",
    "VALIDO"
)



class Inspection(Base):
    __tablename__ = "inspections"

    id: Mapped[int] = mapped_column(primary_key=True)

    description: Mapped[str] = mapped_column(String(255))

    km_at_inspection: Mapped[int] = mapped_column()

    vehicle_id: Mapped[int] = mapped_column(
        ForeignKey("vehicles.id")
    )

    inspection_type: Mapped[str] = mapped_column(String(50))

    inspection_date: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    expiration_date: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    status: Mapped[str] = mapped_column(String(50))

    notes: Mapped[str] = mapped_column(
        String(255)
    )

    vehicle = relationship("Vehicle")