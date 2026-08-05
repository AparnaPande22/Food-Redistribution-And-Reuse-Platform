package com.food.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.entities.ActivityLogs;
import com.food.service.ActivityLogsService;

import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/activity-logs")
@RequiredArgsConstructor
@Validated
public class ActivityLogsController {

	private final ActivityLogsService activityService;

	@GetMapping
	public ResponseEntity<List<ActivityLogs>> findAll() {

		return ResponseEntity.ok(activityService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ActivityLogs> findById(
			@Positive(message = "Id must be greater than 0") @PathVariable Long id) {

		return ResponseEntity.ok(activityService.findById(id));
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<ActivityLogs>> findByUser(@PathVariable Long userId) {

		return ResponseEntity.ok(activityService.findByUser(userId));
	}

}
