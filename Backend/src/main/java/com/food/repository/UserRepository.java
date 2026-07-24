package com.food.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.DeliveryStatus;
import com.food.entities.Role;
import com.food.entities.User;
import com.food.entities.UserStatus;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);

	long countByStatus(UserStatus status);

	long countByAccountType(Role accountType);

	public List<User> findByStatus(UserStatus status);

}
