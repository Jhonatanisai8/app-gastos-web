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
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

    return new org.springframework.security.core.userdetails.User(
        String.valueOf(user.getId()),
        user.getPassword(),
        Collections.singletonList(() -> "ROLE_" + user.getRole().name()));
  }
}
