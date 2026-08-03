package com.food.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.food.DTO.ForgetPasswordDTO;
import com.food.DTO.LoginDTO;
import com.food.DTO.LoginResponseDTO;
import com.food.DTO.RegisterDTO;
import com.food.DTO.ResendOtpDTO;
import com.food.DTO.ResetPasswordDTO;
import com.food.DTO.VerifyOtpDTO;
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
    private final EmailService emailService;

    @Override
    public String register(RegisterDTO registerRequest) {

        if (userRepo.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
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

        // Generate OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        user.setVerified(false);

        userRepo.save(user);

        // Send OTP Email
        emailService.sendOtp(user.getEmail(), otp);

        return "Registration successful. OTP sent to your email.";
    }

    @Override
    public LoginResponseDTO logIn(LoginDTO loginRequest) {

        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email before login.");
        }

        if (!user.getPasswordHash().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid Password");
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

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email not found"));

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));

        userRepo.save(user);

        emailService.sendOtp(user.getEmail(), otp);

        return "OTP sent to your email.";
    }

    @Override
    public String resetPassword(ResetPasswordDTO request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email not found"));

        user.setPasswordHash(request.getNewPassword());

        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepo.save(user);

        return "Password reset successfully.";
    }

    @Override
    public String verifyOtp(VerifyOtpDTO request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (user.getOtp() == null ||
                !user.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry() == null ||
                user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepo.save(user);

        return "Email verified successfully.";
    }

    @Override
    public String resendOtp(ResendOtpDTO request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));

        userRepo.save(user);

        emailService.sendOtp(user.getEmail(), otp);

        return "OTP sent successfully.";
    }
}