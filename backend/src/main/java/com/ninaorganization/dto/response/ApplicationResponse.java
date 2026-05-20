package com.ninaorganization.dto.response;

import com.ninaorganization.entity.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private Long internshipId;
    private String internshipTitle;
    private ApplicationStatus status;
    private String resumeUrl;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
    private String applicantName;
    private String applicantEmail;
}
