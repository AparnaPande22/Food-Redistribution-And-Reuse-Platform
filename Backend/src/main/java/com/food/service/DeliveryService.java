package com.food.service;

import java.util.List;

import com.food.DTO.DeliveryDTO;
import com.food.DTO.DeliveryResponseDTO;

public interface DeliveryService {
	// Create delivery
	public String createDelivery(DeliveryDTO request);

	//Find by id
	public DeliveryResponseDTO findById(Long id);

	//find the assigned delivery (for the CURRENTLY LOGGED IN volunteer)
	public List<DeliveryResponseDTO> findAssignedDeliveries();

	//start delivery
	public String startDelivery(Long id);

	//complete delivery
	public String completeDelivery(Long id);

	//track delivery
	public DeliveryResponseDTO trackDelivery(Long id);
}
