
package com.food.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.DTO.WasteAssignmentDTO;
import com.food.DTO.WasteProcessingDTO;
import com.food.DTO.WasteResponseDTO;
import com.food.service.WasteService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/waste")
@RequiredArgsConstructor
public class WasteController {

    private final WasteService wasteService;


    // =========================================================
    // MARK REQUEST AS WASTE
    // =========================================================

    @PutMapping("/{requestId}/mark-waste")
    public ResponseEntity<WasteResponseDTO> markAsWaste(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                wasteService.markAsWaste(requestId)
        );
    }


    // =========================================================
    // GET ALL PENDING WASTE REQUESTS
    // =========================================================

    @GetMapping("/waste_queue")
    public ResponseEntity<List<WasteResponseDTO>> getWasteQueue() {

        return ResponseEntity.ok(
                wasteService.getWasteQueue()
        );
    }


    // =========================================================
    // ASSIGN WASTE TO INDUSTRY / BIOGAS PARTNER
    // =========================================================

    @PutMapping("/assign-partner")
    public ResponseEntity<WasteResponseDTO> assignWastePartner(
            @Valid @RequestBody WasteAssignmentDTO dto) {

        return ResponseEntity.ok(
                wasteService.assignWastePartner(dto)
        );
    }


    // =========================================================
    // GET WASTE ASSIGNED TO INDUSTRY
    // =========================================================

    @GetMapping("/assigned/{partnerId}")
    public ResponseEntity<List<WasteResponseDTO>> getAssignedWaste(
            @PathVariable Long partnerId) {

        return ResponseEntity.ok(
                wasteService.getAssignedWaste(partnerId)
        );
    }


    // =========================================================
    // PROCESS WASTE
    // =========================================================

    @PutMapping("/process/{requestId}")
    public ResponseEntity<WasteResponseDTO> processWaste(
            @PathVariable Long requestId,
            @Valid @RequestBody WasteProcessingDTO dto) {

        return ResponseEntity.ok(
                wasteService.processWaste(requestId, dto)
        );
    }


    // =========================================================
    // UNASSIGN WASTE PARTNER
    // =========================================================

    @PutMapping("/unassigned/{requestId}")
    public ResponseEntity<WasteResponseDTO> unassignWastePartner(
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                wasteService.unassignWastePartner(requestId)
        );
    }


    // =========================================================
    // WASTE HISTORY
    // =========================================================

    @GetMapping("/history")
    public ResponseEntity<List<WasteResponseDTO>> getWasteHistory() {

        return ResponseEntity.ok(
                wasteService.getWasteHistory()
        );
    }


    // =========================================================
    // REJECT WASTE PICKUP
    // =========================================================

    @PutMapping("/reject/{requestId}")
    public ResponseEntity<WasteResponseDTO> rejectWastePickup(
            @PathVariable Long requestId,
            @RequestBody String remark) {

        return ResponseEntity.ok(
                wasteService.rejectWastePickup(
                        requestId,
                        remark
                )
        );
    }


    // =========================================================
    // GET PROCESSED WASTE
    // =========================================================

    @GetMapping("/processed")
    public ResponseEntity<List<WasteResponseDTO>> getProcessedWaste() {

        return ResponseEntity.ok(
                wasteService.getProcessedWaste()
        );
    }


    // =========================================================
    // GET PROCESSED WASTE BY ID
    // =========================================================

    @GetMapping("/processed/{id}")
    public ResponseEntity<WasteResponseDTO> getProcessedWasteById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                wasteService.getProcessedWasteById(id)
        );
    }
}

