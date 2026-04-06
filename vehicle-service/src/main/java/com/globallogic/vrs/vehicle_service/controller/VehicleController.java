package com.globallogic.vrs.vehicle_service.controller;

import com.globallogic.vrs.vehicle_service.dto.VehicleDTO;
import com.globallogic.vrs.vehicle_service.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/add")
    public ResponseEntity<VehicleDTO> addVehicle(@Valid @RequestBody VehicleDTO vehicleDto) {
        return new ResponseEntity<>(vehicleService.addVehicle(vehicleDto), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }

    @GetMapping("/available")
    public ResponseEntity<List<VehicleDTO>> getAvailable() {
        return ResponseEntity.ok(vehicleService.getAvailableVehicles());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestParam String status) {
        vehicleService.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    // Only ADMIN can reach this point due to SecurityConfig
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) {
        String message = vehicleService.deleteVehicle(id);
        return ResponseEntity.ok(message);
    }
}
