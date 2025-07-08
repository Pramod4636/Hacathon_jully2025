# Simple server health check script
# Usage: .\check_server.ps1 [check_type] [server_name]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("precheck", "postcheck")]
    [string]$CheckType,
    
    [Parameter(Mandatory=$false)]
    [string]$ServerName = $env:COMPUTERNAME
)

function Test-ServerHealth {
    param([string]$Server, [string]$CheckType)
    
    $results = @{
        CheckType = $CheckType
        ServerName = $Server
        Status = "Unknown"
        Issues = @()
        Details = @{}
        CheckTime = Get-Date
    }
    
    try {
        Write-Host "Running $CheckType on server: $Server" -ForegroundColor Yellow
        
        # Get basic system info
        $os = Get-WmiObject -Class Win32_OperatingSystem -ComputerName $Server -ErrorAction Stop
        $computer = Get-WmiObject -Class Win32_ComputerSystem -ComputerName $Server -ErrorAction Stop
        
        # Check disk space
        $disks = Get-WmiObject -Class Win32_LogicalDisk -ComputerName $Server -ErrorAction Stop | Where-Object {$_.DriveType -eq 3}
        $diskIssues = @()
        foreach ($disk in $disks) {
            $usagePercent = [math]::Round((($disk.Size - $disk.FreeSpace) / $disk.Size) * 100, 2)
            if ($usagePercent -gt 85) {
                $diskIssues += "Drive $($disk.DeviceID) usage: $usagePercent%"
            }
        }
        
        # Check memory
        $memory = Get-WmiObject -Class Win32_PhysicalMemory -ComputerName $Server -ErrorAction Stop
        $totalMemory = ($memory | Measure-Object -Property Capacity -Sum).Sum
        $availableMemory = $os.FreePhysicalMemory * 1MB
        $memoryUsagePercent = [math]::Round((($totalMemory - $availableMemory) / $totalMemory) * 100, 2)
        
        if ($memoryUsagePercent -gt 90) {
            $diskIssues += "Memory usage: $memoryUsagePercent%"
        }
        
        # Check uptime
        $uptime = (Get-Date) - $os.ConvertToDateTime($os.LastBootUpTime)
        if ($uptime.TotalDays -gt 30) {
            $diskIssues += "Server uptime: $($uptime.Days) days (consider restart)"
        }
        
        # Determine overall status
        if ($diskIssues.Count -eq 0) {
            $results.Status = "Passed"
            $results.Details.Message = "All checks passed"
        } else {
            $results.Status = "Warning"
            $results.Issues = $diskIssues
            $results.Details.Message = "Found $($diskIssues.Count) issues"
        }
        
        # Add detailed information
        $results.Details.OS = $os.Caption
        $results.Details.Architecture = $os.OSArchitecture
        $results.Details.TotalMemoryGB = [math]::Round($totalMemory / 1GB, 2)
        $results.Details.AvailableMemoryGB = [math]::Round($availableMemory / 1GB, 2)
        $results.Details.MemoryUsagePercent = $memoryUsagePercent
        $results.Details.UptimeDays = $uptime.Days
        
    }
    catch {
        $results.Status = "Failed"
        $results.Issues = @("Connection failed: $($_.Exception.Message)")
        $results.Details.Message = "Unable to connect to server"
    }
    
    # Output as JSON
    $results | ConvertTo-Json -Depth 3
}

# Execute the health check
Test-ServerHealth -Server $ServerName -CheckType $CheckType 