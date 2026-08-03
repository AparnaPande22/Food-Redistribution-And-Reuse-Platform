package com.food.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyOtpDTO {

    @Email
    private String email;

    @NotBlank
    private String otp;
}
