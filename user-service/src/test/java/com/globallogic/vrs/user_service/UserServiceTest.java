package com.globallogic.vrs.user_service;

import com.globallogic.vrs.user_service.dto.UserDTO;
import com.globallogic.vrs.user_service.exception.UserAlreadyExistsException;
import com.globallogic.vrs.user_service.model.User;
import com.globallogic.vrs.user_service.repository.UserRepository;
import com.globallogic.vrs.user_service.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

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
        // 1. Create the DTO (Input)
        UserDTO userDto = new UserDTO("John Doe", "john@example.com", "password123","MH 14 20110062821");

        // 2. Create the Entity (What the DB would return)
        User user = new User();
        user.setId(1L);
        user.setName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("hashedPassword123");
        user.setDrivingLicenseNumber("MH 14 20110062821");
        user.setRole("CUSTOMER");

        // 3. Setup Mocks
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword123");
        // NOW 'user' is defined, so this line will work!
        when(userRepository.save(any(User.class))).thenReturn(user);

        // 4. When
        User savedUser = userService.registerUser(userDto);

        // 5. Then
        assertNotNull(savedUser);
        assertEquals("john@example.com", savedUser.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegisterUser_DuplicateEmail_ThrowsException() {
        // Given
        UserDTO userDto = new UserDTO("Jane Doe", "duplicate@example.com", "password123","MH 14 20110062821");

        // Simulate that the email already exists in the database
        when(userRepository.findByEmail("duplicate@example.com")).thenReturn(Optional.of(new User()));

        // When & Then
        assertThrows(UserAlreadyExistsException.class, () -> {
            userService.registerUser(userDto);
        });

        // Verify that save was NEVER called because of the duplicate
        verify(userRepository, never()).save(any(User.class));
    }
}