package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.food.DTO.*;

import com.food.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

//    @PostMapping("/verify-otp")
//    public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerifyOtpDTO request) {
//        return ResponseEntity.ok(authService.verifyOtp(request));
//    }
//
//    @PostMapping("/resend-otp")
//    public ResponseEntity<?> resendOtp(@Valid @RequestBody ResendOtpDTO request) {
//        return ResponseEntity.ok(authService.resendOtp(request));
//    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginDTO request) {
        return ResponseEntity.ok(authService.logIn(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgetPasswordDTO request) {
        return ResponseEntity.ok(authService.forgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordDTO request) {
        return ResponseEntity.ok(authService.resetPassword(request));
    }
}