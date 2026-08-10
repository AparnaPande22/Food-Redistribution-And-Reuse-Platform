package com.food.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestItemDTO {

	// Present on responses (find/list) so the frontend can key rows and
	// call update/delete without a second lookup.
	private Long id;

	private Long requestId;

	private String itemName;

	private String foodCategory;

	private int quantity;

	private String unit;

	private LocalDateTime expiryTime;
}
