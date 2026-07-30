package com.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.food.entities.Request;
import com.food.entities.RequestStatus;
import com.food.entities.User;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface RequestRepository extends JpaRepository<Request, Long> {

	public List<Request> findByStatus(RequestStatus status);

	public List<Request> findByUserId(Long userId);

	Long countByStatus(RequestStatus status);

	Long countByUser_Id(Long userId);

	Long countByUser_IdAndStatus(Long userId, RequestStatus status);

	@Query("""
			SELECT MONTH(r.createdAt),
			       COUNT(r)
			FROM Request r
			WHERE r.requestType = 'DONATION'
			GROUP BY MONTH(r.createdAt)
			ORDER BY MONTH(r.createdAt)
			""")
	List<Object[]> getMonthlyDonations();

	List<Request> findByWastePartner(User wastePartner);

}
