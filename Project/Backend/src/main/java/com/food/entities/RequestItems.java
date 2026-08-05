package com.food.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "request_items")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class RequestItems {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Item name is required")
	@Column(name = "item_name")
	private String itemName;

    @NotBlank(message = "Food category is required")
	@Column(name = "food_category")
	private String foodCategory;

    @Positive(message = "Quantity must be greater than 0")
	@Column(name = "quantity")
	private int quantity;

    @NotNull(message = "Request is required")
	@ManyToOne
	@JoinColumn(name = "request_id")
	private Request request;

    @NotBlank(message = "Unit is required")
	@Column(name = "unit")
	private String unit;

    @NotNull(message = "Expiry time is required")
    @Future(message = "Expiry time must be in the future")
	@Column(name = "expiry_time")
	private LocalDateTime expiryTime;

}
