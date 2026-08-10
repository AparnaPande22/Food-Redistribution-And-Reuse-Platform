package com.food.DTO;

import java.math.BigDecimal;
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

	private String foodCategory;

	private Long estimatedMeals;

	private String pickUpAddress;

	private boolean deliveryAvailable;

	private LocalDateTime neededBy;

	private String notes;

	private LocalDateTime createdAt;

	private String message;

	private BigDecimal latitude;

	private BigDecimal longitude;

}
