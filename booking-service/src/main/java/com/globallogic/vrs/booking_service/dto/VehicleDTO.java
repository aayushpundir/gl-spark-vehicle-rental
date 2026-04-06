package com.globallogic.vrs.booking_service.dto;

import lombok.Data;

@Data
public class VehicleDTO {
    private Long id;
    private String brand;
    private String model;
    private Double pricePerDay;
    private String status;
}
