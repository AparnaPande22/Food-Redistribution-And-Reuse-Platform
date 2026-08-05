package com.food.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase.Replace;

import com.food.entities.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class TestUserRepository {

	@Autowired
	private UserRepository userRepo;

	@Test
	void findByEmail() {
		User user = new User();
		user.setEmail("abc@gmail.com");
		user.setName("John");

		userRepo.save(user);

		Optional<User> found = userRepo.findByEmail("abc@gmail.com");

		assertTrue(found.isPresent());
		assertNotNull(found);
		assertEquals("John", found.get().getName());
		assertEquals("abc@gmail.com", found.get().getEmail());

		System.out.println(found);
		System.out.println("Test executed successfully");
	}
}
