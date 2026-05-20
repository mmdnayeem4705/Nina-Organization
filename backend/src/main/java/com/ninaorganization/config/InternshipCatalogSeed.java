package com.ninaorganization.config;

import com.ninaorganization.entity.Internship;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.InternshipLevel;
import com.ninaorganization.entity.enums.WorkMode;
import com.ninaorganization.repository.InternshipRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@Order(2)
@RequiredArgsConstructor
public class InternshipCatalogSeed implements CommandLineRunner {

    private final InternshipRepository internshipRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (internshipRepository.count() >= 20) return;
        User hr = userRepository.findByEmail("hr@nina.com").orElse(null);
        if (hr == null) return;
        catalog(hr).forEach(internshipRepository::save);
    }

    private List<Internship> catalog(User hr) {
        List<Internship> list = new ArrayList<>();
        list.add(row("Java Full Stack Intern", "Software Development", "Full Stack",
                "Build REST APIs with Spring Boot and React dashboards. Weekly code reviews.",
                WorkMode.REMOTE, "3 Months", 10000, "₹10,000/month", InternshipLevel.INTERMEDIATE,
                true, true, true, skills("Java", "Spring Boot", "React", "SQL"),
                tasks("Build APIs", "Fix bugs", "Create dashboards", "Sprint meetings"),
                "Priya Sharma", "Senior Full Stack Engineer", "6+ Years", null,
                weeks("Week 1: Onboarding", "Week 2: Minor tasks", "Week 3: Team project", "Week 4: Evaluation"), hr));
        list.add(row("React Developer Intern", "Software Development", "Frontend",
                "Component-driven UI with React 19 and Tailwind.",
                WorkMode.REMOTE, "2 Months", 8000, "₹8,000/month", InternshipLevel.BEGINNER,
                true, false, false, skills("React", "TypeScript", "CSS", "Git"),
                tasks("UI components", "Responsive layouts", "API integration"),
                "Arjun Mehta", "Frontend Lead", "5+ Years", null,
                weeks("Week 1: Learning", "Week 2: UI tasks", "Week 3: Feature ship", "Week 4: Demo"), hr));
        list.add(row("Angular Developer Intern", "Software Development", "Frontend",
                "Enterprise Angular with RxJS and NgRx patterns.",
                WorkMode.HYBRID, "3 Months", 10000, "₹10,000/month", InternshipLevel.INTERMEDIATE,
                false, false, true, skills("Angular", "TypeScript", "RxJS"),
                tasks("Modules", "Services", "E2E tests"),
                "Mark Thompson", "Angular Lead", "7+ Years", null,
                weeks("Week 1-12: Agile delivery"), hr));
        list.add(row("Next.js Developer Intern", "Software Development", "Frontend",
                "SSR and App Router with Next.js 15.",
                WorkMode.REMOTE, "2 Months", 9000, "₹9,000/month", InternshipLevel.INTERMEDIATE,
                true, false, true, skills("Next.js", "React", "Tailwind"),
                tasks("Pages", "API routes", "Deploy on Vercel"),
                "Arjun Mehta", "Frontend Lead", "5+ Years", null,
                weeks("4-week sprint plan"), hr));
        list.add(row("UI/UX Developer Intern", "Software Development", "Frontend",
                "Figma prototypes and accessible UI implementation.",
                WorkMode.REMOTE, "2 Months", 6000, "₹6,000/month", InternshipLevel.BEGINNER,
                true, false, false, skills("Figma", "HTML", "CSS", "Accessibility"),
                tasks("Wireframes", "Design system", "Dev handoff"),
                "Emma Wilson", "UX Lead", "5+ Years", null,
                weeks("Design sprint model"), hr));
        list.add(row("Java Spring Boot Intern", "Software Development", "Backend",
                "Enterprise backend with JPA, Security, and REST.",
                WorkMode.HYBRID, "3 Months", 12000, "₹12,000/month", InternshipLevel.INTERMEDIATE,
                true, true, true, skills("Java", "Spring Boot", "MySQL", "REST"),
                tasks("API design", "Unit tests", "Database migrations"),
                "Vikram Singh", "Backend Architect", "8+ Years", null,
                weeks("Week 1: Setup", "Week 2: CRUD", "Week 3: Auth", "Week 4: Review"), hr));
        list.add(row("Node.js Developer Intern", "Software Development", "Backend",
                "Express.js APIs and microservices.",
                WorkMode.REMOTE, "2 Months", 9000, "₹9,000/month", InternshipLevel.BEGINNER,
                false, false, false, skills("Node.js", "Express", "MongoDB"),
                tasks("REST endpoints", "Auth middleware", "Docs"),
                "Lisa Chen", "Node.js Developer", "4+ Years", null,
                weeks("Week 1-2: APIs", "Week 3-4: Polish"), hr));
        list.add(row("Python Backend Intern", "Software Development", "Backend",
                "FastAPI services and async data pipelines.",
                WorkMode.REMOTE, "3 Months", 11000, "₹11,000/month", InternshipLevel.INTERMEDIATE,
                false, true, true, skills("Python", "FastAPI", "PostgreSQL"),
                tasks("APIs", "Background jobs", "Testing"),
                "Rahul Verma", "Python Lead", "6+ Years", null,
                weeks("Monthly milestones"), hr));
        list.add(row("REST API Developer Intern", "Software Development", "Backend",
                "Design and document production REST APIs.",
                WorkMode.REMOTE, "2 Months", 8500, "₹8,500/month", InternshipLevel.BEGINNER,
                false, false, false, skills("REST", "OpenAPI", "Postman"),
                tasks("API specs", "Integration tests", "Swagger"),
                "Vikram Singh", "API Architect", "7+ Years", null,
                weeks("2-month delivery"), hr));
        list.add(row("MERN Stack Intern", "Software Development", "Full Stack",
                "MongoDB, Express, React, Node end-to-end.",
                WorkMode.REMOTE, "3 Months", 15000, "₹15,000/month", InternshipLevel.ADVANCED,
                true, true, true, skills("MongoDB", "Express", "React", "Node.js"),
                tasks("Product module", "Cloud deploy", "Code reviews"),
                "Neha Kapoor", "Engineering Manager", "7+ Years", null,
                weeks("Week 1-4: Sprints", "Week 5-8: Fixes", "Week 9-12: Launch"), hr));
        list.add(row("MEAN Stack Intern", "Software Development", "Full Stack",
                "Angular + Node + MongoDB product internship.",
                WorkMode.HYBRID, "3 Months", 13000, "₹13,000/month", InternshipLevel.INTERMEDIATE,
                false, false, true, skills("Angular", "Node.js", "MongoDB"),
                tasks("Full stack features", "CI setup"),
                "Neha Kapoor", "Full Stack Lead", "6+ Years", null,
                weeks("12-week plan"), hr));
        list.add(row("AI Engineer Intern", "AI/ML", "AI/ML",
                "Ship AI features into production apps.",
                WorkMode.REMOTE, "3 Months", 18000, "₹18,000/month", InternshipLevel.ADVANCED,
                true, true, true, skills("Python", "TensorFlow", "LLMs"),
                tasks("Model APIs", "Evaluation", "Monitoring"),
                "Dr. Ananya Rao", "AI Research Lead", "10+ Years", null,
                weeks("Research + ship"), hr));
        list.add(row("Generative AI Intern", "AI/ML", "AI/ML",
                "LLM integration and prompt engineering.",
                WorkMode.REMOTE, "3 Months", 18000, "₹18,000/month", InternshipLevel.INTERMEDIATE,
                true, true, true, skills("Python", "LangChain", "OpenAI API"),
                tasks("RAG pipeline", "Fine-tuning", "Metrics"),
                "Dr. Ananya Rao", "AI Lead", "8+ Years", null,
                weeks("Week 1-4 plan"), hr));
        list.add(row("Machine Learning Intern", "AI/ML", "AI/ML",
                "Classical ML for recommendations.",
                WorkMode.HYBRID, "6 Months", 20000, "₹20,000/month", InternshipLevel.ADVANCED,
                false, true, true, skills("Python", "Scikit-learn", "Pandas"),
                tasks("Data prep", "Training", "A/B tests"),
                "Rahul Verma", "ML Engineer", "6+ Years", null,
                weeks("Bi-weekly demos"), hr));
        list.add(row("Deep Learning Intern", "AI/ML", "AI/ML",
                "Neural networks for vision and NLP.",
                WorkMode.REMOTE, "4 Months", 17000, "₹17,000/month", InternshipLevel.ADVANCED,
                false, true, true, skills("PyTorch", "CNN", "Transformers"),
                tasks("Model design", "GPU training", "Papers"),
                "Dr. Ananya Rao", "DL Scientist", "9+ Years", null,
                weeks("Monthly reviews"), hr));
        list.add(row("Computer Vision Intern", "AI/ML", "AI/ML",
                "Image classification and object detection.",
                WorkMode.REMOTE, "3 Months", 16000, "₹16,000/month", InternshipLevel.ADVANCED,
                false, true, false, skills("OpenCV", "YOLO", "Python"),
                tasks("Dataset", "Training", "Demo app"),
                "Rahul Verma", "CV Engineer", "5+ Years", null,
                weeks("Project-based"), hr));
        list.add(row("NLP Intern", "AI/ML", "AI/ML",
                "Text classification and sentiment pipelines.",
                WorkMode.REMOTE, "3 Months", 16000, "₹16,000/month", InternshipLevel.ADVANCED,
                false, true, true, skills("Python", "NLP", "Transformers"),
                tasks("Labeling", "Training", "API deploy"),
                "Dr. Ananya Rao", "NLP Scientist", "8+ Years", null,
                weeks("Sprint delivery"), hr));
        list.add(row("DevOps Intern", "Cloud & DevOps", "DevOps",
                "CI/CD, Docker, and Kubernetes automation.",
                WorkMode.REMOTE, "3 Months", 14000, "₹14,000/month", InternshipLevel.INTERMEDIATE,
                true, false, true, skills("Docker", "Kubernetes", "Jenkins", "AWS"),
                tasks("Pipelines", "Monitoring", "IaC"),
                "Karan Joshi", "DevOps Lead", "9+ Years", null,
                weeks("Week 1: Docker", "Week 2: K8s", "Week 3: CI/CD", "Week 4: Deploy"), hr));
        list.add(row("AWS Cloud Intern", "Cloud & DevOps", "Cloud",
                "AWS Lambda, S3, RDS for scalable apps.",
                WorkMode.REMOTE, "2 Months", 10000, "₹10,000/month", InternshipLevel.BEGINNER,
                false, false, false, skills("AWS", "EC2", "S3", "CloudWatch"),
                tasks("Cloud labs", "Cost optimization", "Security"),
                "Sneha Iyer", "Cloud Consultant", "5+ Years", null,
                weeks("Week 1-2: Core", "Week 3-4: Project"), hr));
        list.add(row("Docker & Kubernetes Intern", "Cloud & DevOps", "DevOps",
                "Container orchestration for microservices.",
                WorkMode.REMOTE, "2 Months", 12000, "₹12,000/month", InternshipLevel.INTERMEDIATE,
                false, true, true, skills("Docker", "Kubernetes", "Helm"),
                tasks("Manifests", "Helm charts", "Observability"),
                "Karan Joshi", "Platform Engineer", "7+ Years", null,
                weeks("Hands-on labs"), hr));
        list.add(row("CI/CD Intern", "Cloud & DevOps", "DevOps",
                "GitHub Actions and Jenkins pipelines.",
                WorkMode.REMOTE, "2 Months", 9500, "₹9,500/month", InternshipLevel.BEGINNER,
                false, false, false, skills("Git", "Jenkins", "GitHub Actions"),
                tasks("Pipeline setup", "Quality gates"),
                "Karan Joshi", "DevOps Engineer", "5+ Years", null,
                weeks("4-week bootcamp"), hr));
        list.add(row("Ethical Hacking Intern", "Cybersecurity", "Security",
                "Penetration testing and security audits.",
                WorkMode.HYBRID, "3 Months", 12000, "₹12,000/month", InternshipLevel.INTERMEDIATE,
                true, false, true, skills("Networking", "Linux", "OWASP", "Burp Suite"),
                tasks("Vuln scans", "Reports", "Remediation"),
                "Amit Desai", "Security Analyst", "7+ Years", null,
                weeks("Week 1: Recon", "Week 2: Scan", "Week 3: Lab", "Week 4: Report"), hr));
        list.add(row("SOC Analyst Intern", "Cybersecurity", "Security",
                "Monitor alerts and incident response.",
                WorkMode.ONSITE, "3 Months", 10000, "₹10,000/month", InternshipLevel.BEGINNER,
                false, false, true, skills("SIEM", "Log analysis", "Networking"),
                tasks("Alert triage", "Playbooks", "Documentation"),
                "Amit Desai", "SOC Lead", "6+ Years", null,
                weeks("Shift rotations + training"), hr));
        list.add(row("Penetration Testing Intern", "Cybersecurity", "Security",
                "Web and network penetration tests.",
                WorkMode.HYBRID, "3 Months", 13000, "₹13,000/month", InternshipLevel.ADVANCED,
                false, true, true, skills("Kali", "Metasploit", "OWASP"),
                tasks("Scoped tests", "Executive reports"),
                "Amit Desai", "Pen Tester", "8+ Years", null,
                weeks("Engagement-based"), hr));
        list.add(row("Data Analyst Intern", "Data", "Data",
                "SQL analytics and business dashboards.",
                WorkMode.REMOTE, "3 Months", 9000, "₹9,000/month", InternshipLevel.BEGINNER,
                true, false, false, skills("SQL", "Excel", "Power BI", "Python"),
                tasks("Reports", "Dashboards", "Presentations"),
                "Pooja Nair", "Data Analyst Lead", "5+ Years", null,
                weeks("Week 1: Clean", "Week 2: Analyze", "Week 3: Viz", "Week 4: Insights"), hr));
        list.add(row("Data Science Intern", "Data", "Data",
                "Predictive models for HR analytics.",
                WorkMode.REMOTE, "6 Months", 15000, "₹15,000/month", InternshipLevel.INTERMEDIATE,
                false, true, true, skills("Python", "Pandas", "ML", "SQL"),
                tasks("EDA", "Modeling", "Storytelling"),
                "Pooja Nair", "Data Scientist", "6+ Years", null,
                weeks("Monthly deliverables"), hr));
        list.add(row("Power BI Intern", "Data", "Data",
                "BI dashboards for recruitment metrics.",
                WorkMode.REMOTE, "2 Months", 0, "Unpaid (Certificate)",
                InternshipLevel.BEGINNER, false, false, false, skills("Power BI", "SQL", "DAX"),
                tasks("Dashboard design", "Data modeling"),
                "Pooja Nair", "BI Analyst", "4+ Years", null,
                weeks("4-week project"), hr));
        list.add(row("SQL Analyst Intern", "Data", "Data",
                "Complex queries and data warehousing.",
                WorkMode.REMOTE, "2 Months", 7000, "₹7,000/month", InternshipLevel.BEGINNER,
                false, false, false, skills("SQL", "MySQL", "ETL"),
                tasks("Query optimization", "Reports"),
                "Pooja Nair", "Analytics Engineer", "5+ Years", null,
                weeks("Query mastery track"), hr));
        list.add(row("Android Intern", "Mobile", "Mobile",
                "Native Android with Kotlin and Jetpack.",
                WorkMode.HYBRID, "3 Months", 10000, "₹10,000/month", InternshipLevel.INTERMEDIATE,
                false, false, true, skills("Kotlin", "Android", "REST"),
                tasks("Screens", "APIs", "Play Store prep"),
                "Rohit Malhotra", "Android Lead", "6+ Years", null,
                weeks("12-week roadmap"), hr));
        list.add(row("Flutter Developer Intern", "Mobile", "Mobile",
                "Cross-platform apps with Flutter.",
                WorkMode.REMOTE, "3 Months", 11000, "₹11,000/month", InternshipLevel.INTERMEDIATE,
                false, true, true, skills("Flutter", "Dart", "Firebase"),
                tasks("UI", "State mgmt", "Release"),
                "Rohit Malhotra", "Mobile Lead", "6+ Years", null,
                weeks("Week 1-4 delivery"), hr));
        list.add(row("React Native Intern", "Mobile", "Mobile",
                "Mobile apps with React Native and Expo.",
                WorkMode.REMOTE, "2 Months", 9500, "₹9,500/month", InternshipLevel.BEGINNER,
                true, false, false, skills("React Native", "Expo", "TypeScript"),
                tasks("Screens", "Navigation", "OTA updates"),
                "Rohit Malhotra", "RN Developer", "4+ Years", null,
                weeks("Sprint plan"), hr));
        list.add(row("Blockchain Developer Intern", "Blockchain", "Blockchain",
                "Smart contracts and Web3 dApps on EVM.",
                WorkMode.REMOTE, "3 Months", 20000, "₹20,000/month", InternshipLevel.ADVANCED,
                true, true, true, skills("Solidity", "Web3.js", "Hardhat", "Ethereum"),
                tasks("Contract audit", "dApp UI", "Testnet deploy"),
                "Dev Patel", "Blockchain Architect", "5+ Years", null,
                weeks("Week 1: Solidity", "Week 2: Contracts", "Week 3: dApp", "Week 4: Demo"), hr));
        list.add(row("Smart Contract Intern", "Blockchain", "Blockchain",
                "Solidity contracts for DeFi modules.",
                WorkMode.REMOTE, "2 Months", 15000, "₹15,000/month", InternshipLevel.ADVANCED,
                false, true, true, skills("Solidity", "OpenZeppelin", "Foundry"),
                tasks("Contracts", "Tests", "Gas optimization"),
                "Dev Patel", "Smart Contract Engineer", "4+ Years", null,
                weeks("Sprint delivery"), hr));
        list.add(row("Web3 Intern", "Blockchain", "Blockchain",
                "Wallet integration and dApp frontends.",
                WorkMode.REMOTE, "2 Months", 14000, "₹14,000/month", InternshipLevel.INTERMEDIATE,
                false, true, true, skills("ethers.js", "React", "IPFS"),
                tasks("Wallet connect", "NFT UI", "Testing"),
                "Dev Patel", "Web3 Developer", "3+ Years", null,
                weeks("Product sprint"), hr));
        list.add(row("Game Developer Intern", "Gaming", "Other",
                "Unity 2D mechanics and multiplayer basics.",
                WorkMode.REMOTE, "3 Months", 8000, "₹8,000/month", InternshipLevel.BEGINNER,
                false, true, false, skills("Unity", "C#", "Game design"),
                tasks("Gameplay", "Level design", "Bug fixes"),
                "Alex Kim", "Game Developer", "5+ Years", null,
                weeks("Prototype to beta"), hr));
        list.add(row("AR/VR Intern", "Gaming", "Other",
                "Immersive experiences with Unity XR.",
                WorkMode.HYBRID, "3 Months", 12000, "₹12,000/month", InternshipLevel.INTERMEDIATE,
                false, true, false, skills("Unity", "XR Toolkit", "C#"),
                tasks("Scenes", "Interactions", "Performance"),
                "Alex Kim", "XR Developer", "4+ Years", null,
                weeks("Milestone demos"), hr));
        list.add(row("IoT Intern", "IoT", "Other",
                "Sensors, MQTT, and cloud dashboards.",
                WorkMode.ONSITE, "3 Months", 7000, "₹7,000/month", InternshipLevel.INTERMEDIATE,
                false, false, false, skills("Arduino", "Raspberry Pi", "MQTT"),
                tasks("Hardware", "Firmware", "Dashboard"),
                "Sanjay Reddy", "IoT Engineer", "6+ Years", null,
                weeks("Lab + field tests"), hr));
        list.add(row("Embedded Systems Intern", "IoT", "Other",
                "Firmware on ARM microcontrollers.",
                WorkMode.ONSITE, "6 Months", 9000, "₹9,000/month", InternshipLevel.ADVANCED,
                false, false, true, skills("C", "RTOS", "Embedded Linux"),
                tasks("Drivers", "Debugging", "Documentation"),
                "Sanjay Reddy", "Embedded Lead", "8+ Years", null,
                weeks("Long-term project"), hr));
        list.add(row("Live Project: E-Commerce Module", "Software Development", "Live Projects",
                "Build cart, checkout API, deploy frontend to Vercel.",
                WorkMode.REMOTE, "1 Month", 5000, "₹5,000/month", InternshipLevel.INTERMEDIATE,
                true, true, false, skills("Java", "React", "MySQL"),
                tasks("Cart API", "Payment mock", "Vercel deploy"),
                "Priya Sharma", "Product Engineer", "6+ Years", null,
                weeks("Intensive 4-week delivery"), hr));
        list.add(row("Live Project: HR Analytics Dashboard", "Data", "Live Projects",
                "Real Power BI dashboard on recruitment data.",
                WorkMode.REMOTE, "1 Month", 0, "Performance-Based",
                InternshipLevel.BEGINNER, true, true, false, skills("Power BI", "SQL"),
                tasks("Data model", "KPIs", "Stakeholder demo"),
                "Pooja Nair", "BI Lead", "5+ Years", null,
                weeks("4-week intensive"), hr));
        return list;
    }

    private Internship row(String title, String domain, String category, String desc,
                           WorkMode mode, String duration, int stipend, String stipendLabel,
                           InternshipLevel level, boolean featured, boolean live, boolean ppo,
                           String skillsJson, String tasksJson,
                           String mentorName, String mentorRole, String mentorExp, String mentorLi,
                           String weeksJson, User hr) {
        return Internship.builder()
                .title(title).domain(domain).category(category).description(desc)
                .workMode(mode).duration(duration)
                .stipend(BigDecimal.valueOf(stipend)).stipendLabel(stipendLabel)
                .level(level).featured(featured).liveProject(live).ppoAvailable(ppo)
                .skillBased(true).virtual(mode == WorkMode.REMOTE)
                .certificateProvided(true).smallProject(live)
                .requiredSkills(skillsJson).tasks(tasksJson)
                .mentorName(mentorName).mentorRole(mentorRole).mentorExperience(mentorExp).mentorLinkedIn(mentorLi)
                .progressWeeks(weeksJson)
                .location(mode == WorkMode.REMOTE ? "Remote" : mode == WorkMode.HYBRID ? "Hybrid" : "Onsite")
                .openings(15).appliedCount((int) (Math.random() * 40))
                .deadline(LocalDate.now().plusMonths(2))
                .postedBy(hr).active(true)
                .build();
    }

    private String skills(String... s) {
        return "[\"" + String.join("\",\"", s) + "\"]";
    }

    private String tasks(String... s) {
        return "[\"" + String.join("\",\"", s) + "\"]";
    }

    private String weeks(String... s) {
        return "[\"" + String.join("\",\"", s) + "\"]";
    }
}
