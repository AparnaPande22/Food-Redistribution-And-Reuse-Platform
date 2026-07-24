package com.food.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString(exclude = "passwordHash")
@NoArgsConstructor

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JoinColumn(name = "profile_media_id")
	@OneToOne
	private Media profileMediaId;

	@Column(length = 100, nullable = false)
	@NotBlank(message = "Name is required")
	private String name;

	@NotBlank(message = "email is required")
	@Email(message = "Enter a valid email")
	@Column(length = 255, unique = true, nullable = false)
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 6, message = "Password must be at least 6 characters")
	@Column(length = 255, nullable = false)
	private String passwordHash;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[0-9]{10}$", message = "Enter a valid 10-digit phone number")
	@Column(length = 15, nullable = false, unique = true)
	private String phone;

	@NotNull(message = "Role is required")
	@Column(name = "account_type", length = 20, nullable = false)
	@Enumerated(EnumType.STRING)
	private Role accountType;

	@Column(name = "team_role", length = 30)
	private String teamRole;

	@NotBlank(message = "Status is required")
	@Column(length = 20, nullable = false)
	@Enumerated(EnumType.STRING)
	private UserStatus status;

	@NotBlank(message = "Address is required")
	@Column(length = 300, nullable = false)
	private String address;

	@NotBlank(message = "City is required")
	@Column(length = 100, nullable = false)
	private String city;

	@Column(precision = 10, scale = 7)
	private BigDecimal latitude;

	@Column(precision = 10, scale = 7)
	private BigDecimal longitude;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

}
