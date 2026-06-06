package com.restaurant.queuesystem.repository;

import com.restaurant.queuesystem.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByBookingId(Long bookingId);

    List<Order> findByStatus(Order.OrderStatus status);
}