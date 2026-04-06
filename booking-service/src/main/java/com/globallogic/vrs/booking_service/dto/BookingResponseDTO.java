package com.globallogic.vrs.booking_service.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingResponseDTO {
    private Long bookingId;
    private String userEmail;
    private Long vehicleId;
    private String vehicleName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double totalAmount;
    private String status;
}
