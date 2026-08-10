
package com.food.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WasteResponseDTO {

    private Long requestId;

    private Long donorId;
    private String donorName;
    private String donorEmail;
    private String donorPhone;

    private String pickupAddress;
    private Long estimatedMeals;

    private String status;

    private Long wastePartnerId;
    private String wastePartnerName;

    private LocalDateTime wasteAssignedDate;
    private LocalDateTime wasteProcessedDate;

    private Double biogasGenerated;
    private Double fertilizerGenerated;

    private String remarks;

    private Double paymentAmount;
}
