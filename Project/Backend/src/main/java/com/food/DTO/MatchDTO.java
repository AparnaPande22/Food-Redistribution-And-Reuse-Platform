package com.food.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MatchDTO {
	  @NotNull(message = "Donation Request ID is required")
	private Long donationRequestId;

	  @NotNull(message = "Receiver Request ID is required")
    private Long receiverRequestId;

	  @NotNull(message = "Matched By is required")
    private Long matchedBy;
}
