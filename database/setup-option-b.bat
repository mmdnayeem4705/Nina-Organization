@echo off
REM Use CMD for mysql input redirection (PowerShell does not support <)
cd /d "%~dp0.."
echo === Nina Organization - MySQL Setup (Option B) ===
echo.

set MYSQL_USER=root
set MYSQL_PWD=Neo@2003

echo [1/2] Creating database...
mysql -u %MYSQL_USER% -p%MYSQL_PWD% < database\01-create-database.sql
if errorlevel 1 goto error

echo [2/2] Creating tables...
mysql -u %MYSQL_USER% -p%MYSQL_PWD% nina_db < database\02-create-tables.sql
if errorlevel 1 goto error

echo.
echo SUCCESS. Database and tables created.
echo Next: cd backend ^&^& run.cmd spring-boot:run
goto end

:error
echo.
echo FAILED. Check MySQL is running and credentials are correct.

:end
pause
