package com.food.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImpactDashboardDTO {
	private Long totalCompletedDonations;

	private Long totalCompletedDeliveries;

	private Long totalFoodQuantity;

	private Long totalDonors;

	private Long totalReceivers;

	private Long totalMatches;
}
