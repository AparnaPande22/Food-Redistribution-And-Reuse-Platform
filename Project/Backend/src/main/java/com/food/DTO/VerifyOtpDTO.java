package com.food.DTO;

import com.food.entities.OtpPurpose;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VerifyOtpDTO {

    @Email
    private String email;

    @NotBlank
    private String otp;

    @NotNull(message = "Purpose is required")
    private OtpPurpose purpose;
}