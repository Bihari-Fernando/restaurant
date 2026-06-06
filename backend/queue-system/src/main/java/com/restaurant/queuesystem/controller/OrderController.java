package com.restaurant.queuesystem.controller;

import com.restaurant.queuesystem.entity.Order;
import com.restaurant.queuesystem.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Place an order for a booking
    @PostMapping("/booking/{bookingId}")
    public ResponseEntity<Order> placeOrder(
            @PathVariable Long bookingId,
            @RequestBody Order order) {
        return ResponseEntity.ok(orderService.placeOrder(bookingId, order));
    }

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get orders by booking
    @GetMapping("/booking/{bookingId}")
    public List<Order> getOrdersByBooking(@PathVariable Long bookingId) {
        return orderService.getOrdersByBooking(bookingId);
    }

    // Get orders by status
    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable Order.OrderStatus status) {
        return orderService.getOrdersByStatus(status);
    }

    // Update order status
    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @PathVariable Order.OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    // Get total bill for a booking
    @GetMapping("/booking/{bookingId}/bill")
    public ResponseEntity<Double> getTotalBill(@PathVariable Long bookingId) {
        return ResponseEntity.ok(orderService.getTotalBill(bookingId));
    }
}