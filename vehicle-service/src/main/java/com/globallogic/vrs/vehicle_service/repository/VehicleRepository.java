package com.globallogic.vrs.vehicle_service.repository;

import com.globallogic.vrs.vehicle_service.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByStatus(String status);
    List<Vehicle> findByCity(String city);
}
