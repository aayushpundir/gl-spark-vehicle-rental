package com.globallogic.vrs.user_service.service;

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
    public String loginUser(LoginRequest loginRequest) {
        // 1. Find the user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));

        // 2. Check if the raw password matches the BCrypt hash in DB
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }

        // 3. Generate and return the JWT
        return jwtUtils.generateToken(user.getEmail());
    }
}
