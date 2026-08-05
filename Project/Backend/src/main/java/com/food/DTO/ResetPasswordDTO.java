package com.food.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {
	@NotBlank(message = "Email is required")
    @Email(message = "Enter valid email")
	private String email;

	@NotBlank(message = "OTP is required")
	private String otp;

	 @NotBlank(message = "New password is required")
	    @Size(min = 6, message = "Password must contain at least 6 characters")
	private String newPassword;
}