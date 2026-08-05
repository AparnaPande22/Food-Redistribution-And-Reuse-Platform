package com.food.service;

import java.util.List;

import com.food.DTO.UserDTO;
import com.food.entities.User;

public interface UserService {
//add new user
	public String addNewUser(UserDTO request);

//find by id
	public User findById(Long id);

//find all users
	public List<User> findAllUsers();

//find by email
	public User findByEmail(String email);

//update user
	public String updateUser(Long id, UserDTO request);

//delete user
	public String deleteUser(Long id);

//update profile
	String updateProfile(UserDTO request);
}
