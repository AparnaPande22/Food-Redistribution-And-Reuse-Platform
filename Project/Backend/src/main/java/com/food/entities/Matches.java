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
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Matches {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Donation request is required")
	@ManyToOne
	@JoinColumn(name = "donation_request_id")
	private Request donationRequest;

	@NotNull(message = "Receiver request is required")
	@ManyToOne
	@JoinColumn(name = "receiver_request_id")
	private Request receiverRequest;

	@NotBlank(message = "Match status is required")
	@Column(name = "match_status")
	@Enumerated(EnumType.STRING)
	private MatchStatus matchStatus;

	@Column(name = "matched_at")
	private LocalDateTime matchedAt;

	@NotNull(message = "Matched by user is required")
	@ManyToOne
	@JoinColumn(name = "matched_by")
	private User matchedBy;

	@NotNull(message = "Delivery partner is required")
	@ManyToOne
	@JoinColumn(name = "delivery_partner_id")
	private User deliveryPartner;

}
