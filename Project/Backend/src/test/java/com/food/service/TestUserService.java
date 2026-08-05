package com.food.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.food.entities.User;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
public class TestUserService {
	@Autowired
	UserService service;

	@Autowired
	UserRepository repo;

	@Test
	void testFindById() {

		User user = new User();
		user.setName("Aparna");

		User saved = repo.save(user);

		User found = service.findById(saved.getId());

		assertEquals(saved.getId(), found.getId());
		assertEquals("Aparna", found.getName());
	}
}
