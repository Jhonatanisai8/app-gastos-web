package com.isai.backend.auth.controller;

import com.isai.backend.auth.dto.JwtResponse;
import com.isai.backend.auth.dto.LoginRequest;
import com.isai.backend.auth.dto.RegisterRequest;
import com.isai.backend.auth.service.AuthService;
import com.isai.backend.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<JwtResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(authService.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(request)));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<JwtResponse>> refresh(@RequestParam String refreshToken) {
        return ResponseEntity.ok(ApiResponse.success(authService.refresh(refreshToken)));
    }
}
