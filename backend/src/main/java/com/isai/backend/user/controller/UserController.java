package com.isai.backend.user.controller;

import com.isai.backend.common.response.ApiResponse;
import com.isai.backend.user.dto.UserDto;
import com.isai.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/me")
  public ResponseEntity<ApiResponse<UserDto>> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
    Long userId = Long.valueOf(userDetails.getUsername());
    return ResponseEntity.ok(ApiResponse.success(userService.getProfile(userId)));
  }

  @PutMapping("/me")
  public ResponseEntity<ApiResponse<UserDto>> updateProfile(
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String currency) {
    Long userId = Long.valueOf(userDetails.getUsername());
    return ResponseEntity.ok(ApiResponse.success(userService.updateProfile(userId, name, currency)));
  }
}
