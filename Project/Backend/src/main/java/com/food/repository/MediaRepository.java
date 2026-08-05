package com.food.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.Media;

import jakarta.transaction.Transactional;
@Repository
@Transactional
public interface MediaRepository extends JpaRepository<Media,Long>{

}
