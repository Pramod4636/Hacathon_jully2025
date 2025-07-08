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
- **PowerShell Integration** for real server health checks

## PowerShell Integration

This backend includes PowerShell script integration for real server health checks.

### Simple PowerShell Example

**1. Create PowerShell Script** (`scripts/simple_check.ps1`):
```powershell
param([string]$CheckType)
Write-Output "PreCheck started for $CheckType"
```

**2. FastAPI Endpoint**:
```python
from fastapi import APIRouter
import subprocess

router = APIRouter()

@router.post("/run-simple-check")
def run_simple_check():
    result = subprocess.run([
        'powershell.exe', 
        '-ExecutionPolicy', 'Bypass', 
        '-File', 'scripts/simple_check.ps1',
        '-CheckType', 'precheck'
    ], capture_output=True, text=True)
    
    return {
        "message": result.stdout.strip(),
        "error": result.stderr if result.returncode != 0 else None
    }
```

**3. Test the Endpoint**:
```bash
curl -X POST http://localhost:8000/run-simple-check
```

**4. Expected Response**:
```json
{
    "message": "PreCheck started for precheck",
    "error": null
}
```

### Advanced PowerShell Scripts

The `scripts/` directory contains:
- `check_server.ps1` - Basic health checks (disk, memory, uptime)
- `get_server_info.ps1` - Detailed server information
- See `scripts/README.md` for detailed documentation

### Key Points

1. **PowerShell Execution**: Use `subprocess.run()` with `powershell.exe`
2. **Execution Policy**: Use `-ExecutionPolicy Bypass` to avoid restrictions
3. **Parameters**: Pass parameters to PowerShell script
4. **Output Capture**: Use `capture_output=True` to get script output
5. **Error Handling**: Check `returncode` and handle `stderr`

## Folder Structure
- `app/` - FastAPI application code
- `requirements.txt` - Python dependencies
- `init_db.py` - Database initialization script
- `infra_nova.db` - SQLite database file (created after initialization)
- `scripts/` - PowerShell scripts for server health checks

## Environment Variables (Optional)
You can set `DATABASE_URL` in a `.env` file to customize the database location:
```
DATABASE_URL=sqlite:///./my_custom_database.db
``` 