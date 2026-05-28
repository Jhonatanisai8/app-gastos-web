package com.isai.backend.user.service;

import com.isai.backend.common.exception.ResourceNotFoundException;
import com.isai.backend.user.dto.UserDto;
import com.isai.backend.user.entity.Role;
import com.isai.backend.user.entity.User;
import com.isai.backend.user.mapper.UserMapper;
import com.isai.backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @Test
    void getProfile_shouldReturnUserDto_whenUserExists() {
        var userId = 1L;
        var user = User.builder().id(userId).name("Juan").email("juan@email.com").build();
        var expectedDto = UserDto.builder().id(userId).name("Juan").email("juan@email.com").build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.toDto(user)).thenReturn(expectedDto);

        var result = userService.getProfile(userId);

        assertThat(result).isEqualTo(expectedDto);
        verify(userRepository).findById(userId);
        verify(userMapper).toDto(user);
    }

    @Test
    void getProfile_shouldThrowException_whenUserNotFound() {
        var userId = 99L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getProfile(userId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findById(userId);
        verifyNoInteractions(userMapper);
    }

    @Test
    void updateProfile_shouldUpdateNameAndCurrency() {
        var userId = 1L;
        var user = User.builder().id(userId).name("Old").currency("PEN").build();
        var expectedDto = UserDto.builder().id(userId).name("New").currency("USD").build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(userMapper.toDto(any())).thenReturn(expectedDto);

        var result = userService.updateProfile(userId, "New", "USD");

        assertThat(result).isEqualTo(expectedDto);
        assertThat(user.getName()).isEqualTo("New");
        assertThat(user.getCurrency()).isEqualTo("USD");
        verify(userRepository).save(user);
    }

    @Test
    void updateProfile_shouldOnlyUpdateName_whenCurrencyIsNull() {
        var userId = 1L;
        var user = User.builder().id(userId).name("Old").currency("PEN").build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(userMapper.toDto(any())).thenReturn(UserDto.builder().build());

        userService.updateProfile(userId, "New", null);

        assertThat(user.getName()).isEqualTo("New");
        assertThat(user.getCurrency()).isEqualTo("PEN");
    }

    @Test
    void updateProfile_shouldOnlyUpdateCurrency_whenNameIsNull() {
        var userId = 1L;
        var user = User.builder().id(userId).name("Old").currency("PEN").build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(userMapper.toDto(any())).thenReturn(UserDto.builder().build());

        userService.updateProfile(userId, null, "USD");

        assertThat(user.getName()).isEqualTo("Old");
        assertThat(user.getCurrency()).isEqualTo("USD");
    }

    @Test
    void updateProfile_shouldThrowException_whenUserNotFound() {
        var userId = 99L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.updateProfile(userId, "New", "USD"))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findById(userId);
        verify(userRepository, never()).save(any());
        verifyNoInteractions(userMapper);
    }

    @Test
    void updateProfile_shouldPersistSavedUser() {
        var userId = 1L;
        var user = User.builder().id(userId).name("Old").currency("PEN").build();
        var captor = ArgumentCaptor.forClass(User.class);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(captor.capture())).thenReturn(user);
        when(userMapper.toDto(any())).thenReturn(UserDto.builder().build());

        userService.updateProfile(userId, "Updated", "EUR");

        var saved = captor.getValue();
        assertThat(saved.getName()).isEqualTo("Updated");
        assertThat(saved.getCurrency()).isEqualTo("EUR");
    }
}
