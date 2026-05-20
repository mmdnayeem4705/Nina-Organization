package com.ninaorganization.dto.request;

import com.ninaorganization.entity.enums.WorkMode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class JobRequest {
    @NotBlank
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
}
