package com.ninaorganization.dto.response;

import com.ninaorganization.entity.enums.InternshipLevel;
import com.ninaorganization.entity.enums.WorkMode;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class InternshipResponse {
    private Long id;
    private String title;
    private String description;
    private String domain;
    private String category;
    private String location;
    private String duration;
    private BigDecimal stipend;
    private String stipendLabel;
    private boolean virtual;
    private boolean certificateProvided;
    private boolean smallProject;
    private boolean featured;
    private boolean liveProject;
    private boolean ppoAvailable;
    private boolean skillBased;
    private WorkMode workMode;
    private InternshipLevel level;
    private List<String> requiredSkills;
    private List<String> tasks;
    private String mentorName;
    private String mentorRole;
    private String mentorExperience;
    private String mentorLinkedIn;
    private List<String> progressWeeks;
    private int openings;
    private int appliedCount;
    private LocalDate deadline;
    private Integer matchScore;
}
