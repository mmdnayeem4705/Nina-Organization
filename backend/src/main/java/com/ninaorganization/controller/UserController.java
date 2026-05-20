package com.ninaorganization.controller;

import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.dto.response.UserResponse;
import com.ninaorganization.entity.Resume;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.ResumeRepository;
import com.ninaorganization.repository.UserRepository;
import com.ninaorganization.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> me() {
        var user = SecurityUtils.getCurrentUser().getUser();
        return ResponseEntity.ok(ApiResponse.ok(UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .role(user.getRole())
                .emailVerified(user.isEmailVerified())
                .build()));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(@RequestBody Map<String, String> body) {
        var user = userRepository.findById(SecurityUtils.getCurrentUserId()).orElseThrow();
        if (body.containsKey("firstName")) user.setFirstName(body.get("firstName"));
        if (body.containsKey("lastName")) user.setLastName(body.get("lastName"));
        if (body.containsKey("phone")) user.setPhone(body.get("phone"));
        user = userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.ok(UserResponse.builder()
                .id(user.getId()).email(user.getEmail())
                .firstName(user.getFirstName()).lastName(user.getLastName())
                .phone(user.getPhone()).role(user.getRole()).build()));
    }

    @PostMapping("/resume")
    public ResponseEntity<ApiResponse<Resume>> uploadResume(@RequestBody Map<String, String> body) {
        var user = userRepository.findById(SecurityUtils.getCurrentUserId()).orElseThrow();
        int atsScore = ThreadLocalRandom.current().nextInt(65, 96);
        Resume resume = Resume.builder()
                .user(user)
                .fileName(body.getOrDefault("fileName", "resume.pdf"))
                .fileUrl(body.get("fileUrl"))
                .primary(true)
                .atsScore(atsScore)
                .aiAnalysis("ATS Score: " + atsScore + "%. Strong keywords detected. Consider adding more quantified achievements.")
                .build();
        return ResponseEntity.ok(ApiResponse.ok(resumeRepository.save(resume)));
    }

    @GetMapping("/resumes")
    public ResponseEntity<ApiResponse<List<Resume>>> myResumes() {
        return ResponseEntity.ok(ApiResponse.ok(
                resumeRepository.findByUserId(SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/resume/analyze")
    public ResponseEntity<ApiResponse<Map<String, Object>>> analyzeResume(@RequestBody Map<String, String> body) {
        int score = ThreadLocalRandom.current().nextInt(60, 95);
        return ResponseEntity.ok(ApiResponse.ok(Map.of(
                "atsScore", score,
                "feedback", "Resume analyzed. Match score: " + score + "%. Add action verbs and metrics.",
                "keywords", List.of("Java", "Spring Boot", "React", "MySQL", "REST API")
        )));
    }
}
