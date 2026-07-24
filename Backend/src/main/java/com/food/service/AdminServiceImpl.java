package com.food.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.food.entities.User;
import com.food.entities.UserStatus;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepo;

	@Override
	public List<User> findPendingUsers(UserStatus status) {
		return userRepo.findByStatus(UserStatus.PENDING);
	}
}
