package com.food.DTO;

import java.time.LocalDateTime;

import com.food.entities.Role;
import com.food.entities.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSummaryDTO {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private Role accountType;

    private String teamRole;

    private UserStatus status;

    private String address;

    private String city;

    private LocalDateTime createdAt;
}