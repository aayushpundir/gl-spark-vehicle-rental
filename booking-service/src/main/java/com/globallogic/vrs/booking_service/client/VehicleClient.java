package com.globallogic.vrs.booking_service.client;

import com.globallogic.vrs.booking_service.config.FeignConfig;
import com.globallogic.vrs.booking_service.dto.VehicleDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "VEHICLE-SERVICE", configuration = FeignConfig.class)
public interface VehicleClient {
    @GetMapping("/api/vehicles/{id}")
    VehicleDTO getVehicleById(@PathVariable("id") Long id);

    @PutMapping("/api/vehicles/{id}/status")
    void updateStatus(@PathVariable("id") Long id, @RequestParam String status);
}
