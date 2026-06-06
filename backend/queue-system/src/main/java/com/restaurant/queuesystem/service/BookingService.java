package com.restaurant.queuesystem.service;

import com.restaurant.queuesystem.entity.Booking;
import com.restaurant.queuesystem.entity.Customer;
import com.restaurant.queuesystem.entity.RestaurantTable;
import com.restaurant.queuesystem.repository.BookingRepository;
import com.restaurant.queuesystem.repository.CustomerRepository;
import com.restaurant.queuesystem.repository.RestaurantTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final RestaurantTableRepository tableRepository;

    // Create a booking
    public Booking createBooking(Long customerId, Long tableId) {

        // Find customer
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found: " + customerId));

        // Find table
        RestaurantTable table = tableRepository.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found: " + tableId));

        // Check if table is available
        if (table.getStatus() == RestaurantTable.TableStatus.OCCUPIED) {
            throw new RuntimeException("Table " + table.getTableNumber() + " is already occupied!");
        }

        // Mark table as OCCUPIED
        table.setStatus(RestaurantTable.TableStatus.OCCUPIED);
        tableRepository.save(table);

        // Create booking
        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setRestaurantTable(table);

        return bookingRepository.save(booking);
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get bookings by status
    public List<Booking> getBookingsByStatus(Booking.BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }

    // Get bookings by customer
    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    // Complete a booking → free the table
    public Booking completeBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));

        // Free the table
        RestaurantTable table = booking.getRestaurantTable();
        table.setStatus(RestaurantTable.TableStatus.AVAILABLE);
        tableRepository.save(table);

        // Update booking status
        booking.setStatus(Booking.BookingStatus.COMPLETED);
        return bookingRepository.save(booking);
    }

    // Cancel a booking → free the table
    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));

        // Free the table
        RestaurantTable table = booking.getRestaurantTable();
        table.setStatus(RestaurantTable.TableStatus.AVAILABLE);
        tableRepository.save(table);

        // Update booking status
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }
}