package com.food.security;

import java.util.List;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomJwtVerificationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Enable CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Disable CSRF
            .csrf(csrf -> csrf.disable())

            // Stateless Session
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Authorization
            .authorizeHttpRequests(request -> request

                    // Allow CORS Preflight
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                    // Public APIs
                    .requestMatchers(
                            "/api/auth/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**"
                    ).permitAll()

                    // ADMIN
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers("/api/users/**").hasRole("ADMIN")
                    .requestMatchers("/api/activity-logs/**").hasRole("ADMIN")
                    .requestMatchers("/api/documents/**").hasRole("ADMIN")

                    // DONOR
                    .requestMatchers("/api/donor/**").hasAnyRole("ADMIN","DONOR")
                    .requestMatchers("/api/media/**").hasAnyRole("ADMIN","DONOR")

                    // RECEIVER
                    .requestMatchers("/api/request/**")
                    .hasAnyRole("ADMIN","DONOR", "RECEIVER")

                    .requestMatchers("/api/request-item/**")
                    .hasAnyRole("ADMIN","RECEIVER")

                    // VOLUNTEER
                    .requestMatchers("/api/deliveries/**")
                    .hasAnyRole("ADMIN","VOLUNTEER")

                    // ADMIN + VOLUNTEER
                    .requestMatchers("/api/match/**")
                    .hasAnyRole("ADMIN", "VOLUNTEER")

                    // Authenticated Users
                    .requestMatchers("/api/notification/**").authenticated()
                    .requestMatchers("/api/dashboard/**").authenticated()
                    .requestMatchers("/api/delivery-outcomes/**").authenticated()

                    // Everything else
                    .anyRequest().authenticated()
            );

        // JWT Filter
        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173"));

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}