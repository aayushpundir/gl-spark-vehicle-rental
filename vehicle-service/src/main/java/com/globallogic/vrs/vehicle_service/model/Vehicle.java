package com.globallogic.vrs.vehicle_service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotBlank(message = "Plate number is required")
    @Column(unique = true)
    private String plateNumber;

    @NotNull(message = "Price per day is required")
    private Double pricePerDay;

    private String status = "AVAILABLE";
}