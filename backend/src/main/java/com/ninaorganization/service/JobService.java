package com.ninaorganization.service;

import com.ninaorganization.dto.request.JobRequest;
import com.ninaorganization.dto.response.JobResponse;
import com.ninaorganization.entity.Job;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.WorkMode;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.JobRepository;
import com.ninaorganization.repository.SavedJobRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final SavedJobRepository savedJobRepository;

    public Page<JobResponse> search(String role, String domain, String location, WorkMode workMode,
                                     BigDecimal minSalary, String experience, String search,
                                     Long userId, Pageable pageable) {
        return jobRepository.searchJobs(role, domain, location, workMode, minSalary, experience, search, pageable)
                .map(j -> toResponse(j, userId));
    }

    public JobResponse getById(Long id, Long userId) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        return toResponse(job, userId);
    }

    @Transactional
    public JobResponse create(JobRequest request, Long hrUserId) {
        User hr = userRepository.findById(hrUserId).orElseThrow();
        Job job = mapToEntity(new Job(), request);
        job.setPostedBy(hr);
        job.setActive(true);
        return toResponse(jobRepository.save(job), hrUserId);
    }

    @Transactional
    public JobResponse update(Long id, JobRequest request) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        mapToEntity(job, request);
        return toResponse(jobRepository.save(job), null);
    }

    @Transactional
    public void delete(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        job.setActive(false);
        jobRepository.save(job);
    }

    private Job mapToEntity(Job job, JobRequest request) {
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setRoleTitle(request.getRoleTitle());
        job.setDomain(request.getDomain());
        job.setLocation(request.getLocation());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setExperience(request.getExperience());
        job.setWorkMode(request.getWorkMode());
        job.setDurationMonths(request.getDurationMonths());
        job.setDeadline(request.getDeadline());
        return job;
    }

    private JobResponse toResponse(Job job, Long userId) {
        boolean saved = userId != null && savedJobRepository.existsByUserIdAndJobId(userId, job.getId());
        String postedBy = job.getPostedBy() != null
                ? job.getPostedBy().getFirstName() + " " + (job.getPostedBy().getLastName() != null ? job.getPostedBy().getLastName() : "")
                : "Nina HR";
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .roleTitle(job.getRoleTitle())
                .domain(job.getDomain())
                .location(job.getLocation())
                .salaryMin(job.getSalaryMin())
                .salaryMax(job.getSalaryMax())
                .experience(job.getExperience())
                .workMode(job.getWorkMode())
                .durationMonths(job.getDurationMonths())
                .deadline(job.getDeadline())
                .active(job.isActive())
                .postedByName(postedBy.trim())
                .createdAt(job.getCreatedAt())
                .saved(saved)
                .build();
    }
}
