package com.ninaorganization.config;

import com.ninaorganization.entity.*;
import com.ninaorganization.entity.enums.*;
import com.ninaorganization.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        userRepository.save(User.builder()
                .email("admin@nina.com").password(passwordEncoder.encode("admin123"))
                .firstName("Admin").lastName("Nina").role(RoleType.ROLE_ADMIN)
                .emailVerified(true).build());

        User hr = userRepository.save(User.builder()
                .email("hr@nina.com").password(passwordEncoder.encode("hr123456"))
                .firstName("HR").lastName("Manager").role(RoleType.ROLE_HR)
                .emailVerified(true).build());

        userRepository.save(User.builder()
                .email("seeker@nina.com").password(passwordEncoder.encode("seeker123"))
                .firstName("John").lastName("Doe").role(RoleType.ROLE_JOBSEEKER)
                .emailVerified(true).build());

        jobRepository.save(Job.builder()
                .title("Senior Java Developer")
                .description("Build enterprise applications with Spring Boot and microservices.")
                .roleTitle("Backend Developer").domain("Engineering").location("Bangalore")
                .salaryMin(BigDecimal.valueOf(1200000)).salaryMax(BigDecimal.valueOf(2000000))
                .experience("3-5 years").workMode(WorkMode.HYBRID).durationMonths(3)
                .deadline(LocalDate.now().plusMonths(3)).postedBy(hr).active(true).build());

        jobRepository.save(Job.builder()
                .title("React Frontend Engineer")
                .description("Create beautiful UIs with React, TypeScript, and TailwindCSS.")
                .roleTitle("Frontend Developer").domain("Engineering").location("Remote")
                .salaryMin(BigDecimal.valueOf(800000)).salaryMax(BigDecimal.valueOf(1500000))
                .experience("2-4 years").workMode(WorkMode.REMOTE).durationMonths(1)
                .deadline(LocalDate.now().plusMonths(1)).postedBy(hr).active(true).build());

        jobRepository.save(Job.builder()
                .title("Full Stack Intern")
                .description("Learn full stack development with mentorship from senior engineers.")
                .roleTitle("Intern").domain("Engineering").location("Mumbai")
                .salaryMin(BigDecimal.valueOf(25000)).salaryMax(BigDecimal.valueOf(40000))
                .experience("Fresher").workMode(WorkMode.ONSITE).durationMonths(6)
                .deadline(LocalDate.now().plusMonths(2)).postedBy(hr).active(true).build());

        /* Rich internship catalog seeded by InternshipCatalogSeed */

        /* Courses and events seeded by PrepareCatalogSeed & ParticipateCatalogSeed */
    }
}
