package com.isai.backend.auth.service;

import com.isai.backend.auth.dto.JwtResponse;
import com.isai.backend.auth.dto.LoginRequest;
import com.isai.backend.auth.dto.RegisterRequest;
import com.isai.backend.auth.jwt.JwtTokenProvider;
import com.isai.backend.common.exception.BadRequestException;
import com.isai.backend.common.exception.DuplicateResourceException;
import com.isai.backend.common.exception.UnauthorizedException;
import com.isai.backend.user.entity.User;
import com.isai.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;

  public JwtResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new DuplicateResourceException("Email already registered");
    }

    User user = User.builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .currency(request.getCurrency() != null ? request.getCurrency() : "PEN")
        .build();

    user = userRepository.save(user);

    String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
    String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

    return JwtResponse.builder()
        .token(token)
        .refreshToken(refreshToken)
        .email(user.getEmail())
        .build();
  }

  public JwtResponse login(LoginRequest request) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    } catch (Exception e) {
      throw new UnauthorizedException("Invalid email or password");
    }

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new BadRequestException("User not found"));

    String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
    String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

    return JwtResponse.builder()
        .token(token)
        .refreshToken(refreshToken)
        .email(user.getEmail())
        .build();
  }

  public JwtResponse refresh(String refreshToken) {
    if (!jwtTokenProvider.validateToken(refreshToken)) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    Long userId = Long.valueOf(jwtTokenProvider.getUserIdFromToken(refreshToken));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new BadRequestException("User not found"));

    String newToken = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
    String newRefreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

    return JwtResponse.builder()
        .token(newToken)
        .refreshToken(newRefreshToken)
        .email(user.getEmail())
        .build();
  }
}
