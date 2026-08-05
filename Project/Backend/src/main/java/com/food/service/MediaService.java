package com.food.service;

import org.springframework.web.multipart.MultipartFile;

import com.food.entities.Media;
import com.food.entities.User;

public interface MediaService {
	//upload image
public String uploadImage(MultipartFile file,User user);
//find by id
public Media findById(Long id);
//delete image
public String deleteImage(Long id);

}
