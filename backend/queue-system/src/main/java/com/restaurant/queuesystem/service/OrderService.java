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
    private final EmailService emailService;

    public Order placeOrder(Long bookingId, Order order) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));

        if (booking.getStatus() != Booking.BookingStatus.CONFIRMED) {
            throw new RuntimeException("Cannot place order — booking is not active!");
        }

        order.setBooking(booking);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByBooking(Long bookingId) {
        return orderRepository.findByBookingId(bookingId);
    }

    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        order.setStatus(status);
        Order saved = orderRepository.save(order);

        // Send email when order is served
        if (status == Order.OrderStatus.SERVED) {
            String customerEmail = order.getBooking().getCustomer().getEmail();
            if (customerEmail != null && !customerEmail.isEmpty()) {
                emailService.sendOrderServedEmail(
                        customerEmail,
                        order.getBooking().getCustomer().getName(),
                        order.getItemName()
                );
            }
        }

        return saved;
    }

    public Double getTotalBill(Long bookingId) {
        List<Order> orders = orderRepository.findByBookingId(bookingId);
        return orders.stream()
                .mapToDouble(o -> o.getPrice() * o.getQuantity())
                .sum();
    }
}