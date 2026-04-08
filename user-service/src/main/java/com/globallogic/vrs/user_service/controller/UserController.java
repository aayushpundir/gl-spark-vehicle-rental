package com.globallogic.vrs.user_service.controller;

import com.globallogic.vrs.user_service.dto.AuthResponse;
import com.globallogic.vrs.user_service.dto.LoginRequest;
import com.globallogic.vrs.user_service.dto.UserDTO;
import com.globallogic.vrs.user_service.model.User;
import com.globallogic.vrs.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

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

    @PostMapping("/register/admin")
    public ResponseEntity<User> registerAdmin(@Valid @RequestBody UserDTO userDto) {
        User registeredAdmin = userService.registerAdmin(userDto);
        return new ResponseEntity<>(registeredAdmin, HttpStatus.CREATED);
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

}
