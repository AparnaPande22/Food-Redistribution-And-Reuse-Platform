
package com.food.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.RequestDTO;
import com.food.DTO.RequestResponseDTO;
import com.food.entities.RequestStatus;
import com.food.service.RequestService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
@Validated
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:5174"
    }
)
public class RequestController {

    private final RequestService requestService;

    // ======================================================
    // CREATE REQUEST
    // POST /api/requests
    // ======================================================

    @PostMapping
    public ResponseEntity<RequestResponseDTO> addNewRequest(
            @Valid @RequestBody RequestDTO dto) {

        RequestResponseDTO response =
            requestService.addNewRequest(dto);

        return new ResponseEntity<>(
            response,
            HttpStatus.CREATED
        );
    }

    // ======================================================
    // FIND REQUEST BY ID
    // GET /api/requests/id/{id}
    // ======================================================

    @GetMapping("/id/{id}")
    public ResponseEntity<?> findById(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long id) {

        return ResponseEntity.ok(
            requestService.findById(id)
        );
    }

    // ======================================================
    // FIND ALL REQUESTS
    // GET /api/requests
    // ======================================================

    @GetMapping
    public ResponseEntity<?> findAllRequests() {

        return ResponseEntity.ok(
            requestService.findAllRequest()
        );
    }

    // ======================================================
    // DELETE REQUEST
    // DELETE /api/requests/{id}
    // ======================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long id) {

        return ResponseEntity.ok(
            requestService.deleteById(id)
        );
    }

    // ======================================================
    // ACTIVE REQUESTS
    // GET /api/requests/active
    // ======================================================

    @GetMapping("/active")
    public ResponseEntity<?> findActiveRequest() {

        return ResponseEntity.ok(
            requestService.findActiveDonations()
        );
    }

    // ======================================================
    // MY REQUESTS
    // GET /api/requests/my/{userId}
    // ======================================================

    @GetMapping("/my/{userId}")
    public ResponseEntity<?> findMyRequest(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long userId) {

        return ResponseEntity.ok(
            requestService.findMyRequest(userId)
        );
    }

    // ======================================================
    // SUBMIT REQUEST
    // PUT /api/requests/submit/{id}
    // ======================================================

    @PutMapping("/submit/{id}")
    public ResponseEntity<?> submitRequest(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long id) {

        return ResponseEntity.ok(
            requestService.submitRequest(id)
        );
    }

    // ======================================================
    // CANCEL REQUEST
    // PUT /api/requests/cancel/{id}
    // ======================================================

    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelRequest(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long id) {

        return ResponseEntity.ok(
            requestService.cancelRequest(id)
        );
    }

    // ======================================================
    // REQUEST HISTORY
    // GET /api/requests/history/{userId}
    // ======================================================

    @GetMapping("/history/{userId}")
    public ResponseEntity<?> findRequestHistory(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long userId) {

        return ResponseEntity.ok(
            requestService.findRequestHistory(userId)
        );
    }

    // ======================================================
    // UPDATE REQUEST
    // PUT /api/requests/update/{id}
    // ======================================================

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRequest(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long id,
            @Valid @RequestBody RequestDTO dto) {

        return ResponseEntity.ok(
            requestService.updateRequest(id, dto)
        );
    }
}

