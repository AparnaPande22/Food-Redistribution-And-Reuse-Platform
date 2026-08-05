package com.food.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.RequestDTO;
import com.food.DTO.RequestResponseDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Request;
import com.food.entities.RequestStatus;
import com.food.entities.User;
import com.food.repository.RequestRepository;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

	private final UserRepository userRepo;
	private final RequestRepository requestRepo;

	@Override
	public RequestResponseDTO addNewRequest(RequestDTO dto) {

		User user = userRepo.findById(dto.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		Request request = new Request();

		request.setRequestType(dto.getRequestType());
		request.setStatus(RequestStatus.DRAFT);
		request.setMealPreference(dto.getMealPreference());
		request.setEstimatedMeals(dto.getEstimatedMeals());
		request.setPickUpAddress(dto.getPickUpAddress());
		request.setDeliveryAvailable(dto.isDeliveryAvailable());
		request.setNeededBy(dto.getNeededBy());
		request.setNotes(dto.getNotes());
		request.setCreatedAt(LocalDateTime.now());
		request.setUser(user);

		// Save Request
		Request savedRequest = requestRepo.save(request);

		// Prepare Response DTO
		RequestResponseDTO response = new RequestResponseDTO();

		response.setId(savedRequest.getId());
		response.setRequestType(savedRequest.getRequestType());
		response.setStatus(savedRequest.getStatus());
		response.setMealPreference(savedRequest.getMealPreference());
		response.setEstimatedMeals(savedRequest.getEstimatedMeals());
		response.setPickUpAddress(savedRequest.getPickUpAddress());
		response.setDeliveryAvailable(savedRequest.isDeliveryAvailable());
		response.setNeededBy(savedRequest.getNeededBy());
		response.setNotes(savedRequest.getNotes());
		response.setCreatedAt(savedRequest.getCreatedAt());

		response.setMessage("Request created successfully");

		return response;
	}

	@Override
	public Request findById(Long id) {
		return requestRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Request not found"));
	}

	@Override
	public List<Request> findAllRequest() {
		return requestRepo.findAll();
	}

	@Override
	public String deleteById(Long id) {
		Request request = requestRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Request not found"));
		requestRepo.delete(request);
		return "Request Deleted Successfully";
	}

	@Override
	public List<Request> findByStatus(RequestStatus status) {
		return requestRepo.findByStatus(status);
	}

	@Override
	public List<Request> findMyRequest(Long userId) {
		return requestRepo.findByUserId(userId);
	}

	@Override
	public Request submitRequest(Long id) {
		Request request = requestRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found!"));
		request.setStatus(RequestStatus.SUBMITTED);
		return requestRepo.save(request);
	}

	@Override
	public Request cancelRequest(Long id) {
		Request request = requestRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found!"));
		request.setStatus(RequestStatus.CANCELLED);
		return requestRepo.save(request);
	}

	@Override
	public List<RequestResponseDTO> findRequestHistory(Long userId) {
		List<Request> requests = requestRepo.findByUserId(userId);

		return requests.stream().map(request -> {

			RequestResponseDTO dto = new RequestResponseDTO();

			dto.setId(request.getId());
			dto.setRequestType(request.getRequestType());
			dto.setStatus(request.getStatus());
			dto.setMealPreference(request.getMealPreference());
			dto.setEstimatedMeals(request.getEstimatedMeals());
			dto.setNeededBy(request.getNeededBy());
			dto.setCreatedAt(request.getCreatedAt());

			return dto;

		}).toList();
	}

	@Override
	public String updateRequest(Long id, RequestDTO dto) {
		Request request = requestRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found!!"));

		request.setRequestType(dto.getRequestType());
		request.setStatus(dto.getStatus());
		request.setMealPreference(dto.getMealPreference());
		request.setEstimatedMeals(dto.getEstimatedMeals());
		request.setPickUpAddress(dto.getPickUpAddress());
		request.setDeliveryAvailable(dto.isDeliveryAvailable());
		request.setNeededBy(dto.getNeededBy());
		request.setNotes(dto.getNotes());
		request.setCreatedAt(LocalDateTime.now());

		requestRepo.save(request);

		return "Request Updated Successfully!";
	}

}
