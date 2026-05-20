package com.ninaorganization.repository;

import com.ninaorganization.entity.ContestRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContestRegistrationRepository extends JpaRepository<ContestRegistration, Long> {
    Optional<ContestRegistration> findByUserIdAndEventId(Long userId, Long eventId);
    List<ContestRegistration> findByEventIdOrderByScoreDesc(Long eventId);
}
