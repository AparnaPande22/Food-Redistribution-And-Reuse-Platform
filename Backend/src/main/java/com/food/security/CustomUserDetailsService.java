package com.food.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.food.entities.User;
import com.food.repository.UserRepository;

import lombok.RequiredArgsConstructor;
//2
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
//used to access the database
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(username) // searches the database
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

		return new CustomUserDetails(user);
	}

}

