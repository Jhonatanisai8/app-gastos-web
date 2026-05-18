package com.isai.backend.user.service;

import com.isai.backend.common.exception.ResourceNotFoundException;
import com.isai.backend.user.dto.UserDto;
import com.isai.backend.user.entity.User;
import com.isai.backend.user.mapper.UserMapper;
import com.isai.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toDto(user);
    }

    public UserDto updateProfile(Long userId, String name, String currency) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (name != null) user.setName(name);
        if (currency != null) user.setCurrency(currency);
        return userMapper.toDto(userRepository.save(user));
    }
}
