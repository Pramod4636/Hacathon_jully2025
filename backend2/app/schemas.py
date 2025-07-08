from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ServerTag(BaseModel):
    tag: str
    model_config = ConfigDict(from_attributes=True)

class ServerStatus(BaseModel):
    migration_status: str
    precheck_status: Optional[str]
    postcheck_status: Optional[str]
    issue_summary: Optional[str]
    last_checked: Optional[datetime]
    is_current: bool
    model_config = ConfigDict(from_attributes=True)

class Alert(BaseModel):
    id: int
    server_id: int
    severity: str
    message: str
    resolved: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class Migration(BaseModel):
    id: int
    server_id: int
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    status: Optional[str]
    notes: Optional[str]
    model_config = ConfigDict(from_attributes=True)

class Server(BaseModel):
    id: int
    name: str
    ip_address: str
    environment: str
    os: Optional[str]
    owner: Optional[str]
    created_at: datetime
    tags: List[ServerTag] = []
    statuses: List[ServerStatus] = []
    alerts: List[Alert] = []
    migrations: List[Migration] = []
    model_config = ConfigDict(from_attributes=True) 