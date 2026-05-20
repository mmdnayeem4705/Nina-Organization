-- Run on existing nina_db if you already created tables without new internship columns.
-- Hibernate ddl-auto=update also adds these automatically on backend start.

USE nina_db;

ALTER TABLE internships ADD COLUMN IF NOT EXISTS category VARCHAR(255);
ALTER TABLE internships ADD COLUMN IF NOT EXISTS stipend_label VARCHAR(100);
ALTER TABLE internships ADD COLUMN IF NOT EXISTS featured TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS live_project TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS ppo_available TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS skill_based TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS level VARCHAR(50);
ALTER TABLE internships ADD COLUMN IF NOT EXISTS required_skills TEXT;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS tasks TEXT;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS mentor_name VARCHAR(255);
ALTER TABLE internships ADD COLUMN IF NOT EXISTS mentor_role VARCHAR(255);
ALTER TABLE internships ADD COLUMN IF NOT EXISTS mentor_experience VARCHAR(100);
ALTER TABLE internships ADD COLUMN IF NOT EXISTS mentor_linked_in VARCHAR(500);
ALTER TABLE internships ADD COLUMN IF NOT EXISTS progress_weeks TEXT;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS openings INT NOT NULL DEFAULT 10;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS applied_count INT NOT NULL DEFAULT 0;
