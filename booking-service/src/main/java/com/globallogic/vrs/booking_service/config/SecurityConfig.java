package com.globallogic.vrs.booking_service.config;

import com.globallogic.vrs.booking_service.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // 🔥 Required for POST requests
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. Specific User Actions (Highest Priority)
//                        .requestMatchers("/api/test-me").permitAll()
                                .requestMatchers("/api/bookings/{id}").permitAll()
                        .requestMatchers("/api/bookings/create").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers("/api/bookings/my-bookings/**").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/bookings/cancel/**").hasAnyRole("CUSTOMER", "ADMIN")

                        // 2. Admin Only (Broad Matchers)
                        .requestMatchers("/api/bookings/**").hasRole("ADMIN")

                        // 3. All other endpoints
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}