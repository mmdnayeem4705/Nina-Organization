package com.ninaorganization.service;

import com.ninaorganization.entity.ContestRegistration;
import com.ninaorganization.entity.Event;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.EventType;
import com.ninaorganization.exception.BadRequestException;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.ContestRegistrationRepository;
import com.ninaorganization.repository.EventRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ContestRegistrationRepository registrationRepository;

    public Page<Event> getEvents(EventType type, Pageable pageable) {
        if (type != null) {
            return eventRepository.findByTypeAndActiveTrue(type, pageable);
        }
        return eventRepository.findByActiveTrue(pageable);
    }

    public Event getById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    @Transactional
    public Event create(Event event, Long creatorId) {
        User creator = userRepository.findById(creatorId).orElseThrow();
        event.setCreatedBy(creator);
        event.setActive(true);
        return eventRepository.save(event);
    }

    @Transactional
    public ContestRegistration register(Long userId, Long eventId) {
        if (registrationRepository.findByUserIdAndEventId(userId, eventId).isPresent()) {
            throw new BadRequestException("Already registered");
        }
        User user = userRepository.findById(userId).orElseThrow();
        Event event = getById(eventId);
        event.setRegisteredCount(event.getRegisteredCount() + 1);
        eventRepository.save(event);
        return registrationRepository.save(ContestRegistration.builder().user(user).event(event).build());
    }
}
