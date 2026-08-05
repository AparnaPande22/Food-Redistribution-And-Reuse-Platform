package com.food.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.DTO.NotificationDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Notification;
import com.food.entities.User;
import com.food.repository.NotificationRepository;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class NotificationServiceImpl implements NotificationService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private NotificationRepository notificationRepo;

	@Override
	public String sendNotification(NotificationDTO request) {
		User user = userRepo.findById(request.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		Notification notification = new Notification();

		notification.setUser(user);
		notification.setTitle(request.getTitle());
		notification.setMessage(request.getMessage());
		notification.setTitle(request.getTitle());
		notification.setRead(false);

		notificationRepo.save(notification);

		return "Notification Sent Successfully";
	}

	@Override
	public List<Notification> getMyNotifications() {
		return notificationRepo.findAll();

	}

	@Override
	public String markAsRead(Long id) {
		Notification notification = notificationRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

		notification.setRead(true);

		notificationRepo.save(notification);

		return "Notification Marked As Read";
	}

}
