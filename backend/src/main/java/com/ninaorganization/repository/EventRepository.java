package com.ninaorganization.repository;

import com.ninaorganization.entity.Event;
import com.ninaorganization.entity.enums.EventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    Page<Event> findByActiveTrue(Pageable pageable);
    Page<Event> findByTypeAndActiveTrue(EventType type, Pageable pageable);
}
