package com.restaurant.queuesystem.repository;

import com.restaurant.queuesystem.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStatus(Booking.BookingStatus status);

    List<Booking> findByCustomerId(Long customerId);
}