package com.food.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.RequestResponseDTO;
import com.food.DTO.WasteAssignmentDTO;
import com.food.DTO.WasteProcessingDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Request;
import com.food.entities.RequestStatus;
import com.food.entities.Role;
import com.food.entities.User;
import com.food.mapper.RequestMapper;
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

	@Override
	public RequestResponseDTO markAsWaste(Long requestId) {

		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found"));

		request.setStatus(RequestStatus.MARKED_FOR_WASTE);
		Request saved = reqRepo.save(request);

		RequestResponseDTO dto = requestMapper.toRequestResponseDTO(saved);

		dto.setMessage("Waste partner assigned successfully.");

		return dto;
	}

	@Override
	public RequestResponseDTO assignWastePartner(WasteAssignmentDTO dto) {
		Request request = reqRepo.findById(dto.getRequestId())
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));

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

		RequestResponseDTO response = requestMapper.toRequestResponseDTO(saved);

		response.setMessage("Waste partner assigned successfully.");

		return response;
	}

	@Override
	public List<RequestResponseDTO> getWasteQueue() {

		List<Request> requests = reqRepo.findByStatus(RequestStatus.MARKED_FOR_WASTE);

		return requests.stream().map(requestMapper::toRequestResponseDTO).toList();
	}

	@Override
	public List<RequestResponseDTO> getAssignedWaste(Long partnerId) {

		User partner = userRepo.findById(partnerId)
				.orElseThrow(() -> new ResourceNotFoundException("Partner not found"));

		return reqRepo.findByWastePartner(partner).stream().map(requestMapper::toRequestResponseDTO).toList();
	}

	@Override
	public RequestResponseDTO processWaste(Long requestId, WasteProcessingDTO dto) {
		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));

		request.setBiogasGenerated(dto.getBiogasGenerated());
		request.setFertilizerGenerated(dto.getFertilizerGenerated());
		request.setWasteProcessedDate(LocalDateTime.now());
		request.setWasteRemarks(dto.getRemarks());
		request.setStatus(RequestStatus.WASTE_PROCESSED);

		Request saved = reqRepo.save(request);

		RequestResponseDTO response = requestMapper.toRequestResponseDTO(saved);

		response.setMessage("Waste processed successfully.");

		return response;
	}

}
