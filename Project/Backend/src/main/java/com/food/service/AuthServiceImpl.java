package com.food.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.food.DTO.ForgetPasswordDTO;
import com.food.DTO.LoginDTO;
import com.food.DTO.LoginResponseDTO;
import com.food.DTO.RegisterDTO;
import com.food.DTO.ResendOtpDTO;
import com.food.DTO.ResetPasswordDTO;
import com.food.DTO.VerifyOtpDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.OtpPurpose;
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

    private static final int OTP_VALID_MINUTES = 10;

    private final UserRepository userRepo;
    private final JwtUtils jwtService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    private String generateAndStoreOtp(User user, OtpPurpose purpose) {

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(OTP_VALID_MINUTES));
        user.setOtpPurpose(purpose);

        userRepo.save(user);

        return otp;
    }

    private void validateOtp(User user, String otp, OtpPurpose purpose) {

        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpPurpose() != purpose) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry() == null ||
                user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }
    }

    private void clearOtp(User user) {
        user.setOtp(null);
        user.setOtpExpiry(null);
        user.setOtpPurpose(null);
    }

    private String purposeLabelFor(OtpPurpose purpose) {
        return switch (purpose) {
            case REGISTER -> "verify your email and complete registration";
            case LOGIN -> "complete your login";
            case RESET_PASSWORD -> "reset your password";
        };
    }

    @Override
    public String register(RegisterDTO registerRequest) {

        if (userRepo.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhone(registerRequest.getPhone());
        user.setAccountType(registerRequest.getAccountType());
        user.setAddress(registerRequest.getAddress());
        user.setCity(registerRequest.getCity());

        user.setStatus(UserStatus.ACTIVE);
        user.setVerified(false);

        userRepo.save(user);

        String otp = generateAndStoreOtp(user, OtpPurpose.REGISTER);

        emailService.sendOtp(user.getEmail(), otp, "verify your email and complete registration");

        return "Registration successful. OTP sent to your email.";
    }

    @Override
    public String logIn(LoginDTO loginRequest) {

        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email before logging in.");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid Password");
        }

        String otp = generateAndStoreOtp(user, OtpPurpose.LOGIN);

        emailService.sendOtp(user.getEmail(), otp, "complete your login");

        return "OTP sent to your email. Please verify to complete login.";
    }

    @Override
    public String forgotPassword(ForgetPasswordDTO request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email not found"));

        String otp = generateAndStoreOtp(user, OtpPurpose.RESET_PASSWORD);

        emailService.sendOtp(user.getEmail(), otp, "reset your password");

        return "OTP sent to your email.";
    }

    @Override
    public String resetPassword(ResetPasswordDTO request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email not found"));

        validateOtp(user, request.getOtp(), OtpPurpose.RESET_PASSWORD);

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));

        clearOtp(user);

        userRepo.save(user);

        return "Password reset successfully.";
    }

    @Override
    public Object verifyOtp(VerifyOtpDTO request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        validateOtp(user, request.getOtp(), request.getPurpose());

        clearOtp(user);

        if (request.getPurpose() == OtpPurpose.REGISTER) {

            user.setVerified(true);
            userRepo.save(user);

            return "Email verified successfully.";
        }

        if (request.getPurpose() == OtpPurpose.LOGIN) {

            userRepo.save(user);

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

        // RESET_PASSWORD purpose: verify-otp can still be used to check
        // the code before showing the new-password form, but resetPassword()
        // is what actually applies it.
        userRepo.save(user);

        return "OTP verified successfully.";
    }

    @Override
    public Object resendOtp(ResendOtpDTO request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        String otp = generateAndStoreOtp(user, request.getPurpose());

        emailService.sendOtp(user.getEmail(), otp, purposeLabelFor(request.getPurpose()));

        return "OTP sent successfully.";
    }
}