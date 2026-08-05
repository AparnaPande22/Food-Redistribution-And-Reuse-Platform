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

}
