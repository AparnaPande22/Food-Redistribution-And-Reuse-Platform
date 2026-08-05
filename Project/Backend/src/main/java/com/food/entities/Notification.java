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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "notifications")
@Setter
@Getter
@ToString
@NoArgsConstructor
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "User is required")
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

    @NotBlank(message = "Title is required")
	@Column(name = "title")
	private String title;

    @NotBlank(message = "Message is required")
	@Column(name = "message")
	private String message;

	@Column(name = "is_read")
	private boolean isRead;

	@Column(name = "created_at")
	private LocalDateTime createdAt;
}
