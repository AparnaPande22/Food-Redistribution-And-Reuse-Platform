package com.food.service;

import com.food.DTO.ForgetPasswordDTO;
import com.food.DTO.LoginDTO;
import com.food.DTO.RegisterDTO;
import com.food.DTO.ResendOtpDTO;
import com.food.DTO.ResetPasswordDTO;
import com.food.DTO.VerifyOtpDTO;

public interface AuthService {
	// For Register
	public String register(RegisterDTO registerRequest);

	// For Log in - step 1: validates credentials and sends a login OTP.
	// Does NOT return a token; the token is only issued once the OTP is verified.
	public String logIn(LoginDTO loginRequest);

	// For Forgot password
	public String forgotPassword(ForgetPasswordDTO request);

	// For reset password
	public String resetPassword(ResetPasswordDTO request);

	// Returns a LoginResponseDTO (with token) when purpose == LOGIN,
	// otherwise returns a plain String message.
	Object verifyOtp(VerifyOtpDTO request);

	Object resendOtp(ResendOtpDTO request);
}