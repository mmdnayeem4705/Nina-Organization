package com.ninaorganization.repository;

import com.ninaorganization.entity.Job;
import com.ninaorganization.entity.enums.WorkMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByActiveTrue(Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.active = true AND " +
           "(:role IS NULL OR LOWER(j.roleTitle) LIKE LOWER(CONCAT('%', :role, '%'))) AND " +
           "(:domain IS NULL OR LOWER(j.domain) LIKE LOWER(CONCAT('%', :domain, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:workMode IS NULL OR j.workMode = :workMode) AND " +
           "(:minSalary IS NULL OR j.salaryMax >= :minSalary) AND " +
           "(:experience IS NULL OR LOWER(j.experience) LIKE LOWER(CONCAT('%', :experience, '%'))) AND " +
           "(:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(j.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Job> searchJobs(@Param("role") String role, @Param("domain") String domain,
                           @Param("location") String location, @Param("workMode") WorkMode workMode,
                           @Param("minSalary") BigDecimal minSalary, @Param("experience") String experience,
                           @Param("search") String search, Pageable pageable);
}
