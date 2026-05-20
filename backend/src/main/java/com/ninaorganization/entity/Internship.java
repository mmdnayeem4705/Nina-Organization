package com.ninaorganization.entity;

import com.ninaorganization.entity.enums.InternshipLevel;
import com.ninaorganization.entity.enums.WorkMode;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "internships")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String domain;
    private String category;
    private String location;
    private String duration;

    private BigDecimal stipend;
    private String stipendLabel;

    @Builder.Default
    private boolean virtual = false;

    @Builder.Default
    private boolean certificateProvided = true;

    @Builder.Default
    private boolean smallProject = false;

    @Builder.Default
    private boolean featured = false;

    @Builder.Default
    private boolean liveProject = false;

    @Builder.Default
    private boolean ppoAvailable = false;

    @Builder.Default
    private boolean skillBased = false;

    @Enumerated(EnumType.STRING)
    private WorkMode workMode;

    @Enumerated(EnumType.STRING)
    private InternshipLevel level;

    @Column(columnDefinition = "TEXT")
    private String requiredSkills;

    @Column(columnDefinition = "TEXT")
    private String tasks;

    private String mentorName;
    private String mentorRole;
    private String mentorExperience;
    private String mentorLinkedIn;

    @Column(columnDefinition = "TEXT")
    private String progressWeeks;

    @Builder.Default
    private int openings = 10;

    @Builder.Default
    private int appliedCount = 0;

    private LocalDate deadline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by_id")
    private User postedBy;

    @Builder.Default
    private boolean active = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
