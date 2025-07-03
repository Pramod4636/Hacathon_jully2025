from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import crud, schemas, models
from .database import get_db
from typing import List
from sqlalchemy import func, case
from datetime import timedelta

router = APIRouter()

@router.get("/servers", response_model=List[schemas.Server])
def list_servers(db: Session = Depends(get_db)):
    return crud.get_servers(db)

@router.get("/server-status", response_model=List[schemas.ServerStatus])
def list_server_statuses(db: Session = Depends(get_db)):
    return crud.get_server_statuses(db)

@router.get("/alerts", response_model=List[schemas.Alert])
def list_alerts(db: Session = Depends(get_db)):
    return crud.get_alerts(db)

@router.get("/dashboard-summary")
def dashboard_summary(db: Session = Depends(get_db)):
    total_servers = db.query(models.Server).count()
    ready_servers = db.query(models.ServerStatus).filter_by(migration_status="Ready", is_current=True).count()
    blocked_servers = db.query(models.ServerStatus).filter_by(migration_status="Blocked", is_current=True).count()
    migrated_servers = db.query(models.ServerStatus).filter_by(migration_status="Completed", is_current=True).count()
    postcheck_passed = db.query(models.ServerStatus).filter_by(postcheck_status="Passed", is_current=True).count()
    return {
        "total_servers": total_servers,
        "ready_servers": ready_servers,
        "blocked_servers": blocked_servers,
        "migrated_servers": migrated_servers,
        "postcheck_passed": postcheck_passed,
    }

@router.get("/migration-chart")
def migration_chart(db: Session = Depends(get_db)):
    # Pie chart: PreCheck Passed/Failed, PostCheck Passed/Failed
    precheck_passed = db.query(models.ServerStatus).filter_by(precheck_status="Passed", is_current=True).count()
    precheck_failed = db.query(models.ServerStatus).filter_by(precheck_status="Failed", is_current=True).count()
    postcheck_passed = db.query(models.ServerStatus).filter_by(postcheck_status="Passed", is_current=True).count()
    postcheck_failed = db.query(models.ServerStatus).filter_by(postcheck_status="Failed", is_current=True).count()
    return [
        {"name": "PreCheck Passed", "value": precheck_passed},
        {"name": "PreCheck Failed", "value": precheck_failed},
        {"name": "PostCheck Passed", "value": postcheck_passed},
        {"name": "PostCheck Failed", "value": postcheck_failed},
    ]

@router.get("/timeline-chart")
def timeline_chart(db: Session = Depends(get_db)):
    # Bar chart: completed/failed migrations per day (last 7 days)
    from datetime import datetime, timedelta
    today = datetime.utcnow().date()
    seven_days_ago = today - timedelta(days=6)
    results = db.query(
        func.date(models.Migration.completed_at).label("date"),
        func.count(case((models.Migration.status == "completed", 1))).label("completed"),
        func.count(case((models.Migration.status == "failed", 1))).label("failed")
    ).filter(
        models.Migration.completed_at != None,
        func.date(models.Migration.completed_at) >= seven_days_ago
    ).group_by(func.date(models.Migration.completed_at)).order_by(func.date(models.Migration.completed_at)).all()
    # Fill missing days
    date_map = {r.date.strftime("%b %d"): {"completed": r.completed, "failed": r.failed} for r in results}
    data = []
    for i in range(7):
        day = seven_days_ago + timedelta(days=i)
        label = day.strftime("%b %d")
        data.append({
            "date": label,
            "completed": date_map.get(label, {}).get("completed", 0),
            "failed": date_map.get(label, {}).get("failed", 0),
        })
    return data

@router.get("/recent-activity")
def recent_activity(db: Session = Depends(get_db)):
    # Example: last 4 status changes (customize as needed)
    statuses = db.query(models.ServerStatus, models.Server).join(models.Server).order_by(models.ServerStatus.last_checked.desc()).limit(4).all()
    activity = []
    for status, server in statuses:
        # Map migration_status to UI status
        if status.migration_status == "Completed":
            ui_status = "success"
            action = "PostCheck Completed"
        elif status.migration_status == "Blocked":
            ui_status = "warning"
            action = "PreCheck Warning"
        elif status.migration_status == "Ready":
            ui_status = "success"
            action = "Migration Completed"
        elif status.migration_status == "Failed":
            ui_status = "error"
            action = "PostCheck Failed"
        else:
            ui_status = "info"
            action = status.migration_status
        activity.append({
            "server": server.name,
            "status": ui_status,
            "action": action,
            "time": status.last_checked.strftime("%b %d, %H:%M") if status.last_checked else "-",
        })
    return activity 