package com.globallogic.vrs.vehicle_service.service;

import com.globallogic.vrs.vehicle_service.dto.VehicleDTO;
import com.globallogic.vrs.vehicle_service.model.Vehicle;
import com.globallogic.vrs.vehicle_service.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService{
    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public VehicleDTO addVehicle(VehicleDTO vehicleDto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setBrand(vehicleDto.getBrand());
        vehicle.setModel(vehicleDto.getModel());
        vehicle.setPlateNumber(vehicleDto.getPlateNumber());
        vehicle.setPricePerDay(vehicleDto.getPricePerDay());

        vehicle.setStatus(vehicleDto.getStatus() != null ? vehicleDto.getStatus() : "AVAILABLE");

        vehicleRepository.save(vehicle);

        vehicleDto.setStatus(vehicle.getStatus());

        return vehicleDto;
    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        List<VehicleDTO> vehicleDTOs = new ArrayList<>();

        for (Vehicle vehicle : vehicles) {
            VehicleDTO vehicleDTO = new VehicleDTO();

            vehicleDTO.setBrand(vehicle.getBrand());
            vehicleDTO.setModel(vehicle.getModel());
            vehicleDTO.setPlateNumber(vehicle.getPlateNumber());
            vehicleDTO.setPricePerDay(vehicle.getPricePerDay());
            vehicleDTO.setStatus(vehicle.getStatus());

            vehicleDTOs.add(vehicleDTO);
        }

        return vehicleDTOs;
    }

    @Override
    public VehicleDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));

        VehicleDTO vehicleDTO = new VehicleDTO();

        vehicleDTO.setBrand(vehicle.getBrand());
        vehicleDTO.setModel(vehicle.getModel());
        vehicleDTO.setPlateNumber(vehicle.getPlateNumber());
        vehicleDTO.setPricePerDay(vehicle.getPricePerDay());
        vehicleDTO.setStatus(vehicle.getStatus());

        return vehicleDTO;
    }

    @Override
    public List<VehicleDTO> getAvailableVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findByStatus("AVAILABLE");

        List<VehicleDTO> vehiclesDto = new ArrayList<>();
        for (Vehicle vehicle : vehicles) {
            VehicleDTO vehicleDTO = new VehicleDTO();

            vehicleDTO.setBrand(vehicle.getBrand());
            vehicleDTO.setModel(vehicle.getModel());
            vehicleDTO.setPlateNumber(vehicle.getPlateNumber());
            vehicleDTO.setPricePerDay(vehicle.getPricePerDay());
            vehicleDTO.setStatus(vehicle.getStatus());

            vehiclesDto.add(vehicleDTO);
        }

        return vehiclesDto;
    }
}
