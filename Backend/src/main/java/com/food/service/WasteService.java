package com.food.service;

import java.util.List;

import com.food.DTO.RequestResponseDTO;
import com.food.DTO.WasteAssignmentDTO;
import com.food.DTO.WasteProcessingDTO;
import com.food.entities.Request;

public interface WasteService {

	RequestResponseDTO markAsWaste(Long requestId);

	RequestResponseDTO assignWastePartner(WasteAssignmentDTO dto);

	List<RequestResponseDTO> getWasteQueue();

	List<RequestResponseDTO> getAssignedWaste(Long partnerId);

	RequestResponseDTO processWaste(Long requestId, WasteProcessingDTO dto);
	

}
