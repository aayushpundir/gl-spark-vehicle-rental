package com.globallogic.vrs.booking_service.config;

import com.globallogic.vrs.booking_service.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter; // Inject the filter here

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.PUT, "/api/bookings/cancel/**").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers("/api/bookings/create", "/api/bookings/my-bookings").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers("/api/bookings/**").hasRole("ADMIN")
//                        .requestMatchers("/api/bookings/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                // ADD THIS LINE:
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}