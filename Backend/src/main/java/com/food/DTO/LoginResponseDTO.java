package com.food.DTO;

import com.food.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {

	private String message;
	private Long userId;
	private String name;
	private String email;
	private Role accountType;
	private String token;
}
