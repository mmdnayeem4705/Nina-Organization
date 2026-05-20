package com.ninaorganization.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    private String interviewType;
    private LocalDateTime scheduledAt;
    private String meetingLink;
    private String notes;

    @Builder.Default
    private String status = "SCHEDULED";

    @CreationTimestamp
    private LocalDateTime createdAt;
}
