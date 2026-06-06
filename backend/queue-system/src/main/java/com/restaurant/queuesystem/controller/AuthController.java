package com.restaurant.queuesystem.controller;

import com.restaurant.queuesystem.entity.User;
import com.restaurant.queuesystem.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> body) {
        String role = body.getOrDefault("role", "STAFF");
        return ResponseEntity.ok(authService.register(
                body.get("username"),
                body.get("password"),
                User.Role.valueOf(role.toUpperCase())
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> body) {
        String token = authService.login(body.get("username"), body.get("password"));
        return ResponseEntity.ok(Map.of(
                "token", token,
                "username", body.get("username")
        ));
    }
}