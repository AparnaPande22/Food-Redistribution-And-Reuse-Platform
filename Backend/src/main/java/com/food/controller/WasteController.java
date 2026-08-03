package com.food.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    // marking as waste
    @PutMapping("/{requestId}/mark-waste")
    public ResponseEntity<?> markAsWaste(
            @Positive(message = "Id must be greater than 0")
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                wasteService.markAsWaste(requestId)
        );
    }



    // get all waste request
    @GetMapping("/waste_queue")
    public ResponseEntity<List<WasteResponseDTO>> getWasteQueue() {

        return ResponseEntity.ok(
                wasteService.getWasteQueue()
        );
    }



    // assign waste partner
    @PutMapping("/assign-partner")
    public ResponseEntity<WasteResponseDTO> assignWastePartner(
            @RequestBody @Valid WasteAssignmentDTO dto) {

        return ResponseEntity.ok(
                wasteService.assignWastePartner(dto)
        );
    }



    // assigned waste to partner
    @GetMapping("/assigned/{partnerId}")
    public ResponseEntity<List<WasteResponseDTO>> getAssignedWaste(
            @PathVariable Long partnerId) {

        return ResponseEntity.ok(
                wasteService.getAssignedWaste(partnerId)
        );
    }



    // waste processing
    @PutMapping("/process/{requestId}")
    public ResponseEntity<WasteResponseDTO> processWaste(
            @PathVariable Long requestId,
            @RequestBody @Valid WasteProcessingDTO dto) {

        return ResponseEntity.ok(
                wasteService.processWaste(requestId, dto)
        );
    }



    // unassign partner
    @PutMapping("/unassigned/{requestId}")
    public ResponseEntity<?> unassignWastePartner(
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                wasteService.unassignWastePartner(requestId)
        );
    }



    // history
    @GetMapping("/history")
    public ResponseEntity<List<WasteResponseDTO>> getWasteHistory() {

        return ResponseEntity.ok(
                wasteService.getWasteHistory()
        );
    }



    // reject pickup
    @PutMapping("/reject/{requestId}")
    public ResponseEntity<?> rejectWastePickUp(
            @PathVariable Long requestId,
            @RequestBody String remark) {

        return ResponseEntity.ok(
                wasteService.rejectWastePickup(requestId, remark)
        );
    }



    // processed waste
    @GetMapping("/processed")
    public ResponseEntity<List<WasteResponseDTO>> getProcessedWaste() {

        return ResponseEntity.ok(
                wasteService.getProcessedWaste()
        );
    }



    // processed waste by id
    @GetMapping("/processed/{id}")
    public ResponseEntity<WasteResponseDTO> getProcessedWasteById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                wasteService.getProcessedWasteById(id)
        );
    }

}