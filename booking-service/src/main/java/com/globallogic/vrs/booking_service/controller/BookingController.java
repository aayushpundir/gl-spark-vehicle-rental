package com.globallogic.vrs.booking_service.controller;

import com.globallogic.vrs.booking_service.dto.BookingRequestDTO;
import com.globallogic.vrs.booking_service.dto.BookingResponseDTO;
import com.globallogic.vrs.booking_service.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<BookingResponseDTO> createBooking(@Valid @RequestBody BookingRequestDTO request) {
        // Step 1: Extract the email of the logged-in user from the SecurityContext
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Step 2: Call the service to process booking and return DTO
        BookingResponseDTO response = bookingService.createBooking(request, userEmail);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponseDTO>> getMyBookings() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(bookingService.getMyBookings(userEmail));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBooking(@PathVariable Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        BookingResponseDTO booking = bookingService.findBookingById(userEmail, id);

        return new  ResponseEntity<>(booking, HttpStatus.OK);
    }
    /**
     * Admin only: View all bookings in the system.
     */
    @GetMapping("/all")
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings(
            @RequestParam(required = false) String status) {

        if (status != null) {
            return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
        }

        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    /**
     * Cancel a booking by ID.
     */
    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        bookingService.cancelBooking(id, userEmail);
        return ResponseEntity.ok("Booking cancelled successfully and vehicle is now available.");
    }

//    Return a vehicle after the end date
    @PutMapping("/{id}/return")
    public ResponseEntity<String> markAsReturned(@PathVariable Long id) {
        bookingService.markBookingAsReturned(id);
        return ResponseEntity.ok("Booking marked as COMPLETED and vehicle returned.");
    }

}