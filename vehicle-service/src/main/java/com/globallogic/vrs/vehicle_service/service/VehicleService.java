package com.globallogic.vrs.vehicle_service.service;

import com.globallogic.vrs.vehicle_service.dto.VehicleDTO;
import com.globallogic.vrs.vehicle_service.dto.VehicleResponse;
import com.globallogic.vrs.vehicle_service.model.Vehicle;

import java.util.List;

public interface VehicleService {
    VehicleDTO addVehicle(VehicleDTO vehicleDto);
    List<VehicleDTO> getAllVehicles();
    VehicleResponse getVehicleById(Long id);
    List<VehicleDTO> getAvailableVehicles();
    List<VehicleResponse> getAvailableVehiclesByCity(String city);
    void updateStatus(Long id, String status);
    String deleteVehicle(Long id);
}