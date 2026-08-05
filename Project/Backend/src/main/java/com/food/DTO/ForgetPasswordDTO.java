package com.food.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgetPasswordDTO {
	@NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
private String email;
}
