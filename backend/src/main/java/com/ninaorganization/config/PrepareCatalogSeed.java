package com.ninaorganization.config;

import com.ninaorganization.entity.Course;
import com.ninaorganization.entity.enums.CourseCategory;
import com.ninaorganization.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(3)
@RequiredArgsConstructor
public class PrepareCatalogSeed implements CommandLineRunner {

    private final CourseRepository courseRepository;

    @Override
    public void run(String... args) {
        if (courseRepository.count() >= 15) return;
        catalog().forEach(courseRepository::save);
    }

    private List<Course> catalog() {
        return List.of(
                course("Java Full Stack Roadmap", "From Java basics to Spring Boot + React deployment.", CourseCategory.FULL_STACK, 600, 45),
                course("Frontend Developer Roadmap", "HTML, CSS, JavaScript, React, and portfolio projects.", CourseCategory.FULL_STACK, 480, 38),
                course("Backend Developer Roadmap", "REST, databases, auth, and microservices.", CourseCategory.FULL_STACK, 520, 40),
                course("DevOps Engineer Track", "Linux, Docker, Kubernetes, CI/CD, and AWS.", CourseCategory.DEVOPS, 400, 32),
                course("AI/ML Foundations", "Python, ML, deep learning, and Gen AI basics.", CourseCategory.AI_ML, 450, 36),
                course("Data Science Bootcamp", "Statistics, Pandas, visualization, and ML projects.", CourseCategory.DATA_SCIENCE, 500, 42),
                course("Cybersecurity Essentials", "Networking, OWASP, pentesting, and SOC basics.", CourseCategory.CYBERSECURITY, 360, 28),
                course("TCS Digital Preparation", "Aptitude, coding, and TCS-specific interview prep.", CourseCategory.COMPANY_PREP, 240, 20),
                course("Infosys SP DSA Track", "Infosys pattern DSA and verbal ability.", CourseCategory.COMPANY_PREP, 200, 18),
                course("Product Company DSA 150", "Curated 150 problems for FAANG-style interviews.", CourseCategory.DSA, 300, 150),
                course("Arrays & Strings Mastery", "Easy to hard problems with video solutions.", CourseCategory.DSA, 180, 60),
                course("Trees, Graphs & DP", "Advanced DSA for coding rounds.", CourseCategory.DSA, 220, 55),
                course("Mock HR Interview", "Common HR questions with sample answers.", CourseCategory.MOCK_INTERVIEW, 60, 12),
                course("Technical Mock Interview", "Java, Spring, React, and system design Q&A.", CourseCategory.MOCK_INTERVIEW, 90, 25),
                course("System Design Mock", "Scalability, caching, and architecture patterns.", CourseCategory.MOCK_INTERVIEW, 120, 15),
                course("Spring Boot Masterclass Video", "Recorded enterprise Spring Boot tutorials.", CourseCategory.VIDEO_TUTORIAL, 180, 24),
                course("React 19 Deep Dive", "Hooks, server components, and performance.", CourseCategory.VIDEO_TUTORIAL, 150, 18),
                course("Company Seminar: Hiring 2026", "Nina HR panel on what we look for in candidates.", CourseCategory.VIDEO_TUTORIAL, 45, 6),
                course("Aptitude for Placements", "Quant, logical reasoning, and verbal.", CourseCategory.APTITUDE, 120, 30),
                course("SQL for Interviews", "Joins, indexes, and query optimization.", CourseCategory.DSA, 90, 22)
        );
    }

    private Course course(String title, String desc, CourseCategory cat, int mins, int lessons) {
        return Course.builder().title(title).description(desc).category(cat)
                .durationMinutes(mins).totalLessons(lessons).build();
    }
}
