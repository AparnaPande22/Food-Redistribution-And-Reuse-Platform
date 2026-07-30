package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.WasteDashboardDTO;
import com.food.service.DashboardService;

import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

	private final DashboardService dashboardService;

	// Admin dashboard
	@GetMapping("/admin")
	public ResponseEntity<?> getAdminDashboard() {
		System.out.println("Admin Dashboard API is Called!");
		return ResponseEntity.ok(dashboardService.getAdminDashboard());
	}

	// Donor Dashboard
	@GetMapping("/donor/{userId}")
	public ResponseEntity<?> getDonorDashboard(
			@Positive(message = "Id must be greater than 0") @PathVariable Long userId) {
		System.out.println("Donor Dashboard API is Called!");
		return ResponseEntity.ok(dashboardService.getDonorDashboard(userId));
	}

	// Impact Dashboard
	@GetMapping("/impact")
	public ResponseEntity<?> getImpactDashboard() {
		System.out.println("Impact Dashboard API is Called!");
		return ResponseEntity.ok(dashboardService.getImpactDashboard());
	}

	// Monthly Statistics
	@GetMapping("/statistics")
	public ResponseEntity<?> getMonthlyStatistics() {
		System.out.println("Monthly Statistics API is Called!");
		return ResponseEntity.ok(dashboardService.getMonthlyStatistics());
	}

	// waste Dashboard
	@GetMapping("/waste-dashboard")
	public ResponseEntity<WasteDashboardDTO> getDashboard() {
		return ResponseEntity.ok(dashboardService.getWasteDashboard());
	}
}
