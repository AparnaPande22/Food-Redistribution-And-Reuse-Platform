package com.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.ActivityLogs;

import jakarta.transaction.Transactional;
@Repository
@Transactional
public interface ActivityLogsRepository extends JpaRepository<ActivityLogs, Long> {
	  List<ActivityLogs> findByUserId(Long userId);

}
