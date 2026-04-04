package com.globallogic.vrs.vehicle_service.service;

import com.globallogic.vrs.vehicle_service.dto.VehicleDTO;
import com.globallogic.vrs.vehicle_service.model.Vehicle;
import com.globallogic.vrs.vehicle_service.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService{
    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public Vehicle addVehicle(VehicleDTO vehicleDto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setBrand(vehicleDto.getBrand());
        vehicle.setModel(vehicleDto.getModel());
        vehicle.setPlateNumber(vehicleDto.getPlateNumber());
        vehicle.setPricePerDay(vehicleDto.getPricePerDay());

        vehicle.setStatus(vehicleDto.getStatus() != null ? vehicleDto.getStatus() : "AVAILABLE");

        return vehicleRepository.save(vehicle);
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
    }

    @Override
    public List<Vehicle> getAvailableVehicles() {
        return vehicleRepository.findByStatus("AVAILABLE");
    }
}
