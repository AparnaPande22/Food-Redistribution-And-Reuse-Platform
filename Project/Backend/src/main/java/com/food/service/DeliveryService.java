package com.food.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.DTO.DeliveryDTO;
import com.food.entities.Deliveries;

public interface DeliveryService {
	// Create delivery
	public String createDelivery(DeliveryDTO request);

//Find by id
	public Deliveries findById(Long id);

//find the assigned delivery
	public List<Deliveries> findAssignedDeliveries();

//start delivery
	public String startDelivery(Long id);

//complete delivery
	public String completeDelivery(Long id);

//track delivery
	public Deliveries trackDelivery(Long id);
}
