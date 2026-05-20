package com.ninaorganization.service;

import com.ninaorganization.dto.response.DashboardStatsResponse;
import com.ninaorganization.dto.response.UserResponse;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.ApplicationStatus;
import com.ninaorganization.entity.enums.RoleType;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final EventRepository eventRepository;

    public DashboardStatsResponse getStats() {
        return DashboardStatsResponse.builder()
                .totalUsers(userRepository.count())
                .totalJobs(jobRepository.count())
                .totalApplications(applicationRepository.count())
                .totalEvents(eventRepository.count())
                .jobSeekers(userRepository.countByRole(RoleType.ROLE_JOBSEEKER))
                .hrUsers(userRepository.countByRole(RoleType.ROLE_HR))
                .bannedUsers(userRepository.countByBannedTrue())
                .selectedCandidates(applicationRepository.countByStatus(ApplicationStatus.SELECTED))
                .pendingApplications(applicationRepository.countByStatus(ApplicationStatus.APPLIED))
                .build();
    }

    public Page<UserResponse> getUsers(RoleType role, Pageable pageable) {
        Page<User> users = role != null
                ? userRepository.findByRole(role, pageable)
                : userRepository.findAll(pageable);
        return users.map(this::toUserResponse);
    }

    @Transactional
    public UserResponse banUser(Long id, boolean banned) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setBanned(banned);
        return toUserResponse(userRepository.save(user));
    }

    @Transactional
    public UserResponse promoteToHr(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setRole(RoleType.ROLE_HR);
        return toUserResponse(userRepository.save(user));
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .role(user.getRole())
                .enabled(user.isEnabled())
                .emailVerified(user.isEmailVerified())
                .banned(user.isBanned())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
