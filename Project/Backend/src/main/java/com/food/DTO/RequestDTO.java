package com.food.DTO;

import java.time.LocalDateTime;

import com.food.entities.RequestStatus;
import com.food.entities.RequestType;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestDTO {
	@NotNull(message = "User ID is required")
	private Long userId;

	@NotNull(message = "Request type is required")
	private RequestType requestType;

	@NotNull
	private RequestStatus status;

	@NotBlank(message = "Meal preference is required")
	private String mealPreference;

	@NotNull(message = "Estimated meals is required")
	private Long estimatedMeals;

	@NotBlank(message = "Pickup address is required")
	@Size(max = 300)
	private String pickUpAddress;

	private boolean deliveryAvailable;

	@Future(message = "Needed by must be a future date")
	private LocalDateTime neededBy;

	@Size(max = 500)
	private String notes;

	private LocalDateTime createdAt;

}
