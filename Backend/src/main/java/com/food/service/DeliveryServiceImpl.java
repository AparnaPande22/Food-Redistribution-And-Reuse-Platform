package com.food.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.DTO.DeliveryDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Deliveries;
import com.food.entities.DeliveryStatus;
import com.food.entities.Matches;
import com.food.entities.User;
import com.food.repository.DeliveryRepository;
import com.food.repository.MatchesRepository;
import com.food.repository.UserRepository;

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

		Deliveries delivery = new Deliveries();

		delivery.setMatch(match);
		delivery.setDeliveryPartner(partner);
		delivery.setStatus(DeliveryStatus.ASSIGNED);
		deliveryRepo.save(delivery);

		return "Delivery Created Successfully";

	}

	@Override
	public Deliveries findById(Long id) {
		return deliveryRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));
	}

	@Override
	public List<Deliveries> findAssignedDeliveries() {
		return deliveryRepo.findByStatus(DeliveryStatus.ASSIGNED);
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

		deliveryRepo.save(delivery);

		return "Delivery Completed Successfully";
	}

	@Override
	public Deliveries trackDelivery(Long id) {
		return deliveryRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));
	}

}
