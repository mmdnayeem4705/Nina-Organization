package com.ninaorganization.dto.response;

import com.ninaorganization.entity.enums.WorkMode;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String roleTitle;
    private String domain;
    private String location;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String experience;
    private WorkMode workMode;
    private Integer durationMonths;
    private LocalDate deadline;
    private boolean active;
    private String postedByName;
    private LocalDateTime createdAt;
    private boolean saved;
}
