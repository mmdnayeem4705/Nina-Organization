package com.ninaorganization.repository;

import com.ninaorganization.entity.Course;
import com.ninaorganization.entity.enums.CourseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCategory(CourseCategory category);
}
