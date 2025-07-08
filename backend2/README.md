# Backend (FastAPI) - SQLite Version

This folder contains the FastAPI backend for the dashboard project, now using SQLite database.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Initialize the SQLite database:
   ```bash
   python init_db.py
   ```

4. Run the backend:
   ```bash
   uvicorn app.main:app --reload
   ```

## Database

- **SQLite**: Uses a local file-based database (`infra_nova.db`)
- **No external database server required**
- **Automatic table creation** when running `init_db.py`
- **Sample data included** for testing

## Features
- Serves REST API endpoints for servers, statuses, alerts, and dashboard data
- SQLite database for easy setup and development
- CORS enabled for frontend integration
- Sample data included for immediate testing

## Folder Structure
- `app/` - FastAPI application code
- `requirements.txt` - Python dependencies
- `init_db.py` - Database initialization script
- `infra_nova.db` - SQLite database file (created after initialization)

## Environment Variables (Optional)
You can set `DATABASE_URL` in a `.env` file to customize the database location:
```
DATABASE_URL=sqlite:///./my_custom_database.db
``` 