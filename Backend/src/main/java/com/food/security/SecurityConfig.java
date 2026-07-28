package com.food.security;
import java.util.List;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

//4
@Configuration // Declares this class as Spring Configuration
@EnableWebSecurity // Enables Spring Security customization
@EnableMethodSecurity // Enables method-level security
@RequiredArgsConstructor
public class SecurityConfig {

	private final CustomJwtVerificationFilter jwtAuthenticationFilter;

	// Configure Spring Security Filter Chain
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

<<<<<<< HEAD
		// 1. Disable CSRF protection (REST APIs are stateless)
		http.csrf(csrf -> csrf.disable());

		// 2. Make application stateless (No HttpSession)
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
=======
        // 1. Disable CSRF protection (REST APIs are stateless)
    	http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable());
        // 2. Make application stateless (No HttpSession)
        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
>>>>>>> a135977 (Fix create donation bugs)

		// 3. Configure Authorization Rules
		http.authorizeHttpRequests(request ->

<<<<<<< HEAD
		request

				// Public Endpoints
				.requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html")

				.permitAll()
				// Only ADMIN can access admin APIs
				.requestMatchers("/api/users/**").hasRole("ADMIN")
				.requestMatchers("/api/match/**").hasRole("ADMIN")
				.requestMatchers("/api/documents/**").hasRole("ADMIN")
				.requestMatchers("/api/activity-logs/**").hasRole("ADMIN")
				.requestMatchers("/api/request/**").hasRole("ADMIN")

				// Only DONOR can create donation
				.requestMatchers("/api/donor/**").hasRole("DONOR")
=======
            request
            .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
            // Public Endpoints
            .requestMatchers(
                    "/api/auth/**",
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/swagger-ui.html"
            ).permitAll()

            // ADMIN
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/users/**").hasRole("ADMIN")
            .requestMatchers("/api/activity-logs/**").hasRole("ADMIN")
            .requestMatchers("/api/documents/**").hasRole("ADMIN")

            // DONOR
            .requestMatchers("/api/media/**").hasRole("DONOR")

            // RECEIVER
            .requestMatchers("/api/request/**")
            .hasAnyRole("DONOR","RECEIVER")
            .requestMatchers("/api/request-item/**").hasRole("RECEIVER")

            // VOLUNTEER
            .requestMatchers("/api/deliveries/**").hasRole("VOLUNTEER")

            // ADMIN + VOLUNTEER
            .requestMatchers("/api/match/**")
            .hasAnyRole("ADMIN","VOLUNTEER")

            // Any logged-in user
            .requestMatchers("/api/notification/**").authenticated()
            .requestMatchers("/api/dashboard/**").authenticated()

            // Review this controller
            .requestMatchers("/api/delivery-outcomes/**").authenticated()

            .anyRequest().authenticated()
        );
>>>>>>> a135977 (Fix create donation bugs)

				// Only RECEIVER can create food requests
				.requestMatchers("/api/request/**").hasRole("RECEIVER")
				.requestMatchers("/api/request-item/**").hasRole("RECEIVER")

				// Only VOLUNTEER can update delivery status
				.requestMatchers("/api/media/**").hasRole("VOLUNTEER")

				// All authenticated users
				.requestMatchers("/api/notification/**").authenticated()

<<<<<<< HEAD
				// All remaining requests require authentication
				.anyRequest().authenticated());

		// 4. Add JWT Filter before UsernamePasswordAuthenticationFilter
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// Configure Password Encoder
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// Configure AuthenticationManager
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

		return config.getAuthenticationManager();
	}
=======
        return config.getAuthenticationManager();
    }
    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
>>>>>>> a135977 (Fix create donation bugs)
}