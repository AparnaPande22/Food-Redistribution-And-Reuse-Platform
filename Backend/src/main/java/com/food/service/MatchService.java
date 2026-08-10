package com.food.service;

import java.util.List;

import com.food.DTO.AssignDeliveryDTO;
import com.food.DTO.MatchDTO;
import com.food.DTO.MatchResponseDTO;

public interface MatchService {
	// Create match
	public String createMatch(MatchDTO request);

	// find by id
	public MatchResponseDTO findById(Long id);

	//find all match
	public List<MatchResponseDTO> findAllMatches();

	//find pending match
	public List<MatchResponseDTO> findPendingMatches();

	// find every match belonging to a donor OR a receiver (used by
	// Donor Dashboard to show "which receiver wants this donation" and
	// by Receiver Dashboard to track their own requests' match status)
	public List<MatchResponseDTO> findMatchesForUser(Long userId);

	//approve match
	public String approveMatch(Long id);

	//reject match
	public String rejectMatch(Long id);

	//assigned delivery partner
	public String assignDeliveryPartner(Long matchId, AssignDeliveryDTO request);
}
