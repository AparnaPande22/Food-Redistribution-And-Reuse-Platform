package com.food.mapper;

import org.springframework.stereotype.Component;

import com.food.DTO.RequestResponseDTO;
import com.food.entities.Request;

@Component
public class RequestMapper {

	public RequestResponseDTO toRequestResponseDTO(Request request) {

		if (request == null) {
			return null;
		}

		RequestResponseDTO dto = new RequestResponseDTO();

		dto.setId(request.getId());
		dto.setRequestType(request.getRequestType());
		dto.setStatus(request.getStatus());
		dto.setMealPreference(request.getMealPreference());
		dto.setEstimatedMeals(request.getEstimatedMeals());
		dto.setPickUpAddress(request.getPickUpAddress());
		dto.setDeliveryAvailable(request.isDeliveryAvailable());
		dto.setNeededBy(request.getNeededBy());
		dto.setNotes(request.getNotes());
		dto.setCreatedAt(request.getCreatedAt());

		if (request.getWastePartner() != null) {
			dto.setWastePartnerId(request.getWastePartner().getId());
			dto.setWastePartnerName(request.getWastePartner().getName());
		}

		dto.setWasteAssignedDate(request.getWasteAssignedDate());
		dto.setWasteProcessedDate(request.getWasteProcessedDate());
		dto.setBiogasGenerated(request.getBiogasGenerated());
		dto.setFertilizerGenerated(request.getFertilizerGenerated());
		dto.setWasteRemarks(request.getWasteRemarks());

		return dto;
	}
}
