package com.food.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.food.entities.RequestStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDonationDTO {

    private Long donationId;

    private RequestStatus status;

    private String foodCategory;

    private String mealPreference;

    private Long estimatedMeals;

    private String pickupAddress;

    private boolean deliveryAvailable;

    private LocalDateTime neededBy;

    private LocalDateTime createdAt;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private UserSummaryDTO donor;

    private List<RequestItemDTO> items;
}