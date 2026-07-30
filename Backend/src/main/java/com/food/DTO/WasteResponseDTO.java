package com.food.DTO;

import java.time.LocalDateTime;

import com.food.entities.RequestStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WasteResponseDTO {

	private Long requestId;

	private String donorName;

	private String pickupAddress;

	private Long estimatedMeals;

	private RequestStatus status;

	private Long wastePartnerId;

	private String wastePartnerName;

	private LocalDateTime wasteAssignedDate;

	private LocalDateTime wasteProcessedDate;

	private Double biogasGenerated;

	private Double fertilizerGenerated;

	private String wasteRemarks;

	private String wasteReason;
}