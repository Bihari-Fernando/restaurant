package com.restaurant.queuesystem.service;

import com.restaurant.queuesystem.entity.RestaurantTable;
import com.restaurant.queuesystem.repository.RestaurantTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantTableService {

    private final RestaurantTableRepository tableRepository;

    // Get all tables
    public List<RestaurantTable> getAllTables() {
        return tableRepository.findAll();
    }

    // Get tables by status
    public List<RestaurantTable> getTablesByStatus(RestaurantTable.TableStatus status) {
        return tableRepository.findByStatus(status);
    }

    // Add a new table
    public RestaurantTable addTable(RestaurantTable table) {
        return tableRepository.save(table);
    }

    // Update table status
    public RestaurantTable updateStatus(Long id, RestaurantTable.TableStatus status) {
        RestaurantTable table = tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found with id: " + id));
        table.setStatus(status);
        return tableRepository.save(table);
    }

    // Delete a table
    public void deleteTable(Long id) {
        tableRepository.deleteById(id);
    }
}