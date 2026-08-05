package com.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.MatchStatus;
import com.food.entities.Matches;

import jakarta.transaction.Transactional;
@Repository
@Transactional
public interface MatchesRepository extends JpaRepository<Matches, Long> {
    List<Matches> findByMatchStatus(MatchStatus pending);
}
