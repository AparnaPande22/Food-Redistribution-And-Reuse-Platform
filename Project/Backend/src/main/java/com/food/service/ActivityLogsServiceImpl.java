package com.food.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.Exception.ResourceNotFoundException;
import com.food.entities.ActivityLogs;
import com.food.repository.ActivityLogsRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ActivityLogsServiceImpl implements ActivityLogsService {
	@Autowired
	private ActivityLogsRepository activityRepo;

	@Override
	public List<ActivityLogs> findAll() {
		return activityRepo.findAll();
	}

	@Override
	public ActivityLogs findById(Long id) {
		return activityRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Activity Log not found"));
	}

	@Override
	public List<ActivityLogs> findByUser(Long userId) {
		return activityRepo.findByUserId(userId);
	}

}
