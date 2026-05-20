package com.ninaorganization.controller;

import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.entity.Course;
import com.ninaorganization.entity.CourseProgress;
import com.ninaorganization.entity.enums.CourseCategory;
import com.ninaorganization.service.CourseService;
import com.ninaorganization.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Course>>> list(@RequestParam(required = false) CourseCategory category) {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getAll(category)));
    }

    @PostMapping("/{id}/progress")
    public ResponseEntity<ApiResponse<CourseProgress>> updateProgress(
            @PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(ApiResponse.ok(
                courseService.updateProgress(SecurityUtils.getCurrentUserId(), id, body.get("percent"))));
    }

    @GetMapping("/my-progress")
    public ResponseEntity<ApiResponse<List<CourseProgress>>> myProgress() {
        return ResponseEntity.ok(ApiResponse.ok(
                courseService.getUserProgress(SecurityUtils.getCurrentUserId())));
    }
}
