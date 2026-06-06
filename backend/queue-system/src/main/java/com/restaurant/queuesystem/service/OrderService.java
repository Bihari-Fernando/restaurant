package com.restaurant.queuesystem.service;

import com.restaurant.queuesystem.entity.Booking;
import com.restaurant.queuesystem.entity.Order;
import com.restaurant.queuesystem.repository.BookingRepository;
import com.restaurant.queuesystem.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final BookingRepository bookingRepository;

    // Place an order
    public Order placeOrder(Long bookingId, Order order) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));

        // Only allow orders for CONFIRMED bookings
        if (booking.getStatus() != Booking.BookingStatus.CONFIRMED) {
            throw new RuntimeException("Cannot place order — booking is not active!");
        }

        order.setBooking(booking);
        return orderRepository.save(order);
    }

    // Get all orders for a booking
    public List<Order> getOrdersByBooking(Long bookingId) {
        return orderRepository.findByBookingId(bookingId);
    }

    // Get all orders by status
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Update order status
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Get total bill for a booking
    public Double getTotalBill(Long bookingId) {
        List<Order> orders = orderRepository.findByBookingId(bookingId);
        return orders.stream()
                .mapToDouble(o -> o.getPrice() * o.getQuantity())
                .sum();
    }
}