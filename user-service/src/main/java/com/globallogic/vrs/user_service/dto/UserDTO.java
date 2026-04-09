package com.globallogic.vrs.user_service.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Driving License is necessary.")
    @Pattern(
            regexp = "^[A-Z]{2}\\s?[0-9]{2}\\s?[0-9]{4}\\s?[0-9]{7}$",
            message = "Invalid Driving License format (e.g., DL01 20110012345 or MH 14 20110012345)"
    )
    private String drivingLicenseNumber;

}