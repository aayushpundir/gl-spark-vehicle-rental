package com.globallogic.vrs.user_service.controller;

import com.globallogic.vrs.user_service.dto.AuthResponse;
import com.globallogic.vrs.user_service.dto.LoginRequest;
import com.globallogic.vrs.user_service.dto.UserDTO;
import com.globallogic.vrs.user_service.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import com.globallogic.vrs.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserDTO userDto) {
        User registeredUser = userService.registerUser(userDto);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        // 1. Ask the service to authenticate and give us everything we need
        AuthResponse authResponse = userService.loginUser(loginRequest);

        // 2. Return the whole object
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/login/admin")
    public ResponseEntity<AuthResponse> loginAdmin(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = userService.loginAdmin(loginRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PutMapping("/{email:.+}/promote")
    public ResponseEntity<String>  promoteToAdmin(@PathVariable String email) {
        String currentUserEmail =  SecurityContextHolder.getContext().getAuthentication().getName();
        String response = userService.promoteUser(email, currentUserEmail);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
