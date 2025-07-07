from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Server(Base):
    __tablename__ = "servers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    ip_address = Column(String, nullable=False)
    environment = Column(String, nullable=False)
    os = Column(String)
    owner = Column(String)
    created_at = Column(DateTime)
    statuses = relationship("ServerStatus", back_populates="server")
    tags = relationship("ServerTag", back_populates="server")
    alerts = relationship("Alert", back_populates="server")
    migrations = relationship("Migration", back_populates="server")

class ServerStatus(Base):
    __tablename__ = "server_status"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    migration_status = Column(String, nullable=False)
    precheck_status = Column(String)
    postcheck_status = Column(String)
    issue_summary = Column(Text)
    last_checked = Column(DateTime)
    is_current = Column(Boolean, default=True)
    server = relationship("Server", back_populates="statuses")

class ServerTag(Base):
    __tablename__ = "server_tags"
    server_id = Column(Integer, ForeignKey("servers.id"), primary_key=True)
    tag = Column(String, primary_key=True)
    server = relationship("Server", back_populates="tags")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    severity = Column(String)
    message = Column(Text)
    resolved = Column(Boolean, default=False)
    created_at = Column(DateTime)
    server = relationship("Server", back_populates="alerts")

class Migration(Base):
    __tablename__ = "migrations"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    status = Column(String)
    notes = Column(Text)
    server = relationship("Server", back_populates="migrations") 