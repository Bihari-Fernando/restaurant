package com.restaurant.queuesystem.service;

import com.restaurant.queuesystem.entity.Customer;
import com.restaurant.queuesystem.entity.WaitlistEntry;
import com.restaurant.queuesystem.repository.CustomerRepository;
import com.restaurant.queuesystem.repository.WaitlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WaitlistService {

    private final WaitlistRepository waitlistRepository;
    private final CustomerRepository customerRepository;

    // Add customer to waitlist
    public WaitlistEntry joinWaitlist(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));

        WaitlistEntry entry = new WaitlistEntry();
        entry.setCustomer(customer);
        entry.setPartySize(customer.getPartySize());

        return waitlistRepository.save(entry);
    }

    // Get all waiting customers (oldest first)
    public List<WaitlistEntry> getWaitingList() {
        return waitlistRepository.findByStatusOrderByJoinedAtAsc(
                WaitlistEntry.WaitlistStatus.WAITING);
    }

    // Get all waitlist entries
    public List<WaitlistEntry> getAllWaitlistEntries() {
        return waitlistRepository.findAll();
    }

    // Cancel a waitlist entry
    public WaitlistEntry cancelEntry(Long id) {
        WaitlistEntry entry = waitlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Waitlist entry not found with id: " + id));
        entry.setStatus(WaitlistEntry.WaitlistStatus.CANCELLED);
        return waitlistRepository.save(entry);
    }

    // Mark as seated
    public WaitlistEntry markAsSeated(Long id) {
        WaitlistEntry entry = waitlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Waitlist entry not found with id: " + id));
        entry.setStatus(WaitlistEntry.WaitlistStatus.SEATED);
        return waitlistRepository.save(entry);
    }
}