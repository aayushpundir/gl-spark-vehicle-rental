package com.globallogic.vrs.booking_service.service;

import com.globallogic.vrs.booking_service.dto.BookingRequestDTO;
import com.globallogic.vrs.booking_service.dto.BookingResponseDTO;

import java.util.List;

public interface BookingService {
    BookingResponseDTO createBooking(BookingRequestDTO request, String userEmail);
    List<BookingResponseDTO> getMyBookings(String userEmail);
    List<BookingResponseDTO> getAllBookings();
    void cancelBooking(Long bookingId, String userEmail);

    List<BookingResponseDTO> getBookingsByStatus(String status);

    void markBookingAsReturned(Long bookingId);
}
