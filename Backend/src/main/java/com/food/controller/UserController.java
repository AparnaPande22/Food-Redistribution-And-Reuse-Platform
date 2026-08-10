package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.UserDTO;
import com.food.DTO.UserSummaryDTO;
import com.food.entities.User;
import com.food.service.UserServiceImpl;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {

private final UserServiceImpl userService;

@PostMapping
public ResponseEntity<?> addNewUser(
        @Valid @RequestBody UserDTO request) {

    return ResponseEntity.ok(
            userService.addNewUser(request)
    );
}

@GetMapping("/{id}")
public ResponseEntity<UserSummaryDTO> findById(
        @Positive(message = "Id must be greater than 0")
        @PathVariable Long id) {

    User user = userService.findById(id);

    return ResponseEntity.ok(
            toSummary(user)
    );
}

@GetMapping
public ResponseEntity<?> findAllUsers() {

    return ResponseEntity.ok(
            userService.findAllUsers()
                    .stream()
                    .map(this::toSummary)
                    .toList()
    );
}

@GetMapping("/email/{email}")
public ResponseEntity<UserSummaryDTO> findByEmail(
        @PathVariable String email) {

    User user = userService.findByEmail(email);

    return ResponseEntity.ok(
            toSummary(user)
    );
}

@PutMapping("/{id}")
public ResponseEntity<?> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UserDTO request) {

    return ResponseEntity.ok(
            userService.updateUser(id, request)
    );
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteUser(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            userService.deleteUser(id)
    );
}

@PutMapping("/profile")
public ResponseEntity<?> updateProfile(
        @Valid @RequestBody UserDTO request) {

    return ResponseEntity.ok(
            userService.updateProfile(request)
    );
}

private UserSummaryDTO toSummary(User user) {

    UserSummaryDTO dto = new UserSummaryDTO();

    dto.setId(user.getId());
    dto.setName(user.getName());
    dto.setEmail(user.getEmail());
    dto.setPhone(user.getPhone());
    dto.setAccountType(user.getAccountType());
    dto.setTeamRole(user.getTeamRole());
    dto.setStatus(user.getStatus());
    dto.setAddress(user.getAddress());
    dto.setCity(user.getCity());
    dto.setCreatedAt(user.getCreatedAt());

    return dto;
}

}