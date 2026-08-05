package com.food.service;

public interface EmailService {
    void sendOtp(String toEmail, String otp, String purposeLabel);
}