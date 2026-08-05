package com.food.service;

import java.util.List;

import com.food.DTO.AssignDeliveryDTO;
import com.food.DTO.MatchDTO;
import com.food.entities.Matches;

public interface MatchService {
	// Create match
	public String createMatch(MatchDTO request);

	// find by id
	public Matches findById(Long id);

//find all match 
	public List<Matches> findAllMatches();

//find pending match
	public List<Matches> findPendingMatches();

//approve match
	public String approveMatch(Long id);

//reject match
	public String rejectMatch(Long id);

//assigned delivery partner
	public String assignDeliveryPartner(Long matchId, AssignDeliveryDTO request);
}
