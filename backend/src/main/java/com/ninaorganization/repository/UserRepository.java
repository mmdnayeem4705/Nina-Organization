package com.ninaorganization.repository;

import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByVerificationToken(String token);
    Optional<User> findByResetToken(String token);
    Page<User> findByRole(RoleType role, Pageable pageable);
    long countByRole(RoleType role);
    long countByBannedTrue();
}
