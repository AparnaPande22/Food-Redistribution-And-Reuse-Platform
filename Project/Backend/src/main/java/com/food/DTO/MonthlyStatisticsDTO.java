package com.food.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MonthlyStatisticsDTO {

	private String month;
	private Long totalDonations;
}
