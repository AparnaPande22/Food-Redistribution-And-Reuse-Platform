package com.food.service;

import org.springframework.stereotype.Service;

import com.food.DTO.ForgetPasswordDTO;
import com.food.DTO.LoginDTO;
import com.food.DTO.LoginResponseDTO;
import com.food.DTO.RegisterDTO;
import com.food.DTO.ResetPasswordDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.User;
import com.food.entities.UserStatus;
import com.food.repository.UserRepository;
import com.food.security.JwtUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepo;

	private final JwtUtils jwtService;
	@Override
	public String register(RegisterDTO registerRequest) {

		if (userRepo.existsByEmail(registerRequest.getEmail())) {
			return "Email already exists";
		}

		User user = new User();
		user.setName(registerRequest.getName());
		user.setEmail(registerRequest.getEmail());
		user.setPasswordHash(registerRequest.getPassword());
		user.setPhone(registerRequest.getPhone());
		user.setAccountType(registerRequest.getAccountType());
		user.setAddress(registerRequest.getAddress());
		user.setCity(registerRequest.getCity());

		user.setStatus(UserStatus.ACTIVE);

		userRepo.save(user);

		return "Registration Successfull";
	}

	@Override
	public LoginResponseDTO logIn(LoginDTO loginRequest) {
		  User user = userRepo.findByEmail(loginRequest.getEmail())
		            .orElseThrow(() ->
		                    new ResourceNotFoundException("User not found"));

		    if (!user.getPasswordHash().equals(loginRequest.getPassword())) {
		        throw new ResourceNotFoundException("Invalid Password");
		    }

		    String token = jwtService.generateToken(user.getEmail());
		    return new LoginResponseDTO(
		            "Login Successful",
		            user.getId(),
		            user.getName(),
		            user.getEmail(),
		            user.getAccountType(),
		            token
		    );
	}
	@Override
	public String forgotPassword(ForgetPasswordDTO request) {
		if (!userRepo.existsByEmail(request.getEmail())) {
			return "Email not found";
		}
		return "Email verified";
	}

	@Override
	public String resetPassword(ResetPasswordDTO request) {
		User user = userRepo.findByEmail(request.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("Email not found"));

		user.setPasswordHash(request.getNewPassword());
		userRepo.save(user);
		return "Password reset successfully";
	}




}
