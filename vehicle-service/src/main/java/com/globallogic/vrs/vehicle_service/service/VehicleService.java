package com.globallogic.vrs.vehicle_service.service;

import com.globallogic.vrs.vehicle_service.dto.VehicleDTO;
import com.globallogic.vrs.vehicle_service.model.Vehicle;

import java.util.List;

public interface VehicleService {
    Vehicle addVehicle(VehicleDTO vehicleDto);
    List<Vehicle> getAllVehicles();
    Vehicle getVehicleById(Long id);
    List<Vehicle> getAvailableVehicles();
}