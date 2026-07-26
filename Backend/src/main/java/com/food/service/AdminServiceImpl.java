package com.food.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.UserDTO;
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
	public List<UserDTO> findPendingUsers(UserStatus status) {

		List<User> users = userRepo.findByStatus(UserStatus.PENDING);

		List<UserDTO> userDTO = new ArrayList<>();

		for (User user : users) {

			UserDTO dto = new UserDTO();

			dto.setName(user.getName());
			dto.setEmail(user.getEmail());
			dto.setPhone(user.getPhone());
			dto.setAccountType(user.getAccountType());
			dto.setAddress(dto.getAddress());
			dto.setCity(user.getCity());

			userDTO.add(dto);
		}

		return userDTO;
	}
}
