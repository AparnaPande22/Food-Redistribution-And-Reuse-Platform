package com.food.mapper;

import org.springframework.stereotype.Component;

import com.food.DTO.WasteResponseDTO;
import com.food.entities.Request;

@Component
public class WasteMapper {
	public WasteResponseDTO toWasteDTO(Request request) {

		WasteResponseDTO dto = new WasteResponseDTO();

		dto.setRequestId(request.getId());

		dto.setDonorName(request.getUser().getName());

		dto.setPickupAddress(request.getPickUpAddress());

		dto.setEstimatedMeals(request.getEstimatedMeals());

		dto.setStatus(request.getStatus());

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
