package com.food.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.DTO.AssignDeliveryDTO;
import com.food.DTO.MatchDTO;
import com.food.DTO.MatchResponseDTO;
import com.food.DTO.NotificationDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.DeliveryStatus;
import com.food.entities.Deliveries;
import com.food.entities.MatchStatus;
import com.food.entities.Matches;
import com.food.entities.Request;
import com.food.entities.RequestStatus;
import com.food.entities.User;
import com.food.repository.DeliveryRepository;
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
	@Autowired
	private DeliveryRepository deliveryRepo;
	@Autowired
	private NotificationService notificationService;

	@Override
	public String createMatch(MatchDTO request) {
		Request donationRequest = requestRepo.findById(request.getDonationRequestId())
				.orElseThrow(() -> new ResourceNotFoundException("Donation Request not found"));

		Request receiverRequest = requestRepo.findById(request.getReceiverRequestId())
				.orElseThrow(() -> new ResourceNotFoundException("Receiver Request not found"));

		User matchedBy = userRepo.findById(request.getMatchedBy())
		        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

		Matches match = new Matches();

		match.setDonationRequest(donationRequest);
		match.setReceiverRequest(receiverRequest);
		match.setMatchedBy(matchedBy);
		match.setMatchStatus(MatchStatus.PENDING);
		match.setMatchedAt(LocalDateTime.now());

		matchRepo.save(match);

		// BUGFIX: previously neither request's status was ever updated, so a
		// donation would stay "ACTIVE" forever (never showing as MATCHED to
		// the donor) and would keep appearing in the receiver's "Browse Food"
		// list even after being claimed.
		donationRequest.setStatus(RequestStatus.MATCHED);
		receiverRequest.setStatus(RequestStatus.MATCHED);
		requestRepo.save(donationRequest);
		requestRepo.save(receiverRequest);

		// Notify the donor that someone wants their food, and notify the
		// receiver that their request was submitted successfully.
		safeNotify(donationRequest.getUser().getId(),
				"Your donation was requested",
				receiverRequest.getUser().getName() + " has requested your donation (\""
						+ donationRequest.getMealPreference() + "\"). It is now pending approval.",
				"MATCH");

		safeNotify(receiverRequest.getUser().getId(),
				"Food request sent",
				"Your request for \"" + donationRequest.getMealPreference()
						+ "\" has been matched with a donor and is pending approval.",
				"MATCH");

		return "Match Created Successfully";
	}

	@Override
	public MatchResponseDTO findById(Long id) {
		Matches match = matchRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));
		return toDTO(match);
	}

	@Override
	public List<MatchResponseDTO> findAllMatches() {
		return matchRepo.findAll().stream().map(this::toDTO).toList();
	}

	@Override
	public List<MatchResponseDTO> findPendingMatches() {
		return matchRepo.findByMatchStatus(MatchStatus.PENDING).stream().map(this::toDTO).toList();
	}

	@Override
	public List<MatchResponseDTO> findMatchesForUser(Long userId) {
		List<Matches> asDonor = matchRepo.findByDonationRequest_User_Id(userId);
		List<Matches> asReceiver = matchRepo.findByReceiverRequest_User_Id(userId);

		java.util.LinkedHashMap<Long, Matches> merged = new java.util.LinkedHashMap<>();
		asDonor.forEach(m -> merged.put(m.getId(), m));
		asReceiver.forEach(m -> merged.put(m.getId(), m));

		return merged.values().stream()
				.sorted((a, b) -> {
					LocalDateTime ta = a.getMatchedAt();
					LocalDateTime tb = b.getMatchedAt();
					if (ta == null || tb == null) return 0;
					return tb.compareTo(ta);
				})
				.map(this::toDTO)
				.toList();
	}

	@Override
	public String approveMatch(Long id) {

		Matches match = matchRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));

		match.setMatchStatus(MatchStatus.APPROVED);

		matchRepo.save(match);

		safeNotify(match.getDonationRequest().getUser().getId(), "Match approved",
				"Your match for \"" + match.getDonationRequest().getMealPreference()
						+ "\" has been approved. A volunteer will be assigned for pickup soon.",
				"MATCH");

		safeNotify(match.getReceiverRequest().getUser().getId(), "Match approved",
				"Your request for \"" + match.getDonationRequest().getMealPreference()
						+ "\" has been approved. A volunteer will be assigned for delivery soon.",
				"MATCH");

		return "Match Approved Successfully";
	}

	@Override
	public String rejectMatch(Long id) {
		Matches match = matchRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));

		match.setMatchStatus(MatchStatus.REJECTED);

		matchRepo.save(match);

		// BUGFIX: on rejection, re-open both requests so they can be matched
		// again instead of being stuck as MATCHED forever.
		Request donationRequest = match.getDonationRequest();
		Request receiverRequest = match.getReceiverRequest();

		donationRequest.setStatus(RequestStatus.ACTIVE);
		receiverRequest.setStatus(RequestStatus.ACTIVE);

		requestRepo.save(donationRequest);
		requestRepo.save(receiverRequest);

		safeNotify(receiverRequest.getUser().getId(), "Match rejected",
				"Your request for \"" + donationRequest.getMealPreference()
						+ "\" was rejected. The donation is available for other requests.",
				"MATCH");

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

		// BUGFIX: assigning a delivery partner on the Match never actually
		// created a Deliveries row, so the Volunteer Dashboard's
		// "/deliveries/assigned" call always came back empty. We now create
		// (or reuse, if one already exists) the actual Deliveries record.
		Deliveries delivery = deliveryRepo.findByMatch_Id(match.getId());

		if (delivery == null) {
			delivery = new Deliveries();
			delivery.setMatch(match);
		}

		delivery.setDeliveryPartner(deliveryPartner);
		delivery.setDeliveryMode("STANDARD");
		delivery.setStatus(DeliveryStatus.ASSIGNED);
		delivery.setPickupTime(LocalDateTime.now());

		deliveryRepo.save(delivery);

		safeNotify(deliveryPartner.getId(), "New delivery assigned",
				"You have been assigned to deliver \"" + match.getDonationRequest().getMealPreference()
						+ "\" from " + match.getDonationRequest().getUser().getName() + " to "
						+ match.getReceiverRequest().getUser().getName() + ".",
				"DELIVERY");

		return "Delivery Partner Assigned Successfully";
	}

	// ======================================================
	// HELPERS
	// ======================================================

	private void safeNotify(Long userId, String title, String message, String type) {
		try {
			NotificationDTO dto = new NotificationDTO();
			dto.setUserId(userId);
			dto.setTitle(title);
			dto.setMessage(message);
			dto.setType(type);
			notificationService.sendNotification(dto);
		} catch (Exception ex) {
			// Notifications should never break the core match/delivery flow.
			System.out.println("Notification failed: " + ex.getMessage());
		}
	}

	private MatchResponseDTO toDTO(Matches match) {
		MatchResponseDTO dto = new MatchResponseDTO();

		dto.setMatchId(match.getId());
		dto.setMatchStatus(match.getMatchStatus());
		dto.setMatchedAt(match.getMatchedAt());

		Request donationRequest = match.getDonationRequest();
		if (donationRequest != null) {
			dto.setDonationRequestId(donationRequest.getId());
			dto.setFoodType(donationRequest.getMealPreference());
			dto.setEstimatedMeals(donationRequest.getEstimatedMeals());
			dto.setPickupAddress(donationRequest.getPickUpAddress());

			User donor = donationRequest.getUser();
			if (donor != null) {
				dto.setDonorId(donor.getId());
				dto.setDonorName(donor.getName());
				dto.setDonorPhone(donor.getPhone());
			}
		}

		Request receiverRequest = match.getReceiverRequest();
		if (receiverRequest != null) {
			dto.setReceiverRequestId(receiverRequest.getId());
			dto.setReceiverAddress(receiverRequest.getPickUpAddress());

			User receiver = receiverRequest.getUser();
			if (receiver != null) {
				dto.setReceiverId(receiver.getId());
				dto.setReceiverName(receiver.getName());
				dto.setReceiverPhone(receiver.getPhone());
			}
		}

		User matchedBy = match.getMatchedBy();
		if (matchedBy != null) {
			dto.setMatchedById(matchedBy.getId());
			dto.setMatchedByName(matchedBy.getName());
		}

		User deliveryPartner = match.getDeliveryPartner();
		if (deliveryPartner != null) {
			dto.setDeliveryPartnerId(deliveryPartner.getId());
			dto.setDeliveryPartnerName(deliveryPartner.getName());
			dto.setDeliveryPartnerPhone(deliveryPartner.getPhone());
		}

		return dto;
	}

}
