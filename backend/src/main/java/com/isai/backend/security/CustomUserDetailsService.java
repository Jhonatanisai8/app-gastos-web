package com.isai.backend.security;

import com.isai.backend.user.entity.User;
import com.isai.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
    User user;

    try {
      Long id = Long.parseLong(identifier);
      user = userRepository.findById(id)
          .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + identifier));
    } catch (NumberFormatException e) {
      user = userRepository.findByEmail(identifier)
          .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + identifier));
    }

    String role = "ROLE_" + user.getRole().name();
    return new org.springframework.security.core.userdetails.User(
        String.valueOf(user.getId()),
        user.getPassword(),
        Collections.singletonList(() -> role));
  }
}
