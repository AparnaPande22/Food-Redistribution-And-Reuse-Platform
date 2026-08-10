package com.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.Deliveries;
import com.food.entities.DeliveryStatus;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface DeliveryRepository extends JpaRepository<Deliveries, Long> {
	List<Deliveries> findByStatus(DeliveryStatus assigned);


	Long countByStatus(DeliveryStatus completed);

	// BUGFIX: deliveries belonging to one specific volunteer
	// (previously the dashboard queried ALL assigned deliveries for
	// every volunteer, not just the logged-in one).
	List<Deliveries> findByDeliveryPartner_Id(Long deliveryPartnerId);

	List<Deliveries> findByDeliveryPartner_IdAndStatus(Long deliveryPartnerId, DeliveryStatus status);

	Deliveries findByMatch_Id(Long matchId);

}
