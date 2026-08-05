package com.food.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j

// This filter's doFilterInternal method
// - gets called for every request

public class CustomJwtVerificationFilter extends OncePerRequestFilter {

	private final JwtUtils jwtUtils; // Used for JWT operations
	private final CustomUserDetailsService customUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		log.info("****** In Custom JWT Verification Filter ******");

		try {
			// 1. Check if JWT exists in the incoming request
			// Authorization : Bearer eyJhbGciOiJIUzI1NiJ9...

			String headerValue = request.getHeader("Authorization");
			System.out.println("Authorization = " + headerValue);

			if (headerValue != null && headerValue.startsWith("Bearer ")) {
				// 2. Remove "Bearer " from the header

				String jwt = headerValue.substring(7);
				System.out.println("JWT = " + jwt);
				log.info("JWT : {}", jwt);

				// 3. Extract email from JWT

				String email = jwtUtils.extractEmail(jwt);
				System.out.println("Email = " + email);
				// 4. Authenticate only if email exists and user is not already authenticated

				if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

					// 5. Load user details from database

					UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
					System.out.println("Authorities = " + userDetails.getAuthorities());

					System.out.println("Token Valid = " + jwtUtils.isTokenValid(jwt));
					// 6. Validate JWT
					if (jwtUtils.isTokenValid(jwt)) {

						// 7. Create Authentication object

						UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
								userDetails, null, userDetails.getAuthorities());

						// 8. Add request details

						authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

						// 9. Save Authentication object in SecurityContext
						SecurityContextHolder.getContext().setAuthentication(authentication);
					}
				}

			} else {
				log.info("*** NO JWT Found ***");
			}

			// Continue with remaining filter chain
			filterChain.doFilter(request, response);

		} catch (Exception e) {

			System.out.println("JWT ERROR = " + e.getClass().getName());
			System.out.println("MESSAGE = " + e.getMessage());

			e.printStackTrace();

			SecurityContextHolder.clearContext();

			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write(e.getMessage());

			logger.warn("JWT Expired");
		}
	}
}