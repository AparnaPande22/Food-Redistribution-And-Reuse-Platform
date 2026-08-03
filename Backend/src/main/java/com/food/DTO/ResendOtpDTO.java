package com.food.DTO;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class ResendOtpDTO {

    @Email
    private String email;
}