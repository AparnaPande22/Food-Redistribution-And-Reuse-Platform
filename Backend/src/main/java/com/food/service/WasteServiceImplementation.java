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
import com.food.mapper.RequestMapper;
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
	private final RequestMapper requestMapper;
	private final WasteMapper wasteMapper;

	@Override
	public WasteResponseDTO markAsWaste(Long requestId) {

		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found"));

		if (request.getStatus() != RequestStatus.REJECTED && request.getStatus() != RequestStatus.EXPIRED
				&& request.getStatus() != RequestStatus.MATCH_FAILED) {

			throw new IllegalArgumentException("Only rejected or expired donations can be marked as waste.");
		}

		request.setStatus(RequestStatus.MARKED_FOR_WASTE);
		Request saved = reqRepo.save(request);

		WasteResponseDTO dto = wasteMapper.toWasteDTO(saved);
		return dto;
	}

	@Override
	public WasteResponseDTO assignWastePartner(WasteAssignmentDTO dto) {
		Request request = reqRepo.findById(dto.getRequestId())
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));

		if (request.getStatus() != RequestStatus.MARKED_FOR_WASTE) {
			throw new IllegalArgumentException("Only requests marked for waste can be assigned to a waste partner.");
		}

		User partner = userRepo.findById(dto.getWastePartnerId())
				.orElseThrow(() -> new ResourceNotFoundException("Waste Partner not found"));

		if (partner.getAccountType() != Role.BIOGAS_PARTNER) {
			throw new IllegalArgumentException("User is not a Waste Partner");
		}

		request.setWastePartner(partner);
		request.setWasteAssignedDate(LocalDateTime.now());
		request.setWasteRemarks(dto.getRemarks());
		request.setStatus(RequestStatus.WASTE_ASSIGNED);

		Request saved = reqRepo.save(request);

		return wasteMapper.toWasteDTO(saved);
	}

	@Override
	public List<WasteResponseDTO> getWasteQueue() {

		List<Request> requests = reqRepo.findByStatus(RequestStatus.MARKED_FOR_WASTE);

		return requests.stream().map(wasteMapper::toWasteDTO).toList();
	}

	@Override
	public List<WasteResponseDTO> getAssignedWaste(Long partnerId) {

		User partner = userRepo.findById(partnerId)
				.orElseThrow(() -> new ResourceNotFoundException("Partner not found"));

		return reqRepo.findByWastePartner(partner).stream().map(wasteMapper::toWasteDTO).toList();
	}

	@Override
	public WasteResponseDTO processWaste(Long requestId, WasteProcessingDTO dto) {
		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));

		request.setBiogasGenerated(dto.getBiogasGenerated());
		request.setFertilizerGenerated(dto.getFertilizerGenerated());
		request.setWasteProcessedDate(LocalDateTime.now());
		request.setWasteRemarks(dto.getRemarks());
		request.setStatus(RequestStatus.WASTE_PROCESSED);

		Request saved = reqRepo.save(request);

		return wasteMapper.toWasteDTO(saved);
	}

	@Override
	public WasteResponseDTO unassignWastePartner(Long requestId) {

		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));

		request.setWastePartner(null);
		request.setWasteAssignedDate(null);
		request.setWasteRemarks(null);
		request.setStatus(RequestStatus.MARKED_FOR_WASTE);

		Request saved = reqRepo.save(request);

		return wasteMapper.toWasteDTO(saved);
	}

	@Override
	public List<WasteResponseDTO> getWasteHistory() {

		return reqRepo.findByStatus(RequestStatus.WASTE_PROCESSED).stream().map(wasteMapper::toWasteDTO).toList();
	}

	@Override
	public WasteResponseDTO rejectWastePickup(Long requestId, String remarks) {

		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));

		request.setWasteRemarks(remarks);
		request.setStatus(RequestStatus.MARKED_FOR_WASTE);
		request.setWastePartner(null);

		Request saved = reqRepo.save(request);

		return wasteMapper.toWasteDTO(saved);
	}

	@Override
	public List<WasteResponseDTO> getProcessedWaste() {
		return reqRepo.findByStatus(RequestStatus.WASTE_PROCESSED).stream().map(wasteMapper::toWasteDTO).toList();
	}

	@Override
	public WasteResponseDTO getProcessedWasteById(Long requestId) {

		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));

		if (request.getStatus() != RequestStatus.WASTE_PROCESSED) {
			throw new IllegalArgumentException("Waste is not processed yet");
		}

		return wasteMapper.toWasteDTO(request);
	}
}
