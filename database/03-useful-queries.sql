-- Useful queries (MySQL)
USE nina_db;

SELECT id, email, role, banned FROM users;
SELECT id, title, active FROM jobs;
SELECT id, status, applied_at FROM applications ORDER BY applied_at DESC;
