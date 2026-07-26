package com.food.service;

import java.util.List;

import com.food.DTO.UserDTO;
import com.food.entities.UserStatus;

public interface AdminService {

	public List<UserDTO> findPendingUsers(UserStatus status);

}
