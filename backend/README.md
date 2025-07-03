# Backend (FastAPI)

This folder contains the FastAPI backend for the dashboard project.

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
3. Set up your PostgreSQL database and update the `DATABASE_URL` in `.env`.
4. Run the backend:
   ```bash
   uvicorn app.main:app --reload
   ```

## Features
- Serves REST API endpoints for servers, statuses, alerts, and dashboard data
- Connects to your local PostgreSQL database
- CORS enabled for frontend integration

## Folder Structure
- `app/` - FastAPI application code
- `requirements.txt` - Python dependencies
- `.env` - Environment variables (not committed) 