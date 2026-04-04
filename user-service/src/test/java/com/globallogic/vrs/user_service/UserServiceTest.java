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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository; // This will be red for now

    @InjectMocks
    private UserServiceImpl userService; // This will be red for now

    @Test
    void testRegisterUser_Success() {
        // Given
        UserDTO userDto = new UserDTO("John Doe", "john@example.com", "password123");
        User user = new User(1L, "John Doe", "john@example.com", "password123", "CUSTOMER");

        when(userRepository.save(any(User.class))).thenReturn(user);

        // When
        User savedUser = userService.registerUser(userDto);

        // Then
        assertNotNull(savedUser);
        assertEquals("john@example.com", savedUser.getEmail());
    }
}