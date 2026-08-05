package com.food.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

//3
@Service
public class JwtUtils {
	@Value("${jwt.secret}")
	private String secret; // This is secret key use to sign or verify token

	@Value("${jwt.expiration}")
	private long expiration;

	// jwt can't directly use string it need key object

	private Key getSignKey() {
		return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); // Keys.hmacShaKeyFor->crete key which used
																			// to sign and verify jwt
	}
//suppose user login with abc@gmail.com after login succeed 
	// generateToken("abc@gmail.com")

	public String generateToken(String email) {
		return Jwts.builder() // start creating jwt
				.setSubject(email) // stores subject=abc@gmail.com
				.setIssuedAt(new Date()) // set current time
				.setExpiration(new Date(System.currentTimeMillis() + expiration)) // currenttime=5am, exptime=1hr it
																					// store 6am
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact(); // it create something like
																				// eyJhbGciOiJIUzI1NiJ9.... which is JWt
		// SignatureAlgorithm.HS256->This will ensure that nobody modify token
		// .compact ->convert everything to string
	}
//it will contain abc@gmail.com-----Issue time---Expiry time all signed with secret key

	public String extractEmail(String token) { // from frontend token will like Bearer eyJhbGc.... filter will remove
												// bearer and send to extractEmail
		Claims claims = Jwts.parserBuilder() // start reading jwt
				.setSigningKey(getSignKey()) // Use secret key if wrong exception occure
				.build().parseClaimsJws(token) // Verify Signature,Expiry and Token format
				.getBody(); // Require payload
		return claims.getSubject(); // it will return abc@gmail.com
	}

	public boolean isTokenValid(String token) { // Check weather JWT has expired
		// read expiration date from token
		Date expiry = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody()
				.getExpiration();

		// current time=5 , exptime=6--> 6>5- true
		// if current time=7, exptime=6-->6>7- false
		return expiry.after(new Date());
	}
}
