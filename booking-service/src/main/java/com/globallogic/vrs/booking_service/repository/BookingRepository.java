package com.globallogic.vrs.booking_service.repository;

import com.globallogic.vrs.booking_service.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserEmail(String userEmail);

    List<Booking> findByVehicleId(Long id);
}
