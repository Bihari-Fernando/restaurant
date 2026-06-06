package com.restaurant.queuesystem.controller;

import com.restaurant.queuesystem.entity.WaitlistEntry;
import com.restaurant.queuesystem.service.WaitlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waitlist")
@RequiredArgsConstructor
public class WaitlistController {

    private final WaitlistService waitlistService;

    // Get all waiting customers
    @GetMapping
    public List<WaitlistEntry> getWaitingList() {
        return waitlistService.getWaitingList();
    }

    // Get all entries
    @GetMapping("/all")
    public List<WaitlistEntry> getAllEntries() {
        return waitlistService.getAllWaitlistEntries();
    }

    // Join waitlist
    @PostMapping("/join/{customerId}")
    public ResponseEntity<WaitlistEntry> joinWaitlist(@PathVariable Long customerId) {
        return ResponseEntity.ok(waitlistService.joinWaitlist(customerId));
    }

    // Cancel waitlist entry
    @PutMapping("/{id}/cancel")
    public ResponseEntity<WaitlistEntry> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(waitlistService.cancelEntry(id));
    }

    // Mark as seated
    @PutMapping("/{id}/seated")
    public ResponseEntity<WaitlistEntry> seated(@PathVariable Long id) {
        return ResponseEntity.ok(waitlistService.markAsSeated(id));
    }
}