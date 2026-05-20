package com.ninaorganization.entity;

import com.ninaorganization.entity.enums.CourseCategory;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private CourseCategory category;

    private String videoUrl;
    private String thumbnailUrl;

    @Builder.Default
    private int durationMinutes = 0;

    @Builder.Default
    private int totalLessons = 1;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
