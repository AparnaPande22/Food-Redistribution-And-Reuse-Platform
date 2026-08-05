package com.food.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WasteDashboardDTO {

	private Long pendingAssignments;

	private Long completedProcesses;

	private Double totalBiogasGenerated;

	private Double totalFertilizerGenerated;

	private Long totalWasteProcessed;

}
