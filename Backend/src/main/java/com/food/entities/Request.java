package com.food.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "requests")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Request {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Request type is required")
	@Column(name = "request_type")
	@Enumerated(EnumType.STRING)
	private RequestType requestType;

	@NotNull(message = "Status is required")
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private RequestStatus status;

	@NotBlank(message = "Meal preference is required")
	@Column(name = "meal_preference")
	private String mealPreference;

	@NotNull(message = "Estimated meals is required")
	@Positive(message = "Estimated meals must be greater than 0")
	@Column(name = "estimated_meals")
	private Long estimatedMeals;

	@NotBlank(message = "Pickup address is required")
	@Column(name = "pickup_address")
	private String pickUpAddress;

	@Column(name = "delivery_available")
	private boolean deliveryAvailable;

	@NotNull(message = "Needed by date is required")
	// @Future(message = "Needed by date must be in the future")
	@Column(name = "needed_by")
	private LocalDateTime neededBy;

	@Column(name = "notes")
	private String notes;

	@Column(name = "created_at")
	@CreationTimestamp
	private LocalDateTime createdAt;

	@NotNull(message = "User is required")
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "waste_partner_id")
	private User wastePartner;

	@Column(name = "waste_partner_name")
	private String wastePartnerName;

	@Column(name = "waste_assigned_date")
	private LocalDateTime wasteAssignedDate;

	@Column(name = "waste_processed_date")
	private LocalDateTime wasteProcessedDate;

	@Column(name = "biogas_generated")
	private Double biogasGenerated;

	@Column(name = "fertilizer_generated")
	private Double fertilizerGenerated;

	@Column(name = "waste_remark", length = 500)
	private String wasteRemarks;

	@ManyToOne
	@JoinColumn(name = "biogas_industry_id")
	private BiogasIndustry biogasIndustry;

	@Column(name = "waste_reason")
	private String wasteReason;

	@Column(precision = 10, scale = 7)
	private BigDecimal latitude;

	@Column(precision = 10, scale = 7)
	private BigDecimal longitude;
}
