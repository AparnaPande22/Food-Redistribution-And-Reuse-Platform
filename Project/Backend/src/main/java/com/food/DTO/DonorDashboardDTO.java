package com.food.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DonorDashboardDTO {

	private Long totalRequests;

	private Long activeRequests;

	private Long completedRequests;

	private Long cancelledRequests;

	// private Integer totalQuantityDonated;

	// private List<RequestResponseDTO> recentRequests;
}
