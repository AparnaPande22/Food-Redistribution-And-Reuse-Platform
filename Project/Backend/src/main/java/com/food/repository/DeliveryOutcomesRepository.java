package com.food.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.DeliveryOutcomes;

import jakarta.transaction.Transactional;
@Repository
@Transactional
public interface DeliveryOutcomesRepository extends JpaRepository<DeliveryOutcomes, Long>{
    Optional<DeliveryOutcomes> findByDeliveryId(Long deliveryId);

}
