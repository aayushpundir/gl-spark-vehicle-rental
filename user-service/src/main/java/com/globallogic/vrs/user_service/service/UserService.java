package com.globallogic.vrs.user_service.service;

import com.globallogic.vrs.user_service.dto.LoginRequest;
import com.globallogic.vrs.user_service.dto.UserDTO;
import com.globallogic.vrs.user_service.model.User;

public interface UserService {
    User registerUser(UserDTO userDto);
    String loginUser(LoginRequest loginRequest);
}
