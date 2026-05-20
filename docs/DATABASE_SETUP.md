# Database setup — Option B (MySQL installed on Windows)

Follow these steps in order.

---

## Step 1 — Install MySQL 8

1. Download: https://dev.mysql.com/downloads/installer/
2. Install **MySQL Server 8.x**.
3. Set a **root password** during setup (remember it).
4. Ensure service **MySQL80** is running: `Win + R` → `services.msc` → **MySQL80** → Running.

---

## Step 2 — Create database and tables

Open **PowerShell** in the project folder:

```powershell
cd "C:\Users\SINGAPORE\Downloads\Nina Organization"
```

**Easiest — run the setup script (PowerShell):**

```powershell
cd "C:\Users\SINGAPORE\Downloads\Nina Organization"
.\database\setup-option-b.ps1
```

Default password is `Neo@2003`. To use another password:

```powershell
.\database\setup-option-b.ps1 -Password "YourPassword"
```

**Or double-click:** `database\setup-option-b.bat` (uses CMD, works the same way).

**Manual commands (PowerShell does NOT support `<` redirection):**

```powershell
# Option 1 — pipe file content (recommended in PowerShell)
Get-Content database\01-create-database.sql -Raw | mysql -u root --password=Neo@2003
Get-Content database\02-create-tables.sql -Raw | mysql -u root --password=Neo@2003 nina_db

# Option 2 — use CMD for one line
cmd /c "mysql -u root -pNeo@2003 < database\01-create-database.sql"
cmd /c "mysql -u root -pNeo@2003 nina_db < database\02-create-tables.sql"
```

You should see: `All Nina Organization tables created successfully.`

**Tables created:**

| Table | Purpose |
|-------|---------|
| `users` | Accounts (job seeker, HR, admin) |
| `jobs` | Job postings |
| `internships` | Internship listings |
| `applications` | Job/internship applications |
| `resumes` | Uploaded resumes |
| `saved_jobs` | Bookmarked jobs |
| `events` | Hackathons, workshops, contests |
| `hackathons` | Hackathon details |
| `notifications` | User notifications |
| `interviews` | Scheduled interviews |
| `courses` | Learning content |
| `course_progress` | User course progress |
| `contest_registrations` | Event registrations |

**Optional — verify tables:**

```powershell
mysql -u root -p nina_db -e "SHOW TABLES;"
```

---

## Step 3 — Configure backend password

Copy the example file (if `application-local.properties` does not exist):

```powershell
copy backend\src\main\resources\application-local.properties.example backend\src\main\resources\application-local.properties
```

Edit **`backend\src\main\resources\application-local.properties`**:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nina_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_ROOT_PASSWORD
```

Replace `YOUR_MYSQL_ROOT_PASSWORD` with the password from Step 1.

**If you created tables manually (Step 2b),** add this line so Hibernate does not change the schema:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

If you skip Step 2b, leave `ddl-auto` unset (defaults to `update` — Hibernate creates tables automatically).

---

## Step 4 — Start the backend

```powershell
cd backend
.\run.ps1 spring-boot:run
```

Wait for: `Started NinaOrganizationApplication`

---

## Step 5 — Verify

Browser: **http://localhost:8080/api/health**

```json
{"status":"UP","service":"nina-backend"}
```

On first start, **demo users and sample data** are inserted automatically (if `users` table is empty).

| Role | Email | Password |
|------|-------|----------|
| Job Seeker | seeker@nina.com | seeker123 |
| HR | hr@nina.com | hr123456 |
| Admin | admin@nina.com | admin123 |

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Access denied for user 'root'` | Wrong password in `application-local.properties` |
| `Communications link failure` | Start **MySQL80** service |
| `mysql` not recognized | Add MySQL `bin` to PATH, e.g. `C:\Program Files\MySQL\MySQL Server 8.0\bin` |
| `Table doesn't exist` | Run `database\02-create-tables.sql` again |
| `mvn` not recognized | Use `.\run.ps1 spring-boot:run` from `backend` folder |

---

## SQL files reference

| File | What it does |
|------|----------------|
| `database/01-create-database.sql` | Creates `nina_db` |
| `database/02-create-tables.sql` | Creates all 13 tables + foreign keys |
| `database/03-useful-queries.sql` | Sample SELECT queries |
