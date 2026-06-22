from datetime import datetime

from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[int] = mapped_column(primary_key=True)

    plate: Mapped[str] = mapped_column(
        String(10),
        unique=True,
        index=True
    )

    brand: Mapped[str] = mapped_column(String(100))

    model: Mapped[str] = mapped_column(String(100))

    year: Mapped[int]

    current_km: Mapped[int]

    status: Mapped[str] = mapped_column(
        String(30),
        default="ATIVO"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )