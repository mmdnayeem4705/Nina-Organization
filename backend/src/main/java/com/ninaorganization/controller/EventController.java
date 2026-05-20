package com.ninaorganization.controller;

import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.entity.ContestRegistration;
import com.ninaorganization.entity.Event;
import com.ninaorganization.entity.enums.EventType;
import com.ninaorganization.service.EventService;
import com.ninaorganization.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Event>>> list(
            @RequestParam(required = false) EventType type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(ApiResponse.ok(eventService.getEvents(type, PageRequest.of(page, size))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(eventService.getById(id)));
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<ApiResponse<ContestRegistration>> register(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(
                eventService.register(SecurityUtils.getCurrentUserId(), id)));
    }
}
