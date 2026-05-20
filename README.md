# 🚀 Nina Organization – Enterprise Job Application & Recruitment Portal

## 📌 Project Overview

**Nina Organization** is a full-stack enterprise-level recruitment management platform designed for hiring employees, interns, and conducting company events such as hackathons, coding contests, seminars, and workshops.

The platform supports three different user roles:

* 👨‍💻 Job Seeker
* 🧑‍💼 HR
* 🛡️ Admin

Each role has its own authentication, authorization, dashboard, UI, and functionalities.

The project is built using modern enterprise technologies with scalable architecture, secure authentication, real-time workflows, analytics, monitoring, and production-ready deployment.

---

# 🌟 Main Features

## 👨‍💻 Job Seeker Portal

### Features

* 🔐 Register/Login
* 📄 Resume Upload
* 💼 Apply for Jobs
* 🎯 Recommended Jobs
* 🧠 Skill-based Recommendations
* 📌 Save Jobs
* 📊 Track Application Status
* 🎓 Internship Applications
* 📚 Learning & Preparation Section
* 🏆 Participate in Hackathons & Coding Contests
* 🔔 Real-Time Notifications

### Pages

* 🏠 Home
* 💼 Jobs
* 🎓 Internships
* 📚 Prepare
* 🏆 Participate
* 📊 Application Tracker
* 👤 Profile
* 🔔 Notifications

---

## 🧑‍💼 HR Portal

### Features

* ➕ Create/Edit/Delete Jobs
* 📅 Manage Hiring Deadlines
* 🎓 Create Internship Programs
* 📂 Resume Screening
* ✅ Accept/Reject Candidates
* 🔄 Move Candidates Between Hiring Rounds
* 📧 Send Interview Emails
* 🏆 Organize Hackathons & Contests
* 📢 Conduct Seminars/Webinars
* 📊 Analytics Dashboard

### HR Workflow

```text
Applied → Screening → Assessment → Interview → Offer
```

---

## 🛡️ Admin Portal

### Features

* 👥 Manage Users & HRs
* 🚫 Ban/Unban Accounts
* 📈 Platform Analytics
* 🧾 System Monitoring
* ⚙️ Platform Configuration
* 📊 Reports & Statistics
* 🐞 Error Monitoring
* 🔍 Activity Logs

---

# 🏗️ Tech Stack

## 🎨 Frontend

* ⚛️ React.js
* 🔷 TypeScript
* 🎨 TailwindCSS
* 🧩 Shadcn UI
* 🔄 React Query / TanStack Query
* 🧠 Zustand / Redux Toolkit
* ✨ Framer Motion
* 🌐 Axios
* 🛣️ React Router DOM

---

## ⚙️ Backend

* ☕ Java
* 🍃 Spring Boot
* 🔐 Spring Security
* 🪪 JWT Authentication
* 🗄️ Hibernate / JPA
* 📦 Maven
* 🌐 REST APIs

---

## 🗃️ Database

* 🐬 MySQL

---

## ☁️ Cloud & Services

* 📧 Resend (Emails)
* 🐞 Sentry (Error Tracking)
* 📊 PostHog (Analytics)
* 🔄 Supabase Realtime (Optional)

---

## 🧪 Testing & API Tools

* 📬 Postman (API Testing)
* 🎭 Playwright (Frontend Testing & Automation)

---

# 🔐 Authentication & Authorization

Implemented using:

* Spring Security
* JWT Authentication
* Role-Based Access Control (RBAC)

## Roles

```text
ROLE_JOBSEEKER
ROLE_HR
ROLE_ADMIN
```

---

# 📁 Project Structure

# 📦 Frontend Structure

```text
frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── dashboard/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── styles/
│   └── utils/
│
├── public/
├── package.json
└── vite.config.ts
```

---

# 📦 Backend Structure

```text
backend/
│
├── src/main/java/com/ninaorganization/
│
├── config/
├── controller/
├── dto/
├── entity/
├── exception/
├── repository/
├── security/
├── service/
├── serviceImpl/
├── utils/
│
├── resources/
│   ├── application.properties
│
└── pom.xml
```

---

# 🗄️ Database Tables

## Core Tables

* users
* roles
* jobs
* internships
* applications
* resumes
* interviews
* notifications
* events
* hackathons
* contests
* webinars
* seminars
* saved_jobs
* courses
* activity_logs

---

# 🔥 Real-Time Features

Implemented using:

* Supabase Realtime OR WebSockets

## Real-Time Updates

* 📊 Application Status
* 🔔 Notifications
* 📅 Event Updates
* 🎤 Seminar Alerts
* 🏆 Contest Announcements

---

# 📧 Email System

Integrated with:

* 📮 Resend

## Email Features

* ✅ Email Verification
* 🔑 Password Reset
* 💼 Job Application Confirmation
* 📅 Interview Scheduling
* 🎉 Selection Emails
* ❌ Rejection Emails
* 🔔 Event Reminders

---

# 📊 Analytics & Monitoring

## 🐞 Sentry

Tracks:

* Backend Exceptions
* Frontend Crashes
* API Failures
* Error Logs

## 📈 PostHog

Tracks:

* User Activity
* Feature Usage
* Engagement Metrics
* Dashboard Analytics

---

# 🧠 Advanced Features

## Planned Features

* 🤖 AI Resume Analyzer
* 📄 ATS Resume Checker
* 🎯 AI Job Recommendation
* 💻 Online Coding Compiler
* 🏅 Certificate Generation
* 📈 Leaderboards
* 📝 Resume Builder

---

# 🧪 API Testing Using Postman

## Postman Features

* 🔐 Authentication API Testing
* 📬 CRUD API Testing
* 🧪 Request Collections
* 🌍 Environment Variables
* 📊 API Validation

## Sample APIs

```http
POST /api/auth/register
POST /api/auth/login
GET /api/jobs
POST /api/jobs/apply
GET /api/applications/status
```

---

# 🎭 Frontend Testing Using Playwright

## Playwright Testing Includes

* ✅ Login Testing
* ✅ Registration Testing
* ✅ Protected Route Testing
* ✅ Dashboard Navigation
* ✅ Job Application Workflow
* ✅ Responsive UI Testing

---

# 🎨 UI/UX Features

* 🌙 Dark/Light Mode
* 📱 Fully Responsive Design
* ✨ Smooth Animations
* 📊 Dashboard Charts
* 📋 Interactive Tables
* 🧩 Reusable Components
* 🚀 Professional Enterprise UI

---

# 🚀 Deployment

## Frontend

* ▲ Vercel

## Backend

* 🚂 Railway
  OR
* 🌐 Render

## Database

* 🐬 MySQL

---

# 🛠️ Installation Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/nina-organization.git
```

---

# 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 3️⃣ Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

---

# 4️⃣ Database Setup

Create MySQL database:

```sql
CREATE DATABASE nina_db;
```

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nina_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

# 🔐 Environment Variables

## Frontend `.env`

```env
VITE_API_URL=http://localhost:8080
```

---

## Backend `.env`

```env
JWT_SECRET=your_secret_key
RESEND_API_KEY=your_resend_key
SENTRY_DSN=your_sentry_dsn
POSTHOG_API_KEY=your_posthog_key
```

---

# 📈 Future Enhancements

* 🌍 Multi-language Support
* 🤖 AI Interview Assistant
* 🎥 Video Interview System
* 📞 Real-Time Chat
* 📊 Advanced Analytics
* 📱 Mobile Application

---

# 🎯 Project Goals

✅ Enterprise-Level Architecture
✅ Real-Time Recruitment Workflow
✅ Secure Authentication & Authorization
✅ Scalable Backend APIs
✅ Modern Frontend UI
✅ Analytics & Monitoring
✅ Full Hiring Ecosystem
✅ Portfolio-Ready Production Project

---

# 🤝 Contributors

Developed by:
👨‍💻 Mulla Mohammed Nayeem

---

# 📜 License

This project is licensed under the MIT License.

---

# 🌟 Inspiration

Inspired by platforms like:

* 💼 LinkedIn Jobs
* 🧑‍💼 Naukri
* 🎓 Internshala
* 🏆 HackerRank
* 💻 LeetCode
* 🏢 Enterprise Internal Hiring Systems

---

Demo logins (after backend starts)
Email	          Password
seeker@nina.com   seeker123
hr@nina.com       hr123456
admin@nina.com    admin123

# ❤️ Nina Organization

Building the future recruitment ecosystem with innovation, scalability, and modern technology 🚀
