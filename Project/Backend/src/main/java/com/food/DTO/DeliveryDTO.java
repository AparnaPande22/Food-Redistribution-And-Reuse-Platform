package com.food.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryDTO {
	  @NotNull(message = "Match ID is required")
    private Long matchId;
	  @NotNull(message = "Delivery partner ID is required")
    private Long deliveryPartnerId;
}
