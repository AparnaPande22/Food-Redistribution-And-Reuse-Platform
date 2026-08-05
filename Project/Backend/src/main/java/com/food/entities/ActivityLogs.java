package com.food.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "activitylogs")
@Setter
@Getter
@ToString
@NoArgsConstructor
public class ActivityLogs {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "User is required")
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@NotBlank(message = "Action is required")
	@Column(nullable = false)
	private String action;

	@NotBlank(message = "Entity type is required")
	@Column(name = "entity_type", nullable = false)
	private String entityType;

	@NotBlank(message = "Entity ID is required")
	@Column(name = "entity_id", nullable = false)
	private String entityId;

	@Column(name = "created_at", nullable = false, updatable = false)
	@CreationTimestamp
	private LocalDateTime createdAt;
}
