package com.isai.backend.user.mapper;

import com.isai.backend.user.dto.UserDto;
import com.isai.backend.user.entity.Role;
import com.isai.backend.user.entity.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class UserMapperTest {

  private final UserMapper mapper = new UserMapperImpl();

  @Test
  void shouldMapUserToUserDto() {
    var now = LocalDateTime.now();
    var user = User.builder()
        .id(1L)
        .name("Juan")
        .email("juan@email.com")
        .password("encoded123")
        .currency("PEN")
        .role(Role.USER)
        .createdAt(now)
        .updatedAt(now)
        .build();

    UserDto dto = mapper.toDto(user);

    assertThat(dto.getId()).isEqualTo(1L);
    assertThat(dto.getName()).isEqualTo("Juan");
    assertThat(dto.getEmail()).isEqualTo("juan@email.com");
    assertThat(dto.getCurrency()).isEqualTo("PEN");
    assertThat(dto.getRole()).isEqualTo("USER");
    assertThat(dto.getCreatedAt()).isEqualTo(now);
    assertThat(dto.getUpdatedAt()).isEqualTo(now);
  }

  @Test
  void shouldMapAdminRoleCorrectly() {
    var user = User.builder()
        .id(2L)
        .name("Admin")
        .email("admin@email.com")
        .password("encoded")
        .role(Role.ADMIN)
        .build();

    UserDto dto = mapper.toDto(user);

    assertThat(dto.getRole()).isEqualTo("ADMIN");
  }

  @Test
  void shouldMapUserWithoutTimestamps() {
    var user = User.builder()
        .id(3L)
        .name("Test")
        .email("test@email.com")
        .password("secret123")
        .build();

    UserDto dto = mapper.toDto(user);

    assertThat(dto.getId()).isEqualTo(3L);
    assertThat(dto.getName()).isEqualTo("Test");
    assertThat(dto.getCreatedAt()).isNull();
    assertThat(dto.getUpdatedAt()).isNull();
  }
}
