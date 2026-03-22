$output = @()
$output += "--- Port 5173 Check ---"
try {
    $conn = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction Stop
    if ($conn) {
        $pid = $conn.OwningProcess
        $output += "Listening PID on 5173: $pid"
        $proc = Get-CimInstance Win32_Process -Filter "ProcessId = $pid"
        if ($proc) {
            $output += "CommandLine: $($proc.CommandLine)"
        }
    }
} catch {
    $output += "No process listening on 5173 or error: $_"
}

$output += "`n--- All Node Processes ---"
$nodeProcs = Get-CimInstance Win32_Process | Where-Object {$_.Name -eq 'node.exe'}
if ($nodeProcs) {
    foreach ($p in $nodeProcs) {
        $output += "PID: $($p.ProcessId)"
        $output += "CommandLine: $($p.CommandLine)"
        $output += "-------------------"
    }
} else {
    $output += "No Node processes found"
}

$output | Out-File -FilePath "C:\Users\Allen\.gemini\antigravity\scratch\fairy90210\process_log.txt" -Encoding utf8
