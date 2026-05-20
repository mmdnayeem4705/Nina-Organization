package com.ninaorganization.controller;

import com.ninaorganization.dto.request.JobRequest;
import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.dto.response.JobResponse;
import com.ninaorganization.entity.enums.WorkMode;
import com.ninaorganization.security.UserPrincipal;
import com.ninaorganization.service.JobService;
import com.ninaorganization.service.SavedJobService;
import com.ninaorganization.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final SavedJobService savedJobService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<JobResponse>>> search(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String domain,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) WorkMode workMode,
            @RequestParam(required = false) BigDecimal minSalary,
            @RequestParam(required = false) String experience,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @AuthenticationPrincipal UserPrincipal principal) {
        Long userId = principal != null ? principal.getUser().getId() : null;
        return ResponseEntity.ok(ApiResponse.ok(jobService.search(role, domain, location, workMode,
                minSalary, experience, search, userId, PageRequest.of(page, size))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getById(@PathVariable Long id,
                                                            @AuthenticationPrincipal UserPrincipal principal) {
        Long userId = principal != null ? principal.getUser().getId() : null;
        return ResponseEntity.ok(ApiResponse.ok(jobService.getById(id, userId)));
    }

    @PostMapping("/{id}/save")
    public ResponseEntity<ApiResponse<Void>> saveJob(@PathVariable Long id) {
        savedJobService.saveJob(SecurityUtils.getCurrentUserId(), id);
        return ResponseEntity.ok(ApiResponse.ok("Job saved", null));
    }

    @DeleteMapping("/{id}/save")
    public ResponseEntity<ApiResponse<Void>> unsaveJob(@PathVariable Long id) {
        savedJobService.unsaveJob(SecurityUtils.getCurrentUserId(), id);
        return ResponseEntity.ok(ApiResponse.ok("Job unsaved", null));
    }
}
