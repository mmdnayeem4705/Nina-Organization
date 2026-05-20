package com.ninaorganization.service;

import com.ninaorganization.dto.request.AuthRequest;
import com.ninaorganization.dto.request.RegisterRequest;
import com.ninaorganization.dto.response.AuthResponse;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.RoleType;
import com.ninaorganization.exception.BadRequestException;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.UserRepository;
import com.ninaorganization.security.JwtService;
import com.ninaorganization.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        RoleType role = request.getRole() != null ? request.getRole() : RoleType.ROLE_JOBSEEKER;
        if (role == RoleType.ROLE_ADMIN) {
            role = RoleType.ROLE_JOBSEEKER;
        }
        String token = UUID.randomUUID().toString();
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .role(role)
                .verificationToken(token)
                .emailVerified(true)
                .build();
        user = userRepository.save(user);
        emailService.sendWelcome(user.getEmail(), user.getFirstName() != null ? user.getFirstName() : "User");
        emailService.sendVerification(user.getEmail(), token);
        return buildAuthResponse(user);
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.isBanned()) {
            throw new BadRequestException("Account is banned");
        }
        return buildAuthResponse(user);
    }

    public AuthResponse refreshToken(String refreshToken, UserPrincipal principal) {
        User user = principal.getUser();
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return AuthResponse.builder()
                .accessToken(jwtService.generateToken(userPrincipal))
                .refreshToken(jwtService.generateRefreshToken(userPrincipal))
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .userId(user.getId())
                .build();
    }

    @Transactional
    public void forgotPassword(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setResetToken(UUID.randomUUID().toString());
            user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
            userRepository.save(user);
            emailService.sendPasswordReset(user.getEmail(), user.getResetToken());
        });
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid reset token"));
        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Reset token expired");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }

    @Transactional
    public void verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid verification token"));
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        UserPrincipal principal = new UserPrincipal(user);
        return AuthResponse.builder()
                .accessToken(jwtService.generateToken(principal))
                .refreshToken(jwtService.generateRefreshToken(principal))
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .userId(user.getId())
                .build();
    }
}
