
package com.food.mapper;

import org.springframework.stereotype.Component;

import com.food.DTO.WasteResponseDTO;
import com.food.entities.Request;

@Component
public class WasteMapper {

    public WasteResponseDTO toWasteDTO(Request request) {

        WasteResponseDTO dto = new WasteResponseDTO();

        // =====================================================
        // REQUEST INFORMATION
        // =====================================================

        dto.setRequestId(request.getId());

        dto.setPickupAddress(request.getPickUpAddress());

        dto.setEstimatedMeals(request.getEstimatedMeals());


        // =====================================================
        // DONOR INFORMATION
        // =====================================================

        if (request.getUser() != null) {

            dto.setDonorId(
                    request.getUser().getId()
            );

            dto.setDonorName(
                    request.getUser().getName()
            );

            dto.setDonorEmail(
                    request.getUser().getEmail()
            );

            dto.setDonorPhone(
                    request.getUser().getPhone()
            );
        }


        // =====================================================
        // STATUS
        // =====================================================

        if (request.getStatus() != null) {
            dto.setStatus(
                    request.getStatus().toString()
            );
        }


        // =====================================================
        // WASTE PARTNER
        // =====================================================

        if (request.getWastePartner() != null) {

            dto.setWastePartnerId(
                    request.getWastePartner().getId()
            );

            dto.setWastePartnerName(
                    request.getWastePartner().getName()
            );
        }


        // =====================================================
        // WASTE INFORMATION
        // =====================================================

        dto.setWasteAssignedDate(
                request.getWasteAssignedDate()
        );

        dto.setWasteProcessedDate(
                request.getWasteProcessedDate()
        );

        dto.setBiogasGenerated(
                request.getBiogasGenerated()
        );

        dto.setFertilizerGenerated(
                request.getFertilizerGenerated()
        );

        dto.setRemarks(
                request.getWasteRemarks()
        );


        // =====================================================
        // PAYMENT
        // =====================================================

        dto.setPaymentAmount(20.0);


        return dto;
    }
}

