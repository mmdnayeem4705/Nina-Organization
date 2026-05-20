package com.ninaorganization.service;

import com.ninaorganization.dto.request.ApplicationRequest;
import com.ninaorganization.dto.response.ApplicationResponse;
import com.ninaorganization.entity.Application;
import com.ninaorganization.entity.Job;
import com.ninaorganization.entity.Internship;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.ApplicationStatus;
import com.ninaorganization.exception.BadRequestException;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.ApplicationRepository;
import com.ninaorganization.repository.InternshipRepository;
import com.ninaorganization.repository.JobRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final InternshipRepository internshipRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public ApplicationResponse apply(ApplicationRequest request, Long userId) {
        User applicant = userRepository.findById(userId).orElseThrow();
        Application app = Application.builder().applicant(applicant).build();

        if (request.getJobId() != null) {
            if (applicationRepository.findByApplicantIdAndJobId(userId, request.getJobId()).isPresent()) {
                throw new BadRequestException("Already applied to this job");
            }
            Job job = jobRepository.findById(request.getJobId())
                    .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
            app.setJob(job);
        } else if (request.getInternshipId() != null) {
            if (applicationRepository.findByApplicantIdAndInternshipId(userId, request.getInternshipId()).isPresent()) {
                throw new BadRequestException("Already applied to this internship");
            }
            Internship internship = internshipRepository.findById(request.getInternshipId())
                    .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));
            app.setInternship(internship);
        } else {
            throw new BadRequestException("Job or internship ID required");
        }

        app.setResumeUrl(request.getResumeUrl());
        app.setCoverLetter(request.getCoverLetter());
        app.setStatus(ApplicationStatus.APPLIED);
        app = applicationRepository.save(app);

        String title = app.getJob() != null ? app.getJob().getTitle() : app.getInternship().getTitle();
        notificationService.create(userId, "Application Submitted",
                "You applied for " + title, "APPLICATION");
        emailService.sendApplicationUpdate(applicant.getEmail(), title, "APPLIED");

        broadcastStatus(app);
        return toResponse(app);
    }

    public List<ApplicationResponse> getMyApplications(Long userId) {
        return applicationRepository.findByApplicantIdOrderByUpdatedAtDesc(userId)
                .stream().map(this::toResponse).toList();
    }

    public Page<ApplicationResponse> getApplicationsForJob(Long jobId, Pageable pageable) {
        return applicationRepository.findByJobId(jobId, pageable).map(this::toResponse);
    }

    public Page<ApplicationResponse> getAllApplications(Pageable pageable) {
        return applicationRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional
    public ApplicationResponse updateStatus(Long id, ApplicationStatus status) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        app.setStatus(status);
        app = applicationRepository.save(app);

        String title = app.getJob() != null ? app.getJob().getTitle() :
                (app.getInternship() != null ? app.getInternship().getTitle() : "Position");
        notificationService.create(app.getApplicant().getId(), "Status Updated",
                "Your application for " + title + " is now " + status.name(), "STATUS");
        emailService.sendApplicationUpdate(app.getApplicant().getEmail(), title, status.name());
        broadcastStatus(app);
        return toResponse(app);
    }

    private void broadcastStatus(Application app) {
        messagingTemplate.convertAndSend("/topic/applications/" + app.getApplicant().getId(), toResponse(app));
    }

    private ApplicationResponse toResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .jobId(app.getJob() != null ? app.getJob().getId() : null)
                .jobTitle(app.getJob() != null ? app.getJob().getTitle() : null)
                .internshipId(app.getInternship() != null ? app.getInternship().getId() : null)
                .internshipTitle(app.getInternship() != null ? app.getInternship().getTitle() : null)
                .status(app.getStatus())
                .resumeUrl(app.getResumeUrl())
                .appliedAt(app.getAppliedAt())
                .updatedAt(app.getUpdatedAt())
                .applicantName(app.getApplicant().getFirstName() + " " +
                        (app.getApplicant().getLastName() != null ? app.getApplicant().getLastName() : ""))
                .applicantEmail(app.getApplicant().getEmail())
                .build();
    }
}
