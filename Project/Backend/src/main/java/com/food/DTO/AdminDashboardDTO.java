package com.food.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDashboardDTO {
	private Long totalUsers;

	private Long pendingUsers;

	private Long totalRequests;

	private Long pendingRequests;

	private Long totalDeliveries;

	private Long completedDeliveries;

	private Long totalMatches;
}
