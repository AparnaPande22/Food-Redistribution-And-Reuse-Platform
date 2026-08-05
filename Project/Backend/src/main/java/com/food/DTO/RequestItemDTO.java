package com.food.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestItemDTO {

	private Long requestId;

	private String itemName;

	private String foodCategory;

	private int quantity;

	private String unit;

	private LocalDateTime expiryTime;
}
