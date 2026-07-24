package com.food.service;

import java.util.List;

import com.food.entities.User;
import com.food.entities.UserStatus;

public interface AdminService {

	public List<User> findPendingUsers(UserStatus status);

}
