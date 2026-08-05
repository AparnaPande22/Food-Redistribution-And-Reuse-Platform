package com.food.DTO;

import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WasteProcessingDTO {

	@Positive
	private Double biogasGenerated;

	@Positive
	private Double fertilizerGenerated;

	private String remarks;
}
