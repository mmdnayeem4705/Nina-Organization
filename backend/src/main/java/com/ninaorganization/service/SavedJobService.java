package com.ninaorganization.service;

import com.ninaorganization.entity.Job;
import com.ninaorganization.entity.SavedJob;
import com.ninaorganization.entity.User;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.JobRepository;
import com.ninaorganization.repository.SavedJobRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Transactional
    public void saveJob(Long userId, Long jobId) {
        if (savedJobRepository.existsByUserIdAndJobId(userId, jobId)) return;
        User user = userRepository.findById(userId).orElseThrow();
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        savedJobRepository.save(SavedJob.builder().user(user).job(job).build());
    }

    @Transactional
    public void unsaveJob(Long userId, Long jobId) {
        savedJobRepository.findByUserIdAndJobId(userId, jobId)
                .ifPresent(savedJobRepository::delete);
    }
}
