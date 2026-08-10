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
        // STATELESS
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

            // ------------------------------------------------
            // CORS PREFLIGHT
            // ------------------------------------------------
            .requestMatchers(
                HttpMethod.OPTIONS,
                "/**"
            ).permitAll()

            // ------------------------------------------------
            // PUBLIC
            // ------------------------------------------------
            .requestMatchers(
                "/api/auth/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/v3/api-docs/**"
            ).permitAll()

            // =================================================
            // ADMIN ONLY
            // =================================================

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

            // =================================================
            // DONOR
            // =================================================

            .requestMatchers(
                "/api/donor/**"
            ).hasAnyRole(
                "DONOR",
                "ADMIN"
            )

            .requestMatchers(
                "/api/media/**"
            ).hasAnyRole(
                "DONOR",
                "ADMIN"
            )

            // =================================================
            // REQUESTS
            // =================================================

            .requestMatchers(
                HttpMethod.GET,
                "/api/requests/active"
            ).hasAnyRole(
                "RECEIVER",
                "ADMIN"
            )

            .requestMatchers(
                "/api/requests/**"
            ).hasAnyRole(
                "DONOR",
                "RECEIVER",
                "ADMIN"
            )

            // =================================================
            // REQUEST ITEMS
            // =================================================

            .requestMatchers(
                "/api/request-item/**"
            ).hasAnyRole(
                "DONOR",
                "RECEIVER",
                "ADMIN"
            )

            // =================================================
            // MATCHING
            // =================================================

            // Admin approves/rejects and assigns
            .requestMatchers(
                "/api/match/*/approve",
                "/api/match/*/reject",
                "/api/match/*/assign-delivery"
            ).hasRole("ADMIN")

            // Receiver can create/view their matching requests
            .requestMatchers(
                HttpMethod.POST,
                "/api/match/**"
            ).hasAnyRole(
                "RECEIVER",
                "ADMIN"
            )

            .requestMatchers(
                HttpMethod.GET,
                "/api/match/**"
            ).hasAnyRole(
                "RECEIVER",
                "VOLUNTEER",
                "ADMIN"
            )

            // =================================================
            // DELIVERIES
            // =================================================

            .requestMatchers(
                "/api/deliveries/**"
            ).hasAnyRole(
                "VOLUNTEER",
                "ADMIN"
            )

            // =================================================
            // WASTE / INDUSTRY
            // =================================================

            .requestMatchers(
                "/api/waste/**"
            ).hasAnyRole(
                "BIOGAS_PARTNER",
                "ADMIN"
            )

            // =================================================
            // DASHBOARDS
            // =================================================

            .requestMatchers(
                "/api/dashboard/admin/**"
            ).hasRole("ADMIN")

            .requestMatchers(
                "/api/dashboard/donor/**"
            ).hasAnyRole(
                "DONOR",
                "ADMIN"
            )

            .requestMatchers(
                "/api/dashboard/receiver/**"
            ).hasAnyRole(
                "RECEIVER",
                "ADMIN"
            )

            .requestMatchers(
                "/api/dashboard/volunteer/**"
            ).hasAnyRole(
                "VOLUNTEER",
                "ADMIN"
            )

            .requestMatchers(
                "/api/dashboard/waste-dashboard/**"
            ).hasAnyRole(
                "BIOGAS_PARTNER",
                "ADMIN"
            )

            .requestMatchers(
                "/api/dashboard/impact",
                "/api/dashboard/statistics"
            ).hasAnyRole(
                "ADMIN",
                "DONOR",
                "RECEIVER",
                "VOLUNTEER",
                "BIOGAS_PARTNER"
            )

            // =================================================
            // NOTIFICATIONS
            // =================================================

            .requestMatchers(
                "/api/notification/**"
            ).authenticated()

            // =================================================
            // DELIVERY OUTCOME
            // =================================================

            .requestMatchers(
                "/api/delivery-outcomes/**"
            ).hasAnyRole(
                "VOLUNTEER",
                "ADMIN"
            )

            // =================================================
            // EVERYTHING ELSE
            // =================================================

            .anyRequest().authenticated()
        )

        // ==================================================
        // JWT
        // ==================================================

        .addFilterBefore(
            jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class
        );

    return http.build();
}

// ======================================================
// CORS
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
