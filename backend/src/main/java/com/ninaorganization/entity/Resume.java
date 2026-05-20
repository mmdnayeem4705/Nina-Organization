package com.ninaorganization.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String fileName;
    private String fileUrl;

    @Column(name = "is_primary")
    @Builder.Default
    private boolean primary = false;

    private Integer atsScore;
    private String aiAnalysis;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime uploadedAt;
}
