package com.food.DTO;

import java.time.LocalDateTime;

import com.food.entities.MatchStatus;

import lombok.Getter;
import lombok.Setter;

/**
 * Flattened, safe representation of a Match returned to the frontend.
 *
 * We deliberately do NOT return the raw Matches entity from the API
 * (it was previously returned directly, which serialized the nested
 * User objects -> including the bcrypt password hash). This DTO also
 * makes it trivial for the Donor dashboard to show "which receiver
 * wants this food" and for the Volunteer dashboard to show pickup /
 * drop-off details.
 */
@Getter
@Setter
public class MatchResponseDTO {

    private Long matchId;
    private MatchStatus matchStatus;
    private LocalDateTime matchedAt;

    // Donation (donor) side
    private Long donationRequestId;
    private String foodType;
    private Long estimatedMeals;
    private String pickupAddress;
    private Long donorId;
    private String donorName;
    private String donorPhone;

    // Receiver side
    private Long receiverRequestId;
    private Long receiverId;
    private String receiverName;
    private String receiverPhone;
    private String receiverAddress;

    // Who created the match
    private Long matchedById;
    private String matchedByName;

    // Delivery / volunteer info (if assigned)
    private Long deliveryPartnerId;
    private String deliveryPartnerName;
    private String deliveryPartnerPhone;
}
