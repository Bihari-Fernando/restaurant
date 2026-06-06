package com.restaurant.queuesystem.repository;

import com.restaurant.queuesystem.entity.WaitlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaitlistRepository extends JpaRepository<WaitlistEntry, Long> {

    List<WaitlistEntry> findByStatusOrderByJoinedAtAsc(WaitlistEntry.WaitlistStatus status);
}