package com.globallogic.vrs.user_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF (Mandatory for Stateless JWT APIs)
                .csrf(csrf -> csrf.disable())

                // 2. Handle CORS (Optional but good for React frontend later)
                .cors(cors -> cors.disable())

                // 3. Configure Authorization
                .authorizeHttpRequests(auth -> auth
                        // Permit registration, login, and the default error path
                        .requestMatchers("/api/users/register", "/api/users/login", "/error", "/api/users/register/admin").permitAll()
                        // Secure everything else
                        .anyRequest().authenticated()
                )

                // 4. Set Session Management to Stateless
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        return http.build();
    }
}
