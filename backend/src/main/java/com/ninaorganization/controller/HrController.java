package com.ninaorganization.controller;

import com.ninaorganization.dto.request.ApplicationRequest;
import com.ninaorganization.dto.request.JobRequest;
import com.ninaorganization.dto.response.ApiResponse;
import com.ninaorganization.dto.response.ApplicationResponse;
import com.ninaorganization.dto.response.JobResponse;
import com.ninaorganization.entity.Application;
import com.ninaorganization.entity.Event;
import com.ninaorganization.entity.Internship;
import com.ninaorganization.entity.Interview;
import com.ninaorganization.entity.enums.ApplicationStatus;
import com.ninaorganization.entity.enums.EventType;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.ApplicationRepository;
import com.ninaorganization.repository.InternshipRepository;
import com.ninaorganization.repository.InterviewRepository;
import com.ninaorganization.service.ApplicationService;
import com.ninaorganization.service.EventService;
import com.ninaorganization.service.JobService;
import com.ninaorganization.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/hr")
@RequiredArgsConstructor
public class HrController {

    private final JobService jobService;
    private final ApplicationService applicationService;
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;
    private final EventService eventService;

    @PostMapping("/jobs")
    public ResponseEntity<ApiResponse<JobResponse>> createJob(@Valid @RequestBody JobRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(jobService.create(request, SecurityUtils.getCurrentUserId())));
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(@PathVariable Long id, @Valid @RequestBody JobRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(jobService.update(id, request)));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id) {
        jobService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Job deleted", null));
    }

    @GetMapping("/applications")
    public ResponseEntity<ApiResponse<Page<ApplicationResponse>>> getApplications(
            @RequestParam(required = false) Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<ApplicationResponse> result = jobId != null
                ? applicationService.getApplicationsForJob(jobId, PageRequest.of(page, size))
                : applicationService.getAllApplications(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PatchMapping("/applications/{id}/status")
    public ResponseEntity<ApiResponse<ApplicationResponse>> updateStatus(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        ApplicationStatus status = ApplicationStatus.valueOf(body.get("status"));
        return ResponseEntity.ok(ApiResponse.ok(applicationService.updateStatus(id, status)));
    }

    @PostMapping("/internships")
    public ResponseEntity<ApiResponse<Internship>> createInternship(@RequestBody Internship internship) {
        internship.setPostedBy(SecurityUtils.getCurrentUser().getUser());
        internship.setActive(true);
        return ResponseEntity.ok(ApiResponse.ok(internshipRepository.save(internship)));
    }

    @PostMapping("/events")
    public ResponseEntity<ApiResponse<Event>> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(ApiResponse.ok(
                eventService.create(event, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/interviews")
    public ResponseEntity<ApiResponse<Interview>> scheduleInterview(@RequestBody Map<String, Object> body) {
        Long applicationId = Long.valueOf(body.get("applicationId").toString());
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        Interview interview = Interview.builder()
                .application(app)
                .interviewType((String) body.get("interviewType"))
                .scheduledAt(LocalDateTime.parse((String) body.get("scheduledAt")))
                .meetingLink((String) body.get("meetingLink"))
                .build();
        return ResponseEntity.ok(ApiResponse.ok(interviewRepository.save(interview)));
    }
}
