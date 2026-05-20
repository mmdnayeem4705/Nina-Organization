@echo off
echo === Nina Organization - MySQL via Docker ===
cd /d "%~dp0.."
docker compose up -d
echo.
echo MySQL: localhost:3306  database=nina_db  user=root  password=root
echo Update backend\src\main\resources\application-local.properties if needed.
echo Then run: cd backend ^&^& run.cmd spring-boot:run
pause
