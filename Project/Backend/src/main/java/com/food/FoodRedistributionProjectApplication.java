package com.food;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodRedistributionProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodRedistributionProjectApplication.class, args);
	}

	ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)
				.setPropertyCondition(Conditions.isNotNull());
		return modelMapper;
	}
}

//Optional<User> findByEmail(String email); //This is for log in

//boolean existsByEmail(String email);    /This is for register