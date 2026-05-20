package com.ninaorganization.repository;

import com.ninaorganization.entity.Application;
import com.ninaorganization.entity.enums.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Page<Application> findByApplicantId(Long userId, Pageable pageable);
    Page<Application> findByJobId(Long jobId, Pageable pageable);
    List<Application> findByApplicantIdOrderByUpdatedAtDesc(Long userId);
    Optional<Application> findByApplicantIdAndJobId(Long userId, Long jobId);
    Optional<Application> findByApplicantIdAndInternshipId(Long userId, Long internshipId);
    long countByStatus(ApplicationStatus status);
}
