package com.food.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.RequestResponseDTO;
import com.food.DTO.WasteAssignmentDTO;
import com.food.DTO.WasteProcessingDTO;
import com.food.service.WasteService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/waste")
@RequiredArgsConstructor
public class WasteController {

	private final WasteService wasteService;

	// marking as waste
	@PutMapping("/{requestId}/mark-waste")
	public ResponseEntity<?> markAsWaste(
			@Positive(message = "Id must be greater than 0") @PathVariable Long requestId) {
		return ResponseEntity.ok(wasteService.markAsWaste(requestId));
	}

	// get all waste request
	@GetMapping("/waste_queue")
	public ResponseEntity<List<RequestResponseDTO>> getWasteQueue() {
		return ResponseEntity.ok(wasteService.getWasteQueue());
	}

	// assign waste partner
	@PutMapping("/assign-partner")
	public ResponseEntity<RequestResponseDTO> assignWastePartner(@RequestBody @Valid WasteAssignmentDTO dto) {

		return ResponseEntity.ok(wasteService.assignWastePartner(dto));
	}

	// assigned waste to ID
	@GetMapping("/waste/assigned/{partnerId}")
	public ResponseEntity<List<RequestResponseDTO>> getAssignedWaste(@PathVariable Long partnerId) {

		return ResponseEntity.ok(wasteService.getAssignedWaste(partnerId));
	}

	// waste processing
	@PutMapping("/waste/process/{requestId}")
	public ResponseEntity<RequestResponseDTO> processWaste(@PathVariable Long requestId,
			@RequestBody @Valid WasteProcessingDTO dto) {

		return ResponseEntity.ok(wasteService.processWaste(requestId, dto));
	}
}
