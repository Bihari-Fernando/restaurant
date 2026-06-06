package com.restaurant.queuesystem.controller;

import com.restaurant.queuesystem.entity.Booking;
import com.restaurant.queuesystem.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // Create booking
    @PostMapping("/customer/{customerId}/table/{tableId}")
    public ResponseEntity<Booking> createBooking(
            @PathVariable Long customerId,
            @PathVariable Long tableId) {
        return ResponseEntity.ok(bookingService.createBooking(customerId, tableId));
    }

    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get bookings by status
    @GetMapping("/status/{status}")
    public List<Booking> getByStatus(@PathVariable Booking.BookingStatus status) {
        return bookingService.getBookingsByStatus(status);
    }

    // Get bookings by customer
    @GetMapping("/customer/{customerId}")
    public List<Booking> getByCustomer(@PathVariable Long customerId) {
        return bookingService.getBookingsByCustomer(customerId);
    }

    // Complete a booking
    @PutMapping("/{id}/complete")
    public ResponseEntity<Booking> completeBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.completeBooking(id));
    }

    // Cancel a booking
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }
}