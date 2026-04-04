package com.globallogic.vrs.user_service.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Component
public class JwtUtils {

    // A properly Base64 encoded string representing a 256-bit key
    private final String jwtSecret = "YmFzZTY0LWVuY29kZWQtc2VjcmV0LWtleS1mb3ItdnJzLXByb2plY3QtMjAyNg==";
    private final int jwtExpirationMs = 86400000;

    private SecretKey getSigningKey() {
        // More robust way to handle the key in Spring Boot 3.5
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), Jwts.SIG.HS256) // Explicitly set the algorithm
                .compact();
    }
}