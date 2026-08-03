package com.food.service;

import com.food.DTO.ForgetPasswordDTO;
import com.food.DTO.LoginDTO;
import com.food.DTO.LoginResponseDTO;
import com.food.DTO.RegisterDTO;
import com.food.DTO.ResendOtpDTO;
import com.food.DTO.ResetPasswordDTO;
import com.food.DTO.VerifyOtpDTO;

public interface AuthService {
	// For Register
	public String register(RegisterDTO registerRequest);

//For Log in
	public LoginResponseDTO logIn(LoginDTO loginRequest);

//For Forgot password
	public String forgotPassword(ForgetPasswordDTO request);

	// For reset password
	public String resetPassword(ResetPasswordDTO request);

	Object verifyOtp(VerifyOtpDTO request);

	Object resendOtp(ResendOtpDTO request);
}
