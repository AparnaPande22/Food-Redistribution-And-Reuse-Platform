
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
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            // ==================================================
            // CORS
            // ==================================================
            .cors(cors ->
                cors.configurationSource(
                    corsConfigurationSource()
                )
            )

            // ==================================================
            // CSRF
            // ==================================================
            .csrf(csrf ->
                csrf.disable()
            )

            // ==================================================
            // STATELESS SESSION
            // ==================================================
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // ==================================================
            // AUTHORIZATION
            // ==================================================
            .authorizeHttpRequests(request -> request

                // --------------------------------------------------
                // CORS PREFLIGHT
                // --------------------------------------------------
                .requestMatchers(
                    HttpMethod.OPTIONS,
                    "/**"
                ).permitAll()

                // --------------------------------------------------
                // PUBLIC AUTH APIs
                // --------------------------------------------------
                .requestMatchers(
                    "/api/auth/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                ).permitAll()

                // ==================================================
                // ADMIN
                // ==================================================
                .requestMatchers(
                    "/api/admin/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    "/api/users/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    "/api/activity-logs/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    "/api/documents/**"
                ).hasRole("ADMIN")

                // ==================================================
                // DONOR
                // ==================================================
                .requestMatchers(
                    "/api/donor/**"
                ).hasAnyRole(
                    "ADMIN",
                    "DONOR"
                )

                .requestMatchers(
                    "/api/media/**"
                ).hasAnyRole(
                    "ADMIN",
                    "DONOR"
                )

                // ==================================================
                // REQUESTS
                // IMPORTANT:
                // Controller = /api/requests/**
                // ==================================================
                .requestMatchers(
                    "/api/requests/**"
                ).hasAnyRole(
                    "ADMIN",
                    "DONOR",
                    "RECEIVER",
                    "BIOGAS_PARTNER"
                )

                // ==================================================
                // REQUEST ITEM
                // ==================================================
                .requestMatchers(
                    "/api/request-item/**"
                ).hasAnyRole(
                    "ADMIN",
                    "RECEIVER"
                )

                // ==================================================
                // VOLUNTEER
                // ==================================================
                .requestMatchers(
                    "/api/deliveries/**"
                ).hasAnyRole(
                    "ADMIN",
                    "VOLUNTEER"
                )

                .requestMatchers(
                    "/api/match/**"
                ).hasAnyRole(
                    "ADMIN",
                    "VOLUNTEER",
                    "RECEIVER"
                )

                // ==================================================
                // BIOGAS
                // ==================================================
                .requestMatchers(
                    "/api/waste/**"
                ).hasAnyRole(
                    "ADMIN",
                    "BIOGAS_PARTNER"
                )

                // ==================================================
                // DASHBOARD
                // ==================================================
                .requestMatchers(
                    "/api/dashboard/**"
                ).authenticated()

                // ==================================================
                // NOTIFICATION
                // ==================================================
                .requestMatchers(
                    "/api/notification/**"
                ).authenticated()

                // ==================================================
                // DELIVERY OUTCOME
                // ==================================================
                .requestMatchers(
                    "/api/delivery-outcomes/**"
                ).authenticated()

                // ==================================================
                // EVERYTHING ELSE
                // ==================================================
                .anyRequest().authenticated()
            )

            // ==================================================
            // JWT FILTER
            // ==================================================
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    // ======================================================
    // CORS CONFIGURATION
    // ======================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
            new CorsConfiguration();

        configuration.setAllowedOriginPatterns(
            List.of(
                "http://localhost:5173",
                "http://localhost:5174"
            )
        );

        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            )
        );

        configuration.setAllowedHeaders(
            List.of("*")
        );

        configuration.setExposedHeaders(
            List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }

    // ======================================================
    // PASSWORD ENCODER
    // ======================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // ======================================================
    // AUTHENTICATION MANAGER
    // ======================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config)
            throws Exception {

        return config.getAuthenticationManager();
    }
}

