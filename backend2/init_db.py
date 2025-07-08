#!/usr/bin/env python3
"""
Database initialization script for SQLite
Creates all tables and adds some sample data
"""

import os
import sys
from datetime import datetime
from sqlalchemy.orm import Session

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.database import engine, SessionLocal
from app.models import Base, Server, ServerStatus, ServerTag, Alert, Migration

def init_db():
    """Initialize the database with tables and sample data"""
    print("Creating database tables...")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    print("Tables created successfully!")
    
    # Add sample data
    db = SessionLocal()
    try:
        # Check if we already have data
        if db.query(Server).count() > 0:
            print("Database already contains data, skipping sample data insertion.")
            return
        
        print("Adding sample data...")
        
        # Create sample servers
        servers = [
            Server(
                name="web-server-01",
                ip_address="192.168.1.10",
                environment="Production",
                os="Ubuntu 20.04",
                owner="DevOps Team",
                created_at=datetime.now()
            ),
            Server(
                name="db-server-01",
                ip_address="192.168.1.11",
                environment="Production",
                os="CentOS 8",
                owner="Database Team",
                created_at=datetime.now()
            ),
            Server(
                name="test-server-01",
                ip_address="192.168.1.20",
                environment="UAT",
                os="Ubuntu 18.04",
                owner="QA Team",
                created_at=datetime.now()
            ),
            Server(
                name="dev-server-01",
                ip_address="192.168.1.30",
                environment="Development",
                os="Windows Server 2019",
                owner="Development Team",
                created_at=datetime.now()
            )
        ]
        
        db.add_all(servers)
        db.commit()
        
        # Create sample statuses
        statuses = [
            ServerStatus(
                server_id=1,
                migration_status="Ready",
                precheck_status="Not Started",
                postcheck_status="N/A",
                issue_summary="",
                last_checked=datetime.now(),
                is_current=True
            ),
            ServerStatus(
                server_id=2,
                migration_status="Completed",
                precheck_status="Passed",
                postcheck_status="Passed",
                issue_summary="Migration completed successfully",
                last_checked=datetime.now(),
                is_current=True
            ),
            ServerStatus(
                server_id=3,
                migration_status="Blocked",
                precheck_status="Warning",
                postcheck_status="N/A",
                issue_summary="Disk space low",
                last_checked=datetime.now(),
                is_current=True
            ),
            ServerStatus(
                server_id=4,
                migration_status="Ready",
                precheck_status="Not Started",
                postcheck_status="N/A",
                issue_summary="",
                last_checked=datetime.now(),
                is_current=True
            )
        ]
        
        db.add_all(statuses)
        db.commit()
        
        # Create sample tags
        tags = [
            ServerTag(server_id=1, tag="web"),
            ServerTag(server_id=1, tag="production"),
            ServerTag(server_id=2, tag="database"),
            ServerTag(server_id=2, tag="production"),
            ServerTag(server_id=3, tag="testing"),
            ServerTag(server_id=4, tag="development"),
        ]
        
        db.add_all(tags)
        db.commit()
        
        # Create sample alerts
        alerts = [
            Alert(
                server_id=3,
                severity="Warning",
                message="Disk usage is at 85%",
                resolved=False,
                created_at=datetime.now()
            ),
            Alert(
                server_id=1,
                severity="Info",
                message="Server ready for migration",
                resolved=True,
                created_at=datetime.now()
            )
        ]
        
        db.add_all(alerts)
        db.commit()
        
        print("Sample data added successfully!")
        
    except Exception as e:
        print(f"Error adding sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db() 