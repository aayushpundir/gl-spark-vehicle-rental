package com.globallogic.vrs.user_service.service;

import com.globallogic.vrs.user_service.dto.AuthResponse;
import com.globallogic.vrs.user_service.dto.LoginRequest;
import com.globallogic.vrs.user_service.dto.UserDTO;
import com.globallogic.vrs.user_service.exception.UserAlreadyExistsException;
import com.globallogic.vrs.user_service.model.User;
import com.globallogic.vrs.user_service.repository.UserRepository;
import com.globallogic.vrs.user_service.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public User registerUser(UserDTO userDto) {

        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + userDto.getEmail() + " already exists!");
        }

        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole("CUSTOMER");

        return userRepository.save(user);

    }

    @Override
    public AuthResponse loginUser(LoginRequest loginRequest) {
        // 1. Check if user exists
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals("CUSTOMER")) {
            throw new  UserAlreadyExistsException("User with email " + loginRequest.getEmail() + " is not a registered customer!");
        }

        // 2. Check if password matches (BCrypt)
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 3. Generate token (ensure jwtUtils now takes two arguments: email and role)
        String token = jwtUtils.generateToken(user.getEmail(), user.getRole());

        // 4. Return the AuthResponse DTO
        // (Assuming you have a constructor or @AllArgsConstructor on AuthResponse)
        return new AuthResponse(
                token,
                user.getRole(),
                "Bearer",
                user.getEmail()
        );
    }

    @Override
    public AuthResponse loginAdmin(LoginRequest loginRequest) {
        // 1. Check if user exists
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals("ADMIN")) {
            throw new  UserAlreadyExistsException("User with email id " + user.getEmail() + " is not registered as admin!");
        }

        // 2. Check if password matches (BCrypt)
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 3. Generate token (ensure jwtUtils now takes two arguments: email and role)
        String token = jwtUtils.generateToken(user.getEmail(), user.getRole());

        // 4. Return the AuthResponse DTO
        // (Assuming you have a constructor or @AllArgsConstructor on AuthResponse)
        return new AuthResponse(
                token,
                user.getRole(),
                "Bearer",
                user.getEmail()
        );
    }

    @Override
    public String promoteUser(String email, String currentUserEmail) {
        if (!"Ayush@example.com".equals(currentUserEmail)) {
            throw new RuntimeException("Access Denied: Only Owner can perform promotions.");
        }

        // 2. Find the user to be promoted
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User to be promoted not found"));

        // 3. Update role
        user.setRole("ADMIN");
        userRepository.save(user);

        return "User Promoted Successfully as an admin.";
    }

}
