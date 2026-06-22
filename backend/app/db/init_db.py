from app.db.engine import engine
from app.db.base import Base

from app.models.vehicle import Vehicle
from app.models.maintenance import Maintenance
from app.models.mileage import Mileage
from app.models.inspection import Inspection
from app.models.service_rule import ServiceRule

Base.metadata.create_all(bind=engine)