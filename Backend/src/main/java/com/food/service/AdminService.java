package com.food.service;

import java.util.List;

import com.food.DTO.AdminDashboardDTO;
import com.food.DTO.AdminDonationDTO;
import com.food.DTO.RequestResponseDTO;
import com.food.DTO.UserSummaryDTO;
import com.food.entities.Matches;
import com.food.entities.UserStatus;

public interface AdminService {

List<UserSummaryDTO> findPendingUsers(UserStatus status);

UserSummaryDTO approveUser(Long userId);

UserSummaryDTO rejectUser(Long userId);

List<RequestResponseDTO> findPendingRequests();

RequestResponseDTO approveRequest(Long requestId);

RequestResponseDTO rejectRequest(Long requestId);

List<Matches> getMatchingQueue();

AdminDashboardDTO getAnalytics();

List<AdminDonationDTO> findAllDonations();

}