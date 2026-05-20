-- Optional: run on existing nina_db if events table lacks participate-hub columns.
-- Hibernate ddl-auto=update also applies these on backend restart.

USE nina_db;

ALTER TABLE events ADD COLUMN prize_pool VARCHAR(255);
ALTER TABLE events ADD COLUMN team_size VARCHAR(50);
ALTER TABLE events ADD COLUMN topic VARCHAR(255);
ALTER TABLE events ADD COLUMN featured TINYINT(1) NOT NULL DEFAULT 0;
