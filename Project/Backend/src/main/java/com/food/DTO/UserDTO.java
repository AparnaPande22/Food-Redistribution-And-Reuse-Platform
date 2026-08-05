package com.food.DTO;

import com.food.entities.Role;
import com.food.entities.UserStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	@NotBlank(message = "Name is required")
	@Size(max = 100)
	private String name;

	@NotBlank(message = "Email is required")
	@Email(message = "Enter valid email")
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 6, message = "Password must be at least 6 characters")
	private String password;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[0-9]{10}$", message = "Enter valid 10-digit phone number")
	private String phone;

	@NotNull(message = "Account type is required")
	private Role accountType;;

	@NotBlank(message = "Address is required")
	@Size(max = 300)
	private String address;

	@NotBlank(message = "City is required")
	private String city;

	@NotNull(message = "Status is required")
	private UserStatus status;

	
}
