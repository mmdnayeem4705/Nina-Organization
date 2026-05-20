# Auto-detect JAVA_HOME; prefer JDK 17+ for Spring Boot / Lombok
$preferred = @(
    "$env:ProgramFiles\Eclipse Adoptium\jdk-17*",
    "$env:ProgramFiles\Java\jdk-17*",
    "$env:ProgramFiles\Microsoft\jdk-17*"
)
foreach ($pattern in $preferred) {
    $found = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -First 1
    if ($found -and (Test-Path "$($found.FullName)\bin\java.exe")) {
        $env:JAVA_HOME = $found.FullName
        break
    }
}

if (-not $env:JAVA_HOME -or -not (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    $javaCmd = Get-Command java -ErrorAction SilentlyContinue
    if ($javaCmd) {
        $javaBin = Split-Path $javaCmd.Source -Parent
        $env:JAVA_HOME = Split-Path $javaBin -Parent
    }
}

if (-not $env:JAVA_HOME -or -not (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    Write-Error "Java not found. Install JDK 17+ or set JAVA_HOME."
    exit 1
}

Write-Host "Using JAVA_HOME=$env:JAVA_HOME"
& "$PSScriptRoot\mvnw.cmd" @args
