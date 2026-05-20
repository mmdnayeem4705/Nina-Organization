package com.ninaorganization.dto.request;

import lombok.Data;

@Data
public class ApplicationRequest {
    private Long jobId;
    private Long internshipId;
    private String resumeUrl;
    private String coverLetter;
}
