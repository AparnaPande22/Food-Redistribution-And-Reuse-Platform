package com.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.MatchStatus;
import com.food.entities.Matches;

import jakarta.transaction.Transactional;
@Repository
@Transactional
public interface MatchesRepository extends JpaRepository<Matches, Long> {
    List<Matches> findByMatchStatus(MatchStatus pending);

    // Matches where the given user is the donor on the donation side
    List<Matches> findByDonationRequest_User_Id(Long donorUserId);

    // Matches where the given user is the receiver on the receiver side
    List<Matches> findByReceiverRequest_User_Id(Long receiverUserId);

    // Matches assigned to a given delivery/volunteer partner
    List<Matches> findByDeliveryPartner_Id(Long deliveryPartnerId);

    List<Matches> findByDonationRequest_Id(Long donationRequestId);

    List<Matches> findByReceiverRequest_Id(Long receiverRequestId);
}
