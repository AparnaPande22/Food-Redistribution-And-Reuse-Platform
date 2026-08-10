package com.food.DTO;

import java.time.LocalDateTime;

import com.food.entities.DeliveryStatus;

import lombok.Getter;
import lombok.Setter;

/**
 * Flattened, safe representation of a Delivery returned to the frontend.
 * Avoids serializing the raw entity graph (which included password
 * hashes via the nested User/Match/Request objects) and gives the
 * Volunteer Dashboard everything it needs (pickup / drop-off address,
 * food type, donor & receiver contact info) in one call.
 */
@Getter
@Setter
public class DeliveryResponseDTO {

    private Long deliveryId;
    private DeliveryStatus status;
    private String deliveryMode;
    private LocalDateTime pickupTime;
    private LocalDateTime deliveryTime;

    private Long matchId;

    private Long donationRequestId;
    private String foodType;
    private Long estimatedMeals;
    private String pickupAddress;
    private String donorName;
    private String donorPhone;

    private Long receiverRequestId;
    private String deliveryAddress;
    private String receiverName;
    private String receiverPhone;

    private Long deliveryPartnerId;
    private String deliveryPartnerName;
}
