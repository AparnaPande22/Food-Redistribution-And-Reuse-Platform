package com.food.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.UserDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.User;
import com.food.entities.UserStatus;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;

	@Override
	public String addNewUser(UserDTO request) {
		if (userRepo.existsByEmail(request.getEmail())) {
			return "Email already exists";
		}

		User user = new User();

		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPasswordHash(request.getPassword());
		user.setPhone(request.getPhone());
		user.setAccountType(request.getAccountType());
		user.setAddress(request.getAddress());
		user.setCity(request.getCity());
		user.setStatus(UserStatus.ACTIVE);

		userRepo.save(user);

		return "User added successfully";
	}

	@Override
	public User findById(Long id) {
		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
	}

	@Override
	public List<User> findAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public User findByEmail(String email) {
		return userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
	}

	@Override
	public String updateUser(Long id, UserDTO request) {
		User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPhone(request.getPhone());
		user.setAccountType(request.getAccountType());
		user.setAddress(request.getAddress());
		user.setCity(request.getCity());

		userRepo.save(user);

		return "User Updated Successfully";
	}

	@Override
	public String deleteUser(Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		userRepo.delete(user);
		return "User Deleted successfully";
	}

	@Override
	public String updateProfile(UserDTO request) {
		User user = userRepo.findByEmail(request.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		user.setName(request.getName());
		user.setPhone(request.getPhone());
		user.setAddress(request.getAddress());
		user.setCity(request.getCity());

		userRepo.save(user);

		return "Profile Updated Successfully";
	}

}
