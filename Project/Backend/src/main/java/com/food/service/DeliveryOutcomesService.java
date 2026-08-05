package com.food.service;

import com.food.DTO.DeliveryOutcomeDTO;
import com.food.entities.DeliveryOutcomes;

public interface DeliveryOutcomesService {
	public String addOutcome(DeliveryOutcomeDTO request);

	public DeliveryOutcomes findByDelivery(Long deliveryId);
}
