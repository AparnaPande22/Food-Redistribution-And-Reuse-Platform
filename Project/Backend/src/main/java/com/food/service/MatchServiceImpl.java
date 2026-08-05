package com.food.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.DTO.AssignDeliveryDTO;
import com.food.DTO.MatchDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.MatchStatus;
import com.food.entities.Matches;
import com.food.entities.Request;
import com.food.entities.Status;
import com.food.entities.User;
import com.food.repository.MatchesRepository;
import com.food.repository.RequestRepository;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MatchServiceImpl implements MatchService {
	@Autowired
	private MatchesRepository matchRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RequestRepository requestRepo;

	@Override
	public String createMatch(MatchDTO request) {
		Request donationRequest = requestRepo.findById(request.getDonationRequestId())
				.orElseThrow(() -> new ResourceNotFoundException("Donation Request not found"));

		Request receiverRequest = requestRepo.findById(request.getReceiverRequestId())
				.orElseThrow(() -> new ResourceNotFoundException("Receiver Request not found"));

		User admin = userRepo.findById(request.getMatchedBy())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		Matches match = new Matches();

		match.setDonationRequest(donationRequest);
		match.setReceiverRequest(receiverRequest);
		match.setMatchedBy(admin);
		match.setMatchStatus(MatchStatus.PENDING);
		match.setMatchedAt(LocalDateTime.now());

		matchRepo.save(match);

		return "Match Created Successfully";
	}

	@Override
	public Matches findById(Long id) {
		return matchRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));
	}

	@Override
	public List<Matches> findAllMatches() {

		return matchRepo.findAll();
	}

	@Override
	public List<Matches> findPendingMatches() {
		return matchRepo.findByMatchStatus(MatchStatus.PENDING);
	}

	@Override
	public String approveMatch(Long id) {

		Matches match = matchRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));

		match.setMatchStatus(MatchStatus.APPROVED);

		matchRepo.save(match);

		return "Match Approved Successfully";
	}

	@Override
	public String rejectMatch(Long id) {
		Matches match = matchRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));

		match.setMatchStatus(MatchStatus.REJECTED);

		matchRepo.save(match);

		return "Match Rejected Successfully";
	}

	@Override
	public String assignDeliveryPartner(Long matchId, AssignDeliveryDTO request) {
		Matches match = matchRepo.findById(matchId).orElseThrow(() -> new ResourceNotFoundException("Match not found"));

		User deliveryPartner = userRepo.findById(request.getDeliveryPartnerId())
				.orElseThrow(() -> new ResourceNotFoundException("Delivery Partner not found"));

		match.setDeliveryPartner(deliveryPartner);

		match.setMatchStatus(MatchStatus.ASSIGNED);

		matchRepo.save(match);

		return "Delivery Partner Assigned Successfully";
	}

}
