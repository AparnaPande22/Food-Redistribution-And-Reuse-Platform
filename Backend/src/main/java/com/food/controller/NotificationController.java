package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.NotificationDTO;
import com.food.service.NotificationService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
@Validated
public class NotificationController {

	private final NotificationService notificationService;

	@PostMapping
	public ResponseEntity<?> sendNotification(@Valid @RequestBody NotificationDTO request) {

		return ResponseEntity.ok(notificationService.sendNotification(request));
	}

	@GetMapping
	public ResponseEntity<?> getMyNotifications() {

		return ResponseEntity.ok(notificationService.getMyNotifications());
	}

	@PutMapping("/{id}/read")
	public ResponseEntity<?> markAsRead(@Positive(message = "Id must be greater than 0") @PathVariable Long id) {

		return ResponseEntity.ok(notificationService.markAsRead(id));
	}
}
