-- Nina Organization — MySQL setup
-- Run: mysql -u root -p < database/01-create-database.sql

CREATE DATABASE IF NOT EXISTS nina_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nina_db;

-- Optional dedicated app user (recommended for production)
-- CREATE USER IF NOT EXISTS 'nina_app'@'localhost' IDENTIFIED BY 'strong_password_here';
-- GRANT ALL PRIVILEGES ON nina_db.* TO 'nina_app'@'localhost';
-- FLUSH PRIVILEGES;

SELECT 'Database nina_db is ready.' AS status;
