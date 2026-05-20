package com.ninaorganization.service;

import com.ninaorganization.entity.Course;
import com.ninaorganization.entity.CourseProgress;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.CourseCategory;
import com.ninaorganization.repository.CourseProgressRepository;
import com.ninaorganization.repository.CourseRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseProgressRepository progressRepository;
    private final UserRepository userRepository;

    public List<Course> getAll(CourseCategory category) {
        return category != null ? courseRepository.findByCategory(category) : courseRepository.findAll();
    }

    @Transactional
    public CourseProgress updateProgress(Long userId, Long courseId, int percent) {
        User user = userRepository.findById(userId).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();
        CourseProgress progress = progressRepository.findByUserIdAndCourseId(userId, courseId)
                .orElse(CourseProgress.builder().user(user).course(course).build());
        progress.setProgressPercent(Math.min(100, percent));
        return progressRepository.save(progress);
    }

    public List<CourseProgress> getUserProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }
}
