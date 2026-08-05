package com.food.DTO;

import com.food.entities.Outcome;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryOutcomeDTO {
	  @NotNull(message = "Delivery ID is required")
	 private Long deliveryId;
	  
	  @NotBlank(message = "Outcome is required")
	    private Outcome outcome;

	   @Size(max = 500, message = "Remarks cannot exceed 500 characters")
	    private String remarks;

}
