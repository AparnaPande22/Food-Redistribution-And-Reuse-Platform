package com.food.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.food.DTO.DeliveryDTO;
import com.food.DTO.DeliveryResponseDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Deliveries;
import com.food.entities.DeliveryStatus;
import com.food.entities.Matches;
import com.food.entities.Request;
import com.food.entities.User;
import com.food.repository.DeliveryRepository;
import com.food.repository.MatchesRepository;
import com.food.repository.UserRepository;
import com.food.security.CustomUserDetails;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DeliveryServiceImpl implements DeliveryService {
	@Autowired
	private MatchesRepository matchRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private DeliveryRepository deliveryRepo;

	@Override
	public String createDelivery(DeliveryDTO request) {
		Matches match = matchRepo.findById(request.getMatchId())
				.orElseThrow(() -> new ResourceNotFoundException("Match not found"));

		User partner = userRepo.findById(request.getDeliveryPartnerId())
				.orElseThrow(() -> new ResourceNotFoundException("Delivery Partner not found"));

		Deliveries delivery = deliveryRepo.findByMatch_Id(match.getId());
		if (delivery == null) {
			delivery = new Deliveries();
			delivery.setMatch(match);
		}

		delivery.setDeliveryPartner(partner);
		delivery.setStatus(DeliveryStatus.ASSIGNED);
		// BUGFIX: deliveryMode/pickupTime are required (NOT NULL) columns on
		// the entity but were never set here, which would throw a
		// validation error on save. Provide sensible defaults.
		delivery.setDeliveryMode("STANDARD");
		delivery.setPickupTime(LocalDateTime.now());

		deliveryRepo.save(delivery);

		// Keep the Match in sync with the delivery partner assignment.
		match.setDeliveryPartner(partner);
		matchRepo.save(match);

		return "Delivery Created Successfully";

	}

	@Override
	public DeliveryResponseDTO findById(Long id) {
		Deliveries delivery = deliveryRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));
		return toDTO(delivery);
	}

	@Override
	public List<DeliveryResponseDTO> findAssignedDeliveries() {

		Long currentUserId = getCurrentUserId();

		List<Deliveries> deliveries;

		if (currentUserId == null) {
			// No authenticated volunteer resolved (should not normally
			// happen since this endpoint requires ROLE_VOLUNTEER/ADMIN) -
			// fail safe by returning nothing rather than everyone's data.
			deliveries = Collections.emptyList();
		} else if (isAdmin()) {
			// Admins may still want to see everything currently assigned.
			deliveries = deliveryRepo.findByStatus(DeliveryStatus.ASSIGNED);
		} else {
			// BUGFIX: previously this returned every ASSIGNED delivery in
			// the whole system regardless of who was logged in. Now scoped
			// to the current volunteer's own deliveries (any status), so
			// their dashboard shows their active AND completed deliveries.
			deliveries = deliveryRepo.findByDeliveryPartner_Id(currentUserId);
		}

		return deliveries.stream().map(this::toDTO).toList();
	}

	@Override
	public String startDelivery(Long id) {
		Deliveries delivery = deliveryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

		delivery.setStatus(DeliveryStatus.IN_PROGRESS);

		deliveryRepo.save(delivery);

		return "Delivery Started";
	}

	@Override
	public String completeDelivery(Long id) {
		Deliveries delivery = deliveryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

		delivery.setStatus(DeliveryStatus.COMPLETED);
		delivery.setDeliveryTime(LocalDateTime.now());

		deliveryRepo.save(delivery);

		return "Delivery Completed Successfully";
	}

	@Override
	public DeliveryResponseDTO trackDelivery(Long id) {
		Deliveries delivery = deliveryRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));
		return toDTO(delivery);
	}

	// ======================================================
	// HELPERS
	// ======================================================

	private Long getCurrentUserId() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails)) {
			return null;
		}

		return ((CustomUserDetails) auth.getPrincipal()).getId();
	}

	private boolean isAdmin() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth == null) {
			return false;
		}

		return auth.getAuthorities().stream()
				.anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
	}

	private DeliveryResponseDTO toDTO(Deliveries delivery) {
		DeliveryResponseDTO dto = new DeliveryResponseDTO();

		dto.setDeliveryId(delivery.getId());
		dto.setStatus(delivery.getStatus());
		dto.setDeliveryMode(delivery.getDeliveryMode());
		dto.setPickupTime(delivery.getPickupTime());
		dto.setDeliveryTime(delivery.getDeliveryTime());

		Matches match = delivery.getMatch();
		if (match != null) {
			dto.setMatchId(match.getId());

			Request donationRequest = match.getDonationRequest();
			if (donationRequest != null) {
				dto.setDonationRequestId(donationRequest.getId());
				dto.setFoodType(donationRequest.getMealPreference());
				dto.setEstimatedMeals(donationRequest.getEstimatedMeals());
				dto.setPickupAddress(donationRequest.getPickUpAddress());

				User donor = donationRequest.getUser();
				if (donor != null) {
					dto.setDonorName(donor.getName());
					dto.setDonorPhone(donor.getPhone());
				}
			}

			Request receiverRequest = match.getReceiverRequest();
			if (receiverRequest != null) {
				dto.setReceiverRequestId(receiverRequest.getId());
				dto.setDeliveryAddress(receiverRequest.getPickUpAddress());

				User receiver = receiverRequest.getUser();
				if (receiver != null) {
					dto.setReceiverName(receiver.getName());
					dto.setReceiverPhone(receiver.getPhone());
				}
			}
		}

		User deliveryPartner = delivery.getDeliveryPartner();
		if (deliveryPartner != null) {
			dto.setDeliveryPartnerId(deliveryPartner.getId());
			dto.setDeliveryPartnerName(deliveryPartner.getName());
		}

		return dto;
	}

}
