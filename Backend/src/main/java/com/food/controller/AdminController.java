package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.entities.UserStatus;
import com.food.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

	private final AdminService adminService;

	// pending users
	@GetMapping("/pending-users")
	public ResponseEntity<?> findPendingUsers() {
		return ResponseEntity.ok(adminService.findPendingUsers(UserStatus.PENDING));
	}

	// approve user
	@PutMapping("/users/{id}/approve")
	public ResponseEntity<?> approveUser(@PathVariable Long id) {
		return ResponseEntity.ok(adminService.approveUser(id));
	}

	// reject user
	@PutMapping("/users/{id}/reject")
	public ResponseEntity<?> rejectUser(@PathVariable Long id) {
		return ResponseEntity.ok(adminService.rejectUser(id));
	}

	// pending request
	@GetMapping("/pending-requests")
	public ResponseEntity<?> pendingRequests() {
		return ResponseEntity.ok(adminService.findPendingRequests());
	}

	// approve request
	@PutMapping("/requests/{id}/approve")
	public ResponseEntity<?> approveRequest(@PathVariable Long id) {
		return ResponseEntity.ok(adminService.approveRequest(id));
	}

	// reject request
	@PutMapping("/requests/{id}/reject")
	public ResponseEntity<?> rejectRequest(@PathVariable Long id) {
		return ResponseEntity.ok(adminService.rejectRequest(id));
	}

	// matching queue
	@GetMapping("/matching-queue")
	public ResponseEntity<?> matchingQueue() {
		return ResponseEntity.ok(adminService.getMatchingQueue());
	}

	// admin analytics
	@GetMapping("/analytics")
	public ResponseEntity<?> analytics() {
		return ResponseEntity.ok(adminService.getAnalytics());
	}

}
