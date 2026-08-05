package com.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.Document;

import jakarta.transaction.Transactional;
@Repository
@Transactional
public interface DocumentRepository extends JpaRepository<Document, Long> {
	 List<Document> findByUserId(Long userId);
}
