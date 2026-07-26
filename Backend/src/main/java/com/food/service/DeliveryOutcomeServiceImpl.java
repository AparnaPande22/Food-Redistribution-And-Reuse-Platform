package com.food.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.DTO.DeliveryDTO;
import com.food.DTO.DeliveryOutcomeDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Deliveries;
import com.food.entities.DeliveryOutcomes;
import com.food.repository.DeliveryRepository;
import com.food.repository.DeliveryOutcomesRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DeliveryOutcomeServiceImpl implements DeliveryOutcomesService {
	@Autowired
	private DeliveryRepository deliveriesRepo;
	@Autowired
	private DeliveryOutcomesRepository deliveryOutcomeRepo;

	@Override
	public String addOutcome(DeliveryOutcomeDTO request) {
		Deliveries delivery = deliveriesRepo.findById(request.getDeliveryId())
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

		DeliveryOutcomes outcome = new DeliveryOutcomes();

		outcome.setDelivery(delivery);
		outcome.setOutcome(request.getOutcome());
		outcome.setRemark(request.getRemarks());
		outcome.setCreatedAt(LocalDateTime.now());

		deliveryOutcomeRepo.save(outcome);

		return "Delivery Outcome Added Successfully";
	}

	@Override
	public DeliveryOutcomes findByDelivery(Long deliveryId) {
		return deliveryOutcomeRepo.findByDeliveryId(deliveryId)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery Outcome not found"));
	}

}
