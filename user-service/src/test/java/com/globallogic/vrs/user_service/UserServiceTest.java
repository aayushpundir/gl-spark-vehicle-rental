package com.globallogic.vrs.user_service;

import com.globallogic.vrs.user_service.dto.UserDTO;
import com.globallogic.vrs.user_service.model.User;
import com.globallogic.vrs.user_service.repository.UserRepository;
import com.globallogic.vrs.user_service.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository; // This will be red for now

    @InjectMocks
    private UserServiceImpl userService; // This will be red for now

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    void testRegisterUser_Success() {
        // Given
        UserDTO userDto = new UserDTO("John Doe", "john@example.com", "password123");

        // Tell Mockito to return a "hashed" string when encode is called
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword123");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // When
        User savedUser = userService.registerUser(userDto);

        // Then
        assertNotNull(savedUser);
        assertEquals("john@example.com", savedUser.getEmail());
    }
}