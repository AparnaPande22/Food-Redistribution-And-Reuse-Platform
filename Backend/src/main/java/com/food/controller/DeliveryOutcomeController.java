package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.DeliveryOutcomeDTO;
import com.food.service.DeliveryOutcomesService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/delivery-outcomes")
@RequiredArgsConstructor
public class DeliveryOutcomeController {

	private DeliveryOutcomesService deliveryOutcomeService;

	@PostMapping
	public ResponseEntity<?> addOutcome(@Valid @RequestBody DeliveryOutcomeDTO request) {

		return ResponseEntity.ok(deliveryOutcomeService.addOutcome(request));
	}

	@GetMapping("/{deliveryId}")
	public ResponseEntity<?> findByDelivery(@PathVariable Long deliveryId) {

		return ResponseEntity.ok(deliveryOutcomeService.findByDelivery(deliveryId));
	}
}
