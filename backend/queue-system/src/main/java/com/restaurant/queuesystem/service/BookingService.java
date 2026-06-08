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
    private final EmailService emailService;

    public Booking createBooking(Long customerId, Long tableId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found: " + customerId));

        RestaurantTable table = tableRepository.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found: " + tableId));

        if (table.getStatus() == RestaurantTable.TableStatus.OCCUPIED) {
            throw new RuntimeException("Table " + table.getTableNumber() + " is already occupied!");
        }

        table.setStatus(RestaurantTable.TableStatus.OCCUPIED);
        tableRepository.save(table);

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setRestaurantTable(table);

        Booking saved = bookingRepository.save(booking);

        // Send email if customer has email
        if (customer.getEmail() != null && !customer.getEmail().isEmpty()) {
            emailService.sendBookingConfirmationEmail(
                    customer.getEmail(),
                    customer.getName(),
                    table.getTableNumber()
            );
        }

        return saved;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByStatus(Booking.BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public Booking completeBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        RestaurantTable table = booking.getRestaurantTable();
        table.setStatus(RestaurantTable.TableStatus.AVAILABLE);
        tableRepository.save(table);
        booking.setStatus(Booking.BookingStatus.COMPLETED);
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        RestaurantTable table = booking.getRestaurantTable();
        table.setStatus(RestaurantTable.TableStatus.AVAILABLE);
        tableRepository.save(table);
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }
}