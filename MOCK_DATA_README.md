# Mock Data Documentation

This document contains the mock data structures used for the Infrastructure Nova Dashboard. All data is organized by API endpoints for easy reference during development and testing.

## API Endpoints & Mock Data

### 1. Servers Endpoint
**GET** `/api/servers`

Returns a list of all servers with their current status and metadata.

```json
[
    {
        "id": 1,
        "name": "PROD-WEB-01",
        "ip_address": "10.0.1.15",
        "environment": "Production",
        "os": "Windows Server 2019",
        "owner": "WebTeam",
        "created_at": "2024-01-07T14:30:00",
        "tags": [
            {
                "tag": "critical"
            },
            {
                "tag": "web-server"
            }
        ],
        "statuses": [
            {
                "migration_status": "Migrated",
                "precheck_status": "Passed",
                "postcheck_status": "N/A",
                "issue_summary": "None",
                "last_checked": "2024-01-07T14:30:00",
                "is_current": true
            },
            {
                "migration_status": "Completed",
                "precheck_status": "N/A",
                "postcheck_status": "Passed",
                "issue_summary": null,
                "last_checked": null,
                "is_current": true
            }
        ],
        "alerts": [
            {
                "id": 1,
                "server_id": 1,
                "severity": "high",
                "message": "PROD-DB-01 PostCheck failed",
                "resolved": false,
                "created_at": "2024-01-07T14:32:00"
            }
        ],
        "migrations": [
            {
                "id": 1,
                "server_id": 1,
                "started_at": "2024-01-07T13:00:00",
                "completed_at": "2024-01-07T14:30:00",
                "status": "completed",
                "notes": "Migration completed successfully"
            }
        ]
    },
    {
        "id": 2,
        "name": "UAT-DB-03",
        "ip_address": "10.0.2.22",
        "environment": "UAT",
        "os": "Linux RHEL 8",
        "owner": "DBA Team",
        "created_at": "2024-01-07T14:25:00",
        "tags": [
            {
                "tag": "database"
            },
            {
                "tag": "monitoring"
            }
        ],
        "statuses": [
            {
                "migration_status": "Ready",
                "precheck_status": "N/A",
                "postcheck_status": "N/A",
                "issue_summary": "Disk space low",
                "last_checked": "2024-01-07T14:25:00",
                "is_current": true
            },
            {
                "migration_status": "Ready",
                "precheck_status": "Failed",
                "postcheck_status": "N/A",
                "issue_summary": null,
                "last_checked": null,
                "is_current": true
            }
        ],
        "alerts": [
            {
                "id": 2,
                "server_id": 2,
                "severity": "medium",
                "message": "UAT-WEB-03 disk space warning",
                "resolved": false,
                "created_at": "2024-01-07T14:15:00"
            }
        ],
        "migrations": [
            {
                "id": 2,
                "server_id": 2,
                "started_at": "2024-01-07T12:00:00",
                "completed_at": null,
                "status": "failed",
                "notes": "Disk space low"
            }
        ]
    },
    {
        "id": 3,
        "name": "DEV-APP-02",
        "ip_address": "10.0.3.45",
        "environment": "Development",
        "os": "Ubuntu 20.04",
        "owner": "DevOps",
        "created_at": "2024-01-07T14:20:00",
        "tags": [
            {
                "tag": "development"
            },
            {
                "tag": "app-server"
            }
        ],
        "statuses": [
            {
                "migration_status": "Ready",
                "precheck_status": "N/A",
                "postcheck_status": "N/A",
                "issue_summary": null,
                "last_checked": null,
                "is_current": true
            },
            {
                "migration_status": "Ready",
                "precheck_status": "N/A",
                "postcheck_status": "N/A",
                "issue_summary": "None",
                "last_checked": "2024-01-07T14:20:00",
                "is_current": true
            }
        ],
        "alerts": [
            {
                "id": 3,
                "server_id": 3,
                "severity": "low",
                "message": "DEV-APP-02 migration completed",
                "resolved": true,
                "created_at": "2024-01-07T13:20:00"
            }
        ],
        "migrations": [
            {
                "id": 3,
                "server_id": 3,
                "started_at": "2024-01-07T11:00:00",
                "completed_at": "2024-01-07T14:20:00",
                "status": "completed",
                "notes": "Migration completed successfully"
            }
        ]
    },
    {
        "id": 4,
        "name": "PROD-API-01",
        "ip_address": "10.0.1.33",
        "environment": "Production",
        "os": "Windows Server 2022",
        "owner": "API Team",
        "created_at": "2024-01-07T13:45:00",
        "tags": [
            {
                "tag": "critical"
            },
            {
                "tag": "api"
            }
        ],
        "statuses": [
            {
                "migration_status": "Ready",
                "precheck_status": "N/A",
                "postcheck_status": "N/A",
                "issue_summary": "Service unavailable",
                "last_checked": "2024-01-07T13:45:00",
                "is_current": true
            },
            {
                "migration_status": "Migrated",
                "precheck_status": "Passed",
                "postcheck_status": "N/A",
                "issue_summary": null,
                "last_checked": null,
                "is_current": true
            }
        ],
        "alerts": [
            {
                "id": 4,
                "server_id": 4,
                "severity": "medium",
                "message": "Network latency detected",
                "resolved": false,
                "created_at": "2024-01-07T12:00:00"
            }
        ],
        "migrations": [
            {
                "id": 4,
                "server_id": 4,
                "started_at": "2024-01-07T10:00:00",
                "completed_at": "2024-01-07T13:45:00",
                "status": "failed",
                "notes": "Service unavailable"
            }
        ]
    }
]
```

### 2. Dashboard Summary Endpoint
**GET** `/api/dashboard/summary`

Returns summary statistics for the dashboard overview.

```json
{
    "total_servers": 4,
    "ready_servers": 5,
    "blocked_servers": 0,
    "migrated_servers": 1,
    "postcheck_passed": 1
}
```

### 3. Migration Chart Data Endpoint
**GET** `/api/dashboard/migration-chart`

Returns data for the migration status chart.

```json
[
    {
        "name": "PreCheck Passed",
        "value": 2
    },
    {
        "name": "PreCheck Failed",
        "value": 1
    },
    {
        "name": "PostCheck Passed",
        "value": 1
    },
    {
        "name": "PostCheck Failed",
        "value": 0
    }
]
```

### 4. Timeline Chart Data Endpoint
**GET** `/api/dashboard/timeline-chart`

Returns data for the migration timeline chart.

```json
[
    {
        "date": "Jul 01",
        "completed": 0,
        "failed": 0
    },
    {
        "date": "Jul 02",
        "completed": 0,
        "failed": 0
    },
    {
        "date": "Jul 03",
        "completed": 0,
        "failed": 0
    },
    {
        "date": "Jul 04",
        "completed": 0,
        "failed": 0
    },
    {
        "date": "Jul 05",
        "completed": 0,
        "failed": 0
    },
    {
        "date": "Jul 06",
        "completed": 0,
        "failed": 0
    },
    {
        "date": "Jul 07",
        "completed": 0,
        "failed": 0
    }
]
```

### 5. Alerts Endpoint
**GET** `/api/alerts`

Returns all system alerts.

```json
[
    {
        "id": 1,
        "server_id": 1,
        "severity": "high",
        "message": "PROD-DB-01 PostCheck failed",
        "resolved": false,
        "created_at": "2024-01-07T14:32:00"
    },
    {
        "id": 2,
        "server_id": 2,
        "severity": "medium",
        "message": "UAT-WEB-03 disk space warning",
        "resolved": false,
        "created_at": "2024-01-07T14:15:00"
    },
    {
        "id": 3,
        "server_id": 3,
        "severity": "low",
        "message": "DEV-APP-02 migration completed",
        "resolved": true,
        "created_at": "2024-01-07T13:20:00"
    },
    {
        "id": 4,
        "server_id": 4,
        "severity": "medium",
        "message": "Network latency detected",
        "resolved": false,
        "created_at": "2024-01-07T12:00:00"
    }
]
```

### 6. Recent Activity Endpoint
**GET** `/api/dashboard/recent-activity`

Returns recent system activities for the dashboard.

```json
[
    {
        "server": "PROD-API-01",
        "status": "info",
        "action": "Migrated",
        "time": "-"
    },
    {
        "server": "UAT-DB-03",
        "status": "success",
        "action": "Migration Completed",
        "time": "-"
    },
    {
        "server": "PROD-WEB-01",
        "status": "success",
        "action": "PostCheck Completed",
        "time": "-"
    },
    {
        "server": "DEV-APP-02",
        "status": "success",
        "action": "Migration Completed",
        "time": "-"
    }
]
```

## Data Structure Definitions

### Server Object
- `id`: Unique identifier for the server
- `name`: Server hostname
- `ip_address`: Server IP address
- `environment`: Environment type (Production, UAT, Development)
- `os`: Operating system
- `owner`: Team responsible for the server
- `created_at`: Server creation timestamp
- `tags`: Array of tag objects with `tag` property
- `statuses`: Array of status objects
- `alerts`: Array of alert objects
- `migrations`: Array of migration objects

### Status Object
- `migration_status`: Current migration status (Ready, Migrated, Completed, Failed, Blocked)
- `precheck_status`: PreCheck status (Passed, Failed, N/A, Not Started)
- `postcheck_status`: PostCheck status (Passed, Failed, N/A, Not Started)
- `issue_summary`: Summary of any issues found
- `last_checked`: Timestamp of last status check
- `is_current`: Boolean indicating if this is the current status

### Alert Object
- `id`: Unique alert identifier
- `server_id`: ID of the server this alert belongs to
- `severity`: Alert severity (high, medium, low)
- `message`: Alert message
- `resolved`: Boolean indicating if alert is resolved
- `created_at`: Alert creation timestamp

### Migration Object
- `id`: Unique migration identifier
- `server_id`: ID of the server being migrated
- `started_at`: Migration start timestamp
- `completed_at`: Migration completion timestamp (null if ongoing)
- `status`: Migration status (completed, failed, in_progress)
- `notes`: Additional migration notes

## Usage Notes

1. **Status Values**: The system uses specific status values that should be consistent across all endpoints
2. **Timestamps**: All timestamps are in ISO 8601 format
3. **Current Status**: Only one status per server should have `is_current: true`
4. **Severity Levels**: Alerts use three severity levels: high, medium, low
5. **Environment Types**: Supported environments are Production, UAT, and Development

## Development Guidelines

When implementing these endpoints:
- Ensure all required fields are present
- Validate data types and formats
- Handle null/undefined values gracefully
- Maintain consistency in status values across endpoints
- Use proper HTTP status codes for responses 