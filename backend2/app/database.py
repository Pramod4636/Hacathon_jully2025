import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

# Force SQLite usage - ignore any PostgreSQL DATABASE_URL from environment
DATABASE_URL = "sqlite:///./infra_nova.db"

# For SQLite, we need to enable foreign key support
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        # Enable foreign key support for SQLite
        db.execute(text("PRAGMA foreign_keys = ON"))
        yield db
    finally:
        db.close() 