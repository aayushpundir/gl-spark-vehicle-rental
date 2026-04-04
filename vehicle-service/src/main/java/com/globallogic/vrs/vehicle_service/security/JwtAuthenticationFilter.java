package com.globallogic.vrs.vehicle_service.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtils.validateToken(token)) {
                String email = jwtUtils.getEmailFromToken(token);
                // Extract the role from the token using your JwtUtils
                String role = jwtUtils.getRoleFromToken(token);

                // VERY IMPORTANT: Add "ROLE_" prefix for hasRole("ADMIN") to work
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        email, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
                );

                // Tell Spring Security: "This user is verified and has these roles"
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Extracted Email: " + email);
                System.out.println("Extracted Role from Token: " + role);
                System.out.println("Granted Authority: ROLE_" + role);
            }
        }
        filterChain.doFilter(request, response);
    }
}