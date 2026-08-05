package com.food.service;

import java.util.List;

import com.food.entities.ActivityLogs;

public interface ActivityLogsService {
	public List<ActivityLogs> findAll();

	public ActivityLogs findById(Long id);
	
	public List<ActivityLogs> findByUser(Long userId);

}
