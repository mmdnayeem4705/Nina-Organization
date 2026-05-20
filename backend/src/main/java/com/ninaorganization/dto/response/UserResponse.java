package com.ninaorganization.dto.response;

import com.ninaorganization.entity.enums.RoleType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private RoleType role;
    private boolean enabled;
    private boolean emailVerified;
    private boolean banned;
    private LocalDateTime createdAt;
}
