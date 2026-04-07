package com.globallogic.vrs.booking_service.service;

import com.globallogic.vrs.booking_service.client.VehicleClient;
import com.globallogic.vrs.booking_service.dto.BookingRequestDTO;
import com.globallogic.vrs.booking_service.dto.BookingResponseDTO;
import com.globallogic.vrs.booking_service.dto.VehicleDTO;
import com.globallogic.vrs.booking_service.model.Booking;
import com.globallogic.vrs.booking_service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VehicleClient vehicleClient;

    @Override
    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO request, String userEmail) {
        // 1. Call Vehicle Service via Feign to get details
        VehicleDTO vehicle = vehicleClient.getVehicleById(request.getVehicleId());

        // 2. Validate availability
        if (!"AVAILABLE".equalsIgnoreCase(vehicle.getStatus())) {
            throw new RuntimeException("Vehicle is not available for the selected dates!");
        }

        // 3. Calculate rental duration
        long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        if (days <= 0) {
            throw new RuntimeException("Invalid dates: End date must be after start date.");
        }

        // 4. Calculate total amount
        Double totalAmount = days * vehicle.getPricePerDay();

        // 5. Create and save Booking Entity to PostgreSQL
        Booking booking = new Booking();
        booking.setUserEmail(userEmail);
        booking.setVehicleId(request.getVehicleId());
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setTotalAmount(totalAmount);
        booking.setStatus("CONFIRMED");

        Booking savedBooking = bookingRepository.save(booking);

        // 6. Update Vehicle Status to BOOKED in Vehicle Service via Feign
        vehicleClient.updateStatus(request.getVehicleId(), "BOOKED");

        // 7. Return mapped DTO
        return mapToResponseDTO(savedBooking, vehicle.getBrand() + " " + vehicle.getModel());
    }

    @Override
    public List<BookingResponseDTO> getMyBookings(String userEmail) {
        return bookingRepository.findByUserEmail(userEmail)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void cancelBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Only allow user to cancel their own booking
        if (!booking.getUserEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized to cancel this booking");
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        // Make the vehicle AVAILABLE again
        vehicleClient.updateStatus(booking.getVehicleId(), "AVAILABLE");
    }

    private BookingResponseDTO mapToResponseDTO(Booking booking, String vehicleName) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setBookingId(booking.getId());
        dto.setUserEmail(booking.getUserEmail());
        dto.setVehicleId(booking.getVehicleId());
        dto.setVehicleName(vehicleName); // Set the brand + model here
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());
        return dto;
    }

    private BookingResponseDTO mapToResponseDTO(Booking booking) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setBookingId(booking.getId());
        dto.setUserEmail(booking.getUserEmail());
        dto.setVehicleId(booking.getVehicleId());
        dto.setVehicleName("Vehicle ID: " + booking.getVehicleId()); // Default name
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());
        return dto;
    }

    @Override
    public List<BookingResponseDTO> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void markBookingAsReturned(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!"CONFIRMED".equalsIgnoreCase(booking.getStatus())) {
            throw new RuntimeException("Only CONFIRMED bookings can be completed");
        }

        booking.setStatus("COMPLETED");
        bookingRepository.save(booking);

        // Make vehicle AVAILABLE again
        vehicleClient.updateStatus(booking.getVehicleId(), "AVAILABLE");
    }

}
