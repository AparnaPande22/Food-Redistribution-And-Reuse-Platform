package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.entities.UserStatus;
import com.food.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

	private final AdminService adminService;

	// pending users
	@GetMapping("/pending-users")
	public ResponseEntity<?> findPendingUsers() {
		return ResponseEntity.ok(adminService.findPendingUsers(UserStatus.PENDING));
	}

	// pending donations

}
