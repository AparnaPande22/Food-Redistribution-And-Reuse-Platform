package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.RequestItemDTO;
import com.food.service.RequestItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/request-item")
@RequiredArgsConstructor
public class RequestItemController {

	private final RequestItemService requestItemService;

	// Add new item
	@PostMapping
	public ResponseEntity<?> addNewItem(@RequestBody RequestItemDTO dto) {
		return ResponseEntity.ok(requestItemService.addNewItem(dto));
	}

	// find by id
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable long id) {
		return ResponseEntity.ok(requestItemService.findById(id));
	}

	// find by request
	@GetMapping("/request/{requestId}")
	public ResponseEntity<?> findByRequest(@PathVariable Long requestId) {
		return ResponseEntity.ok(requestItemService.findByRequest(requestId));
	}

	// Delete RequestItem
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		return ResponseEntity.ok(requestItemService.deleteRequestItem(id));
	}

	// Update RequestItem
	@PutMapping("/{id}")
	public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody RequestItemDTO dto) {
		return ResponseEntity.ok(requestItemService.updateItem(id, dto));
	}

}
