package com.ninaorganization.controller;

import com.ninaorganization.dto.request.ApplicationRequest;
import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.dto.response.ApplicationResponse;
import com.ninaorganization.service.ApplicationService;
import com.ninaorganization.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApiResponse<ApplicationResponse>> apply(@Valid @RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(
                applicationService.apply(request, SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> myApplications() {
        return ResponseEntity.ok(ApiResponse.ok(
                applicationService.getMyApplications(SecurityUtils.getCurrentUserId())));
    }
}
