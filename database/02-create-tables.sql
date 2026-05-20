-- Nina Organization — create all tables (MySQL 8)
-- Run AFTER 01-create-database.sql:
--   mysql -u root -p nina_db < database/02-create-tables.sql

USE nina_db;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS contest_registrations;
DROP TABLE IF EXISTS course_progress;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS saved_jobs;
DROP TABLE IF EXISTS resumes;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS hackathons;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS internships;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------------
-- users
-- ---------------------------------------------------------------------------
CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL,
    enabled TINYINT(1) NOT NULL DEFAULT 1,
    email_verified TINYINT(1) NOT NULL DEFAULT 0,
    banned TINYINT(1) NOT NULL DEFAULT 0,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME(6),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- jobs
-- ---------------------------------------------------------------------------
CREATE TABLE jobs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    role_title VARCHAR(255),
    domain VARCHAR(255),
    location VARCHAR(255),
    salary_min DECIMAL(19,2),
    salary_max DECIMAL(19,2),
    experience VARCHAR(255),
    work_mode VARCHAR(50),
    duration_months INT,
    deadline DATE,
    posted_by_id BIGINT,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_jobs_posted_by (posted_by_id),
    CONSTRAINT fk_jobs_posted_by FOREIGN KEY (posted_by_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- internships
-- ---------------------------------------------------------------------------
CREATE TABLE internships (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    domain VARCHAR(255),
    category VARCHAR(255),
    location VARCHAR(255),
    duration VARCHAR(100),
    stipend DECIMAL(19,2),
    stipend_label VARCHAR(100),
    virtual TINYINT(1) NOT NULL DEFAULT 0,
    certificate_provided TINYINT(1) NOT NULL DEFAULT 1,
    small_project TINYINT(1) NOT NULL DEFAULT 0,
    featured TINYINT(1) NOT NULL DEFAULT 0,
    live_project TINYINT(1) NOT NULL DEFAULT 0,
    ppo_available TINYINT(1) NOT NULL DEFAULT 0,
    skill_based TINYINT(1) NOT NULL DEFAULT 0,
    work_mode VARCHAR(50),
    level VARCHAR(50),
    required_skills TEXT,
    tasks TEXT,
    mentor_name VARCHAR(255),
    mentor_role VARCHAR(255),
    mentor_experience VARCHAR(100),
    mentor_linked_in VARCHAR(500),
    progress_weeks TEXT,
    openings INT NOT NULL DEFAULT 10,
    applied_count INT NOT NULL DEFAULT 0,
    deadline DATE,
    posted_by_id BIGINT,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_internships_posted_by (posted_by_id),
    CONSTRAINT fk_internships_posted_by FOREIGN KEY (posted_by_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------------------
CREATE TABLE applications (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    job_id BIGINT,
    internship_id BIGINT,
    status VARCHAR(50) NOT NULL DEFAULT 'APPLIED',
    resume_url VARCHAR(500),
    cover_letter TEXT,
    applied_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_applications_user (user_id),
    KEY idx_applications_job (job_id),
    KEY idx_applications_internship (internship_id),
    CONSTRAINT fk_applications_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_applications_job FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
    CONSTRAINT fk_applications_internship FOREIGN KEY (internship_id) REFERENCES internships (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- resumes
-- ---------------------------------------------------------------------------
CREATE TABLE resumes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    file_name VARCHAR(255),
    file_url VARCHAR(500),
    is_primary TINYINT(1) NOT NULL DEFAULT 0,
    ats_score INT,
    ai_analysis TEXT,
    uploaded_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_resumes_user (user_id),
    CONSTRAINT fk_resumes_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- saved_jobs
-- ---------------------------------------------------------------------------
CREATE TABLE saved_jobs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    job_id BIGINT NOT NULL,
    saved_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uk_saved_jobs_user_job (user_id, job_id),
    CONSTRAINT fk_saved_jobs_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_saved_jobs_job FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
CREATE TABLE events (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50),
    start_date DATETIME(6),
    end_date DATETIME(6),
    location VARCHAR(255),
    registration_link VARCHAR(500),
    max_participants INT NOT NULL DEFAULT 0,
    registered_count INT NOT NULL DEFAULT 0,
    created_by_id BIGINT,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_events_created_by (created_by_id),
    CONSTRAINT fk_events_created_by FOREIGN KEY (created_by_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- hackathons
-- ---------------------------------------------------------------------------
CREATE TABLE hackathons (
    id BIGINT NOT NULL AUTO_INCREMENT,
    event_id BIGINT,
    prize_pool VARCHAR(255),
    tech_stack VARCHAR(500),
    team_size VARCHAR(100),
    PRIMARY KEY (id),
    UNIQUE KEY uk_hackathons_event (event_id),
    CONSTRAINT fk_hackathons_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------
CREATE TABLE notifications (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(100),
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_notifications_user (user_id),
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- interviews
-- ---------------------------------------------------------------------------
CREATE TABLE interviews (
    id BIGINT NOT NULL AUTO_INCREMENT,
    application_id BIGINT NOT NULL,
    interview_type VARCHAR(100),
    scheduled_at DATETIME(6),
    meeting_link VARCHAR(500),
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'SCHEDULED',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_interviews_application (application_id),
    CONSTRAINT fk_interviews_application FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- courses
-- ---------------------------------------------------------------------------
CREATE TABLE courses (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    video_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    duration_minutes INT NOT NULL DEFAULT 0,
    total_lessons INT NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- course_progress
-- ---------------------------------------------------------------------------
CREATE TABLE course_progress (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    progress_percent INT NOT NULL DEFAULT 0,
    completed_lessons INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_course_progress_user_course (user_id, course_id),
    CONSTRAINT fk_course_progress_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_course_progress_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- contest_registrations
-- ---------------------------------------------------------------------------
CREATE TABLE contest_registrations (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    score INT NOT NULL DEFAULT 0,
    contest_rank INT NOT NULL DEFAULT 0,
    registered_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uk_contest_reg_user_event (user_id, event_id),
    CONSTRAINT fk_contest_reg_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_contest_reg_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SELECT 'All Nina Organization tables created successfully.' AS status;
