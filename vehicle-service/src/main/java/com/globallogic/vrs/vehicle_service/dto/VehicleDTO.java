package com.globallogic.vrs.vehicle_service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VehicleDTO {

    @NotBlank(message = "Brand cannot be empty")
    private String brand;

    @NotBlank(message = "Model cannot be empty")
    private String model;

    @NotBlank(message = "Plate number is required")
    private String plateNumber;

    @NotNull(message = "Price per day is required")
    @Min(value = 1, message = "Price must be greater than 0")
    private Double pricePerDay;

    private String status; // Usually "AVAILABLE" by default
}