package com.food.DTO;

import com.food.entities.OtpPurpose;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ResendOtpDTO {

    @Email
    private String email;

    @NotNull(message = "Purpose is required")
    private OtpPurpose purpose;
}