package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.food.service.MediaService;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
@Validated
public class MediaController {

	private final MediaService mediaService;

	@PostMapping
	public ResponseEntity<?> uploadImage(
			@NotNull(message = "File is required") @RequestParam("file") MultipartFile file) {

		return ResponseEntity.ok(mediaService.uploadImage(file, null));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@Positive(message = "Id must be greater than 0") @PathVariable Long id) {

		return ResponseEntity.ok(mediaService.findById(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteImage(@PathVariable Long id) {

		return ResponseEntity.ok(mediaService.deleteImage(id));
	}
}
