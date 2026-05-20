# Nina Organization - Option B: create database + tables (PowerShell)
# Usage: .\database\setup-option-b.ps1

param(
    [string]$User = "root",
    [string]$Password = "Neo@2003"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path $PSScriptRoot -Parent

function Invoke-MySqlFile {
    param(
        [string]$File,
        [string]$Database = ""
    )
    $path = Join-Path $ProjectRoot $File
    if (-not (Test-Path $path)) {
        throw "File not found: $path"
    }
    $sql = Get-Content $path -Raw -Encoding UTF8
    $mysqlArgs = @("-u", $User, "--password=$Password", "--default-character-set=utf8mb4")
    if ($Database -ne "") {
        $mysqlArgs += $Database
    }
    $sql | & mysql @mysqlArgs
    if ($LASTEXITCODE -ne 0) {
        throw "mysql failed for $File (exit $LASTEXITCODE)"
    }
}

Write-Host "=== Nina Organization - MySQL setup (Option B) ===" -ForegroundColor Cyan
Write-Host "User: $User" -ForegroundColor Gray

try {
    Write-Host ""
    Write-Host "[1/2] Creating database nina_db..." -ForegroundColor Yellow
    Invoke-MySqlFile -File "database\01-create-database.sql"

    Write-Host "[2/2] Creating tables..." -ForegroundColor Yellow
    Invoke-MySqlFile -File "database\02-create-tables.sql" -Database "nina_db"

    Write-Host ""
    Write-Host "SUCCESS - database and tables are ready." -ForegroundColor Green
    Write-Host "Next: cd backend; .\run.ps1 spring-boot:run" -ForegroundColor Gray
}
catch {
    Write-Host ""
    Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Check: MySQL80 service is running and mysql.exe is on your PATH." -ForegroundColor Yellow
    exit 1
}
