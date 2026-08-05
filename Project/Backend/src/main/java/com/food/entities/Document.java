package com.food.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "documents")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Document {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	  @NotBlank(message = "Document type is required")
	@Column(name = "document_type", length = 50, nullable = false)
	private String documentType;

	  @NotBlank(message = "Verification status is required")
	@Column(name = "verification_status", length = 20, nullable = false)
	private String verificationStatus;

	  @NotBlank(message = "Remarks are required")
	@Column(length = 500)
	private String remarks;

	@CreationTimestamp
	@Column(name = "uploaded_at", nullable = false, updatable = false)
	private LocalDateTime uploadedAt;

	  @NotNull(message = "Media is required")
	@OneToOne()
	@JoinColumn(name = "media_id", nullable = false)
	private Media media;

	    @NotNull(message = "User is required")
	@ManyToOne()
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}
