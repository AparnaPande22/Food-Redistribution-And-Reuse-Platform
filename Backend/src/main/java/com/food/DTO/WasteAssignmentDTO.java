package com.food.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WasteAssignmentDTO {
	
	@NotNull
	private Long requestId;

	@NotNull
	private Long wastePartnerId;

	private String remarks;
}
