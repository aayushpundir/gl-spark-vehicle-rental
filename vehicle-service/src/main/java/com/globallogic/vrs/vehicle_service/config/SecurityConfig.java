package com.globallogic.vrs.vehicle_service.config;

import com.globallogic.vrs.vehicle_service.security.JwtAuthenticationFilter;
import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. ADMIN ONLY: Writing/Deleting data
                        .requestMatchers(HttpMethod.POST, "/api/vehicles/add").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/vehicles/**").hasRole("ADMIN")

                        // 2. INTERNAL/ADMIN: Updating status (The Booking Service calls this)
                        // If Booking Service passes the Admin/Customer token, permitAll() is okay
                        // for now, but usually, we restrict PUT to authenticated users.
                        .requestMatchers(HttpMethod.PUT, "/api/vehicles/**").authenticated()

                        // 3. PUBLIC: Browsing vehicles
                        .requestMatchers(HttpMethod.GET, "/api/vehicles/**").permitAll()

                        // 4. Catch-all
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}