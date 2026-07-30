package com.food.service;

import java.util.List;

import com.food.DTO.WasteAssignmentDTO;
import com.food.DTO.WasteProcessingDTO;
import com.food.DTO.WasteResponseDTO;

public interface WasteService {

	WasteResponseDTO markAsWaste(Long requestId);

	WasteResponseDTO assignWastePartner(WasteAssignmentDTO dto);

	List<WasteResponseDTO> getWasteQueue();

	List<WasteResponseDTO> getAssignedWaste(Long partnerId);

	WasteResponseDTO processWaste(Long requestId, WasteProcessingDTO dto);

	WasteResponseDTO unassignWastePartner(Long requestId);

	List<WasteResponseDTO> getWasteHistory();

	WasteResponseDTO rejectWastePickup(Long requestId, String remarks);

	List<WasteResponseDTO> getProcessedWaste();

	WasteResponseDTO getProcessedWasteById(Long requestId);

}
