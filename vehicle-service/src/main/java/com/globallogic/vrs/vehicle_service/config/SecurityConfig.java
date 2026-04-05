package com.globallogic.vrs.vehicle_service.config;

import com.globallogic.vrs.vehicle_service.security.JwtAuthenticationFilter;
import jakarta.ws.rs.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final JwtAuthenticationFilter jwtFilter; // <--- Inject your new filter

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
        System.out.println("DEBUG: SecurityConfig initialized with JwtFilter!");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. Specific POST must come FIRST
                        .requestMatchers(HttpMethod.POST, "/api/vehicles/add").hasRole("ADMIN")

                        // 2. Generic GET can be second
                        .requestMatchers(HttpMethod.GET, "/api/vehicles/**").permitAll()

                        // 3. Catch-all
                        .anyRequest().authenticated()
                )
                // 4. IMPORTANT: The filter MUST be here
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}