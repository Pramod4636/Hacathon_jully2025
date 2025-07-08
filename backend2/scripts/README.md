# PowerShell Scripts for Server Health Checks

This directory contains PowerShell scripts that integrate with the backend to perform real server health checks.

## Scripts

### 1. `check_server.ps1` - Basic Health Check
Performs basic server health checks including:
- Disk space usage
- Memory usage
- Server uptime
- Basic connectivity

**Usage:**
```powershell
.\check_server.ps1 -CheckType precheck -ServerName "server-name"
.\check_server.ps1 -CheckType postcheck -ServerName "192.168.1.10"
```

**Output:** JSON format with status and details

### 2. `get_server_info.ps1` - Detailed Server Information
Gets comprehensive server information including:
- System details (manufacturer, model)
- OS information
- Processor details
- Memory breakdown
- Disk information
- Network adapters

**Usage:**
```powershell
.\get_server_info.ps1 -ServerName "server-name"
```

**Output:** JSON format with detailed server information

## Integration with Backend

The backend automatically calls these scripts when:
1. User clicks "Run PreCheck" button
2. User clicks "Run PostCheck" button

### How it works:
1. Backend calls PowerShell script with server IP/name
2. PowerShell script performs checks and returns JSON
3. Backend parses JSON and updates database
4. Frontend shows updated status

### Fallback:
If PowerShell script fails, the backend falls back to simulation mode.

## Requirements

- Windows Server with PowerShell
- WMI (Windows Management Instrumentation) enabled
- Network connectivity to target servers
- Appropriate permissions to query remote servers

## Security Notes

- Scripts use `-ExecutionPolicy Bypass` for execution
- Ensure proper network security for remote server access
- Consider using service accounts with minimal required permissions

## Customization

You can modify the scripts to:
- Add more health checks
- Change thresholds (e.g., disk usage > 85%)
- Add custom metrics
- Integrate with other monitoring tools

## Example Output

```json
{
  "CheckType": "precheck",
  "ServerName": "WEB-SERVER-01",
  "Status": "Passed",
  "Issues": [],
  "Details": {
    "Message": "All checks passed",
    "OS": "Microsoft Windows Server 2019 Standard",
    "Architecture": "64-bit",
    "TotalMemoryGB": 16.0,
    "AvailableMemoryGB": 8.5,
    "MemoryUsagePercent": 46.88,
    "UptimeDays": 5
  },
  "CheckTime": "2024-01-15T10:30:00"
}
``` 