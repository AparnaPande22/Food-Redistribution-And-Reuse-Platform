package com.food.service;

import java.util.List;

import com.food.DTO.AdminDashboardDTO;
import com.food.DTO.RequestResponseDTO;
import com.food.DTO.UserDTO;
import com.food.entities.Matches;
import com.food.entities.UserStatus;

public interface AdminService {

	public List<UserDTO> findPendingUsers(UserStatus status);

	UserDTO approveUser(Long userId);

	UserDTO rejectUser(Long userId);

	List<RequestResponseDTO> findPendingRequests();

	RequestResponseDTO approveRequest(Long requestId);

	RequestResponseDTO rejectRequest(Long requestId);

	List<Matches> getMatchingQueue();

	AdminDashboardDTO getAnalytics();
}
