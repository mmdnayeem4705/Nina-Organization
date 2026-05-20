package com.ninaorganization.controller;

import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.dto.response.DashboardStatsResponse;
import com.ninaorganization.dto.response.UserResponse;
import com.ninaorganization.entity.enums.RoleType;
import com.ninaorganization.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> stats() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getStats()));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> users(
            @RequestParam(required = false) RoleType role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getUsers(role, PageRequest.of(page, size))));
    }

    @PatchMapping("/users/{id}/ban")
    public ResponseEntity<ApiResponse<UserResponse>> banUser(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        return ResponseEntity.ok(ApiResponse.ok(adminService.banUser(id, body.getOrDefault("banned", true))));
    }

    @PatchMapping("/users/{id}/promote-hr")
    public ResponseEntity<ApiResponse<UserResponse>> promoteHr(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(adminService.promoteToHr(id)));
    }
}
