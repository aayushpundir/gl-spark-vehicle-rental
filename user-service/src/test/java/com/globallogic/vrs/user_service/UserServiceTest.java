package com.globallogic.vrs.user_service;

import com.globallogic.vrs.userservice.model.User;
import com.globallogic.vrs.userservice.repository.UserRepository;
import com.globallogic.vrs.userservice.service.UserServiceImpl;
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
        // Given: A user object (We will define the User class next)
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("password123");

        // Mocking the behavior: When repository saves, return the same user
        when(userRepository.save(any(User.class))).thenReturn(user);

        // When: The service method is called
        User savedUser = userService.registerUser(user);

        // Then: Assertions to verify the result
        assertNotNull(savedUser);
        assertEquals("john@example.com", savedUser.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }
}