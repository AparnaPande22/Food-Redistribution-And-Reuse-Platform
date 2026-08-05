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
import com.food.repository.UserRepository;
import com.food.service.UserServiceImpl;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {

	private final UserRepository userRepository;

	private final AuthController authController;

	private final UserServiceImpl userService;

	@PostMapping
	public ResponseEntity<?> addNewUser(@Valid @RequestBody UserDTO request) {
		return ResponseEntity.ok(userService.addNewUser(request));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@Positive(message = "Id must be greater than 0") @PathVariable Long id) {
		return ResponseEntity.ok(userService.findById(id));
	}

//get all users
	@GetMapping
	public ResponseEntity<?> findAllUsers() {
		return ResponseEntity.ok(userService.findAllUsers());
	}

//Find by email
	@GetMapping("/email/{email}")
	public ResponseEntity<?> findByEmail(@PathVariable String email) {
		return ResponseEntity.ok(userService.findByEmail(email));
	}

//Update User
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO request) {
		return ResponseEntity.ok(userService.updateUser(id, request));
	}

//Delete user
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		return ResponseEntity.ok(userService.deleteUser(id));
	}

//update profile
	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(@Valid @RequestBody UserDTO request) {

		return ResponseEntity.ok(userService.updateProfile(request));
	}
}
