from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.service_rule import ServiceRule
from app.schemas.service_rule import (
    ServiceRuleCreate,
    ServiceRuleResponse,
    ServiceRuleUpdate
)

router = APIRouter(
    prefix="/service-rules",
    tags=["Service Rules"]
)

@router.get("/")
def list_service_rules(
    db: Session = Depends(get_db)
):
    service_rules = db.query(ServiceRule).all()

    return service_rules

@router.post(
    "/",
    response_model=ServiceRuleResponse
)
def create_service_rule(
    service_rule: ServiceRuleCreate,
    db: Session = Depends(get_db)
):
    new_service_rule = ServiceRule(
        name=service_rule.name,
        description=service_rule.description,
        interval_km=service_rule.interval_km,
        interval_days=service_rule.interval_days,
        interval_months=service_rule.interval_months,
        inspection_type=service_rule.inspection_type,
        is_active=service_rule.is_active
    )

    db.add(new_service_rule)
    db.commit()
    db.refresh(new_service_rule)

    return new_service_rule

@router.put(
    "/{service_rule_id}",
    response_model=ServiceRuleResponse
)
def update_service_rule(
    service_rule_id: int,
    service_rule_data: ServiceRuleUpdate,
    db: Session = Depends(get_db)
):
    service_rule = (
        db.query(ServiceRule)
        .filter(ServiceRule.id == service_rule_id)
        .first()
    )

    if not service_rule:
        raise HTTPException(
            status_code=404,
            detail="Service rule not found"
        )

    for key, value in service_rule_data.dict().items():
        setattr(service_rule, key, value)

    db.commit()
    db.refresh(service_rule)

    return service_rule

@router.delete(
    "/{service_rule_id}"
)
def delete_service_rule(
    service_rule_id: int,
    db: Session = Depends(get_db)
):
    service_rule = (
        db.query(ServiceRule)
        .filter(ServiceRule.id == service_rule_id)
        .first()
    )

    if not service_rule:
        raise HTTPException(
            status_code=404,
            detail="Service rule not found"
        )

    db.delete(service_rule)
    db.commit()

    return {
        "message": "Service rule deleted successfully"
    }