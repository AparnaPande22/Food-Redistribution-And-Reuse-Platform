
package com.food.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.WasteAssignmentDTO;
import com.food.DTO.WasteProcessingDTO;
import com.food.DTO.WasteResponseDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Request;
import com.food.entities.RequestStatus;
import com.food.entities.Role;
import com.food.entities.User;
import com.food.mapper.WasteMapper;
import com.food.repository.RequestRepository;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class WasteServiceImplementation implements WasteService {

    private final RequestRepository reqRepo;
    private final UserRepository userRepo;
    private final WasteMapper wasteMapper;


    // ============================================================
    // MARK REQUEST AS WASTE
    // ============================================================

    @Override
    public WasteResponseDTO markAsWaste(Long requestId) {

        Request request = reqRepo.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Request not found with id: " + requestId)
                );

        if (request.getStatus() != RequestStatus.REJECTED
                && request.getStatus() != RequestStatus.EXPIRED
                && request.getStatus() != RequestStatus.MATCH_FAILED) {

            throw new IllegalArgumentException(
                    "Only rejected, expired or match-failed donations can be marked as waste."
            );
        }

        request.setStatus(RequestStatus.MARKED_FOR_WASTE);

        Request savedRequest = reqRepo.save(request);

        return wasteMapper.toWasteDTO(savedRequest);
    }


    // ============================================================
    // ASSIGN WASTE TO BIOGAS PARTNER
    // ============================================================

    @Override
    public WasteResponseDTO assignWastePartner(
            WasteAssignmentDTO dto) {

        Request request = reqRepo.findById(dto.getRequestId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Request not found with id: " + dto.getRequestId()
                        )
                );

        if (request.getStatus() != RequestStatus.MARKED_FOR_WASTE) {

            throw new IllegalArgumentException(
                    "Only requests marked for waste can be assigned to a waste partner."
            );
        }

        User partner = userRepo.findById(dto.getWastePartnerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Waste partner not found with id: "
                                        + dto.getWastePartnerId()
                        )
                );

        if (partner.getAccountType() != Role.BIOGAS_PARTNER) {

            throw new IllegalArgumentException(
                    "Selected user is not a Biogas Partner."
            );
        }

        request.setWastePartner(partner);

        request.setWasteAssignedDate(
                LocalDateTime.now()
        );

        request.setWasteRemarks(
                dto.getRemarks()
        );

        request.setStatus(
                RequestStatus.WASTE_ASSIGNED
        );

        Request savedRequest = reqRepo.save(request);

        return wasteMapper.toWasteDTO(savedRequest);
    }


    // ============================================================
    // GET PENDING WASTE QUEUE
    // ============================================================

    @Override
    public List<WasteResponseDTO> getWasteQueue() {

        List<Request> requests =
                reqRepo.findByStatus(
                        RequestStatus.MARKED_FOR_WASTE
                );

        return requests.stream()
                .map(wasteMapper::toWasteDTO)
                .toList();
    }


    // ============================================================
    // GET ASSIGNED WASTE
    // ============================================================

    @Override
    public List<WasteResponseDTO> getAssignedWaste(
            Long partnerId) {

        User partner = userRepo.findById(partnerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Partner not found with id: " + partnerId
                        )
                );

        return reqRepo.findByWastePartner(partner)
                .stream()
                .map(wasteMapper::toWasteDTO)
                .toList();
    }


    // ============================================================
    // PROCESS WASTE
    // ============================================================

    @Override
    public WasteResponseDTO processWaste(
            Long requestId,
            WasteProcessingDTO dto) {

        Request request = reqRepo.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Request not found with id: " + requestId
                        )
                );

        if (request.getStatus() != RequestStatus.WASTE_ASSIGNED) {

            throw new IllegalArgumentException(
                    "Only assigned waste requests can be processed."
            );
        }

        request.setBiogasGenerated(
                dto.getBiogasGenerated()
        );

        request.setFertilizerGenerated(
                dto.getFertilizerGenerated()
        );

        request.setWasteProcessedDate(
                LocalDateTime.now()
        );

        request.setWasteRemarks(
                dto.getRemarks()
        );

        request.setStatus(
                RequestStatus.WASTE_PROCESSED
        );

        Request savedRequest = reqRepo.save(request);

        return wasteMapper.toWasteDTO(savedRequest);
    }


    // ============================================================
    // UNASSIGN WASTE PARTNER
    // ============================================================

    @Override
    public WasteResponseDTO unassignWastePartner(
            Long requestId) {

        Request request = reqRepo.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Request not found with id: " + requestId
                        )
                );

        request.setWastePartner(null);

        request.setWasteAssignedDate(null);

        request.setWasteRemarks(null);

        request.setStatus(
                RequestStatus.MARKED_FOR_WASTE
        );

        Request savedRequest = reqRepo.save(request);

        return wasteMapper.toWasteDTO(savedRequest);
    }


    // ============================================================
    // WASTE HISTORY
    // ============================================================

    @Override
    public List<WasteResponseDTO> getWasteHistory() {

        return reqRepo
                .findByStatus(RequestStatus.WASTE_PROCESSED)
                .stream()
                .map(wasteMapper::toWasteDTO)
                .toList();
    }


    // ============================================================
    // REJECT WASTE PICKUP
    // ============================================================

    @Override
    public WasteResponseDTO rejectWastePickup(
            Long requestId,
            String remarks) {

        Request request = reqRepo.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Request not found with id: " + requestId
                        )
                );

        request.setWasteRemarks(remarks);

        request.setWastePartner(null);

        request.setWasteAssignedDate(null);

        request.setStatus(
                RequestStatus.MARKED_FOR_WASTE
        );

        Request savedRequest = reqRepo.save(request);

        return wasteMapper.toWasteDTO(savedRequest);
    }


    // ============================================================
    // GET PROCESSED WASTE
    // ============================================================

    @Override
    public List<WasteResponseDTO> getProcessedWaste() {

        return reqRepo
                .findByStatus(RequestStatus.WASTE_PROCESSED)
                .stream()
                .map(wasteMapper::toWasteDTO)
                .toList();
    }


    // ============================================================
    // GET PROCESSED WASTE BY ID
    // ============================================================

    @Override
    public WasteResponseDTO getProcessedWasteById(
            Long requestId) {

        Request request = reqRepo.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Request not found with id: " + requestId
                        )
                );

        if (request.getStatus() != RequestStatus.WASTE_PROCESSED) {

            throw new IllegalArgumentException(
                    "Waste is not processed yet."
            );
        }

        return wasteMapper.toWasteDTO(request);
    }
}

