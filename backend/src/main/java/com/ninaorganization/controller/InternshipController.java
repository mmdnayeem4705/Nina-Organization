package com.ninaorganization.controller;

import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.dto.response.InternshipResponse;
import com.ninaorganization.entity.enums.InternshipLevel;
import com.ninaorganization.entity.enums.WorkMode;
import com.ninaorganization.security.UserPrincipal;
import com.ninaorganization.service.InternshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
public class InternshipController {

    private final InternshipService internshipService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<InternshipResponse>>> list(
            @RequestParam(required = false) String domain,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) WorkMode workMode,
            @RequestParam(required = false) InternshipLevel level,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Boolean liveProject,
            @RequestParam(required = false) Boolean ppo,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @AuthenticationPrincipal UserPrincipal principal) {
        Long userId = principal != null ? principal.getUser().getId() : null;
        return ResponseEntity.ok(ApiResponse.ok(
                internshipService.list(domain, category, workMode, level, featured, liveProject, ppo, search, userId, PageRequest.of(page, size))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InternshipResponse>> getById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal) {
        Long userId = principal != null ? principal.getUser().getId() : null;
        return ResponseEntity.ok(ApiResponse.ok(internshipService.getById(id, userId)));
    }

    @GetMapping("/meta/domains")
    public ResponseEntity<ApiResponse<List<String>>> domains() {
        return ResponseEntity.ok(ApiResponse.ok(internshipService.getDomains()));
    }

    @GetMapping("/meta/categories")
    public ResponseEntity<ApiResponse<List<String>>> categories() {
        return ResponseEntity.ok(ApiResponse.ok(internshipService.getCategories()));
    }
}
