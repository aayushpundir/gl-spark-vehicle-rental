package com.globallogic.vrs.booking_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    private Long vehicleId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double totalAmount;
    private String status;
}
