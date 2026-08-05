package com.food.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "deliveries")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Deliveries {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Delivery mode is required")
	@Column(name = "delivery_mode")
	private String deliveryMode;

	@NotNull(message = "Delivery status is required")
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private DeliveryStatus status;

	 @NotNull(message = "Pickup time is required")
	@Column(name = "pickup_time")
	private LocalDateTime pickupTime;

	@Column(name = "delivery_time")
	private LocalDateTime deliveryTime;

	 @NotNull(message = "Delivery partner is required")
	@ManyToOne
	@JoinColumn(name = "delivery_partner_id")
	private User deliveryPartner;

	 @NotNull(message = "Match is required")
	@OneToOne
	@JoinColumn(name = "match_id")
	private Matches match;

}
