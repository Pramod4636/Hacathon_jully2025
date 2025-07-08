#!/usr/bin/env python3
"""
Startup script for the FastAPI backend
Initializes database and starts the server
"""

import os
import sys
import subprocess
from pathlib import Path

def main():
    print("🚀 Starting Infra Nova Dashboard Backend (SQLite)")
    print("=" * 50)
    
    # Check if database exists
    db_file = Path("infra_nova.db")
    if not db_file.exists():
        print("📊 Database not found. Initializing...")
        try:
            subprocess.run([sys.executable, "init_db.py"], check=True)
            print("✅ Database initialized successfully!")
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to initialize database: {e}")
            return
    else:
        print("✅ Database already exists")
    
    print("\n🌐 Starting FastAPI server...")
    print("📱 API will be available at: http://localhost:8000")
    print("📖 API documentation at: http://localhost:8000/docs")
    print("🔄 Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start the FastAPI server
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "app.main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8000"
        ])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Failed to start server: {e}")

if __name__ == "__main__":
    main() 