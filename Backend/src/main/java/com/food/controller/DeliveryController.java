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

import com.food.DTO.DeliveryDTO;
import com.food.service.DeliveryService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
@Validated
public class DeliveryController {

	private final DeliveryService deliveryService;

	@PostMapping
	public ResponseEntity<?> createDelivery(@Valid @RequestBody DeliveryDTO request) {

		return ResponseEntity.ok(deliveryService.createDelivery(request));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@Positive(message = "Id must be greater than 0") @PathVariable Long id) {

		return ResponseEntity.ok(deliveryService.findById(id));
	}

	@GetMapping("/assigned")
	public ResponseEntity<?> findAssignedDeliveries() {

		return ResponseEntity.ok(deliveryService.findAssignedDeliveries());
	}

	@PutMapping("/{id}/start")
	public ResponseEntity<?> startDelivery(@PathVariable Long id) {

		return ResponseEntity.ok(deliveryService.startDelivery(id));
	}

	@PutMapping("/{id}/complete")
	public ResponseEntity<?> completeDelivery(@PathVariable Long id) {

		return ResponseEntity.ok(deliveryService.completeDelivery(id));
	}

	@GetMapping("/{id}/track")
	public ResponseEntity<?> trackDelivery(@PathVariable Long id) {

		return ResponseEntity.ok(deliveryService.trackDelivery(id));
	}
}
