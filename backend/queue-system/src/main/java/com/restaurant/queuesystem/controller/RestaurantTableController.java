package com.restaurant.queuesystem.controller;

import com.restaurant.queuesystem.entity.RestaurantTable;
import com.restaurant.queuesystem.service.RestaurantTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class RestaurantTableController {

    private final RestaurantTableService tableService;

    // GET all tables
    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return tableService.getAllTables();
    }

    // GET tables by status
    @GetMapping("/status/{status}")
    public List<RestaurantTable> getByStatus(@PathVariable RestaurantTable.TableStatus status) {
        return tableService.getTablesByStatus(status);
    }

    // POST add a new table
    @PostMapping
    public ResponseEntity<RestaurantTable> addTable(@RequestBody RestaurantTable table) {
        return ResponseEntity.ok(tableService.addTable(table));
    }

    // PUT update table status
    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<RestaurantTable> updateStatus(
            @PathVariable Long id,
            @PathVariable RestaurantTable.TableStatus status) {
        return ResponseEntity.ok(tableService.updateStatus(id, status));
    }

    // DELETE a table
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Long id) {
        tableService.deleteTable(id);
        return ResponseEntity.noContent().build();
    }
}