# PowerShell script to get server information
# Usage: .\get_server_info.ps1 [server_name_or_ip]

param(
    [Parameter(Mandatory=$false)]
    [string]$ServerName = $env:COMPUTERNAME
)

function Get-ServerInfo {
    param([string]$Server)
    
    try {
        Write-Host "Getting information for server: $Server" -ForegroundColor Green
        
        # Get basic system information
        $computerSystem = Get-WmiObject -Class Win32_ComputerSystem -ComputerName $Server -ErrorAction Stop
        $operatingSystem = Get-WmiObject -Class Win32_OperatingSystem -ComputerName $Server -ErrorAction Stop
        $processor = Get-WmiObject -Class Win32_Processor -ComputerName $Server -ErrorAction Stop | Select-Object -First 1
        
        # Get disk information
        $disks = Get-WmiObject -Class Win32_LogicalDisk -ComputerName $Server -ErrorAction Stop | Where-Object {$_.DriveType -eq 3}
        
        # Get network information
        $networkAdapters = Get-WmiObject -Class Win32_NetworkAdapter -ComputerName $Server -ErrorAction Stop | Where-Object {$_.NetEnabled -eq $true}
        
        # Get memory information
        $memory = Get-WmiObject -Class Win32_PhysicalMemory -ComputerName $Server -ErrorAction Stop
        
        # Calculate disk usage
        $diskInfo = @()
        foreach ($disk in $disks) {
            $freeSpaceGB = [math]::Round($disk.FreeSpace / 1GB, 2)
            $totalSpaceGB = [math]::Round($disk.Size / 1GB, 2)
            $usedSpaceGB = $totalSpaceGB - $freeSpaceGB
            $usagePercent = [math]::Round(($usedSpaceGB / $totalSpaceGB) * 100, 2)
            
            $diskInfo += @{
                Drive = $disk.DeviceID
                TotalGB = $totalSpaceGB
                FreeGB = $freeSpaceGB
                UsedGB = $usedSpaceGB
                UsagePercent = $usagePercent
            }
        }
        
        # Calculate total memory
        $totalMemoryGB = [math]::Round(($memory | Measure-Object -Property Capacity -Sum).Sum / 1GB, 2)
        $availableMemoryGB = [math]::Round($operatingSystem.FreePhysicalMemory / 1MB, 2)
        $usedMemoryGB = $totalMemoryGB - $availableMemoryGB
        $memoryUsagePercent = [math]::Round(($usedMemoryGB / $totalMemoryGB) * 100, 2)
        
        # Create result object
        $serverInfo = @{
            ServerName = $computerSystem.Name
            Manufacturer = $computerSystem.Manufacturer
            Model = $computerSystem.Model
            OSName = $operatingSystem.Caption
            OSVersion = $operatingSystem.Version
            Architecture = $operatingSystem.OSArchitecture
            Processor = $processor.Name
            ProcessorCores = $processor.NumberOfCores
            TotalMemoryGB = $totalMemoryGB
            AvailableMemoryGB = $availableMemoryGB
            MemoryUsagePercent = $memoryUsagePercent
            Disks = $diskInfo
            LastBootTime = $operatingSystem.ConvertToDateTime($operatingSystem.LastBootUpTime)
            Uptime = (Get-Date) - $operatingSystem.ConvertToDateTime($operatingSystem.LastBootUpTime)
            CheckTime = Get-Date
        }
        
        # Convert to JSON and output
        $serverInfo | ConvertTo-Json -Depth 3
        
    }
    catch {
        $errorInfo = @{
            Error = $_.Exception.Message
            Server = $Server
            CheckTime = Get-Date
        }
        $errorInfo | ConvertTo-Json
    }
}

# Execute the function
Get-ServerInfo -Server $ServerName 