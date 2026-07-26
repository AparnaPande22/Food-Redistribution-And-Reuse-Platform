package com.food.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.AdminDashboardDTO;
import com.food.DTO.RequestResponseDTO;
import com.food.DTO.UserDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.DeliveryStatus;
import com.food.entities.MatchStatus;
import com.food.entities.Matches;
import com.food.entities.Request;
import com.food.entities.RequestStatus;
import com.food.entities.User;
import com.food.entities.UserStatus;
import com.food.repository.DeliveryRepository;
import com.food.repository.MatchesRepository;
import com.food.repository.RequestRepository;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepo;
	private final RequestRepository reqRepo;
	private final MatchesRepository matchRepo;
	private final DeliveryRepository deliveryRepo;

	@Override
	public List<UserDTO> findPendingUsers(UserStatus status) {

		List<User> users = userRepo.findByStatus(UserStatus.PENDING);

		List<UserDTO> userDTO = new ArrayList<>();

		for (User user : users) {

			UserDTO dto = new UserDTO();

			dto.setName(user.getName());
			dto.setEmail(user.getEmail());
			dto.setPhone(user.getPhone());
			dto.setAccountType(user.getAccountType());
			dto.setAddress(user.getAddress());
			dto.setCity(user.getCity());
			dto.setPassword(user.getPasswordHash());
			dto.setStatus(user.getStatus());

			userDTO.add(dto);
		}

		return userDTO;
	}

	@Override
	public UserDTO approveUser(Long userId) {

		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

		user.setStatus(UserStatus.APPROVED);

		userRepo.save(user);

		UserDTO dto = new UserDTO();

		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getPhone());
		dto.setAccountType(user.getAccountType());
		dto.setAddress(user.getAddress());
		dto.setCity(user.getCity());
		dto.setPassword(user.getPasswordHash());
		dto.setStatus(user.getStatus());

		return dto;
	}

	@Override
	public UserDTO rejectUser(Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

		user.setStatus(UserStatus.REJECTED);

		userRepo.save(user);

		UserDTO dto = new UserDTO();

		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getPhone());
		dto.setAccountType(user.getAccountType());
		dto.setAddress(user.getAddress());
		dto.setCity(user.getCity());
		dto.setPassword(user.getPasswordHash());
		dto.setStatus(user.getStatus());

		return dto;
	}

	@Override
	public List<RequestResponseDTO> findPendingRequests() {
		List<Request> requests = reqRepo.findByStatus(RequestStatus.PENDING);

		List<RequestResponseDTO> requestList = new ArrayList<>();

		for (Request request : requests) {

			RequestResponseDTO dto = new RequestResponseDTO();

			request.setRequestType(dto.getRequestType());
			request.setStatus(dto.getStatus());
			request.setMealPreference(dto.getMealPreference());
			request.setEstimatedMeals(dto.getEstimatedMeals());
			request.setPickUpAddress(dto.getPickUpAddress());
			request.setDeliveryAvailable(dto.isDeliveryAvailable());
			request.setNeededBy(dto.getNeededBy());
			request.setNotes(dto.getNotes());
			request.setCreatedAt(LocalDateTime.now());

			requestList.add(dto);
		}

		return requestList;
	}

	@Override
	public RequestResponseDTO approveRequest(Long requestId) {
		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found"));

		request.setStatus(RequestStatus.APPROVED);

		reqRepo.save(request);

		RequestResponseDTO dto = new RequestResponseDTO();

		dto.setId(request.getId());
		dto.setRequestType(request.getRequestType());
		dto.setStatus(request.getStatus());
		dto.setMealPreference(request.getMealPreference());
		dto.setEstimatedMeals(request.getEstimatedMeals());
		dto.setNeededBy(request.getNeededBy());
		dto.setCreatedAt(request.getCreatedAt());
		dto.setNotes(request.getNotes());
		dto.setPickUpAddress(request.getPickUpAddress());

		return dto;
	}

	@Override
	public RequestResponseDTO rejectRequest(Long requestId) {
		Request request = reqRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found"));

		request.setStatus(RequestStatus.REJECTED);

		reqRepo.save(request);

		RequestResponseDTO dto = new RequestResponseDTO();

		dto.setId(request.getId());
		dto.setRequestType(request.getRequestType());
		dto.setStatus(request.getStatus());
		dto.setMealPreference(request.getMealPreference());
		dto.setEstimatedMeals(request.getEstimatedMeals());
		dto.setNeededBy(request.getNeededBy());
		dto.setCreatedAt(request.getCreatedAt());
		dto.setNotes(request.getNotes());
		dto.setPickUpAddress(request.getPickUpAddress());

		return dto;
	}

	@Override
	public List<Matches> getMatchingQueue() {
		return matchRepo.findByMatchStatus(MatchStatus.PENDING);
	}

	@Override
	public AdminDashboardDTO getAnalytics() {
		AdminDashboardDTO dto = new AdminDashboardDTO();

		dto.setTotalUsers(userRepo.count());

		dto.setPendingUsers(userRepo.countByStatus(UserStatus.PENDING));

		dto.setTotalRequests(reqRepo.count());

		dto.setPendingRequests(reqRepo.countByStatus(RequestStatus.PENDING));

		dto.setTotalMatches(matchRepo.count());

		dto.setTotalDeliveries(deliveryRepo.count());

		dto.setCompletedDeliveries(deliveryRepo.countByStatus(DeliveryStatus.COMPLETED));

		return dto;
	}

}
