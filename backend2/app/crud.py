from sqlalchemy.orm import Session
from . import models

def get_servers(db: Session):
    return db.query(models.Server).all()

def get_server_statuses(db: Session):
    return db.query(models.ServerStatus).filter_by(is_current=True).all()

def get_alerts(db: Session):
    return db.query(models.Alert).order_by(models.Alert.created_at.desc()).limit(10).all() 