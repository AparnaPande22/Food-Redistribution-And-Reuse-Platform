package com.food.service;

import java.util.List;

import com.food.DTO.NotificationDTO;
import com.food.entities.Notification;

public interface NotificationService {
	// send notification
	public String sendNotification(NotificationDTO request);

//get notification
	public List<Notification> getMyNotifications();

//mark as read
	public String markAsRead(Long id);
}
