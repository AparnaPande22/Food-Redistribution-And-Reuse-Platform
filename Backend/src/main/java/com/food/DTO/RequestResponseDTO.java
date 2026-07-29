package com.food.DTO;

import java.time.LocalDateTime;

import com.food.entities.RequestStatus;
import com.food.entities.RequestType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestResponseDTO {

	private Long id;

	private RequestType requestType;

	private RequestStatus status;

	private String mealPreference;

	private Long estimatedMeals;

	private String pickUpAddress;

	private boolean deliveryAvailable;

	private LocalDateTime neededBy;

	private String notes;

	private LocalDateTime createdAt;

	private String message;

	// Waste Processing Fields
	private Long wastePartnerId;

	private String wastePartnerName;

	private LocalDateTime wasteAssignedDate;

	private LocalDateTime wasteProcessedDate;

	private Double biogasGenerated;

	private Double fertilizerGenerated;

	private String wasteRemarks;

}
