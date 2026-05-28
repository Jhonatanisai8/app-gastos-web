package com.isai.backend.user.controller;

import com.isai.backend.auth.jwt.JwtTokenProvider;
import com.isai.backend.security.CustomUserDetailsService;
import com.isai.backend.security.JwtAuthenticationFilter;
import com.isai.backend.user.dto.UserDto;
import com.isai.backend.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    @WithMockUser(username = "1")
    void getProfile_shouldReturn200WithUserData() throws Exception {
        var userDto = UserDto.builder()
                .id(1L)
                .name("Juan")
                .email("juan@email.com")
                .currency("PEN")
                .role("USER")
                .build();

        when(userService.getProfile(1L)).thenReturn(userDto);

        mockMvc.perform(get("/api/v1/users/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("OK"))
                .andExpect(jsonPath("$.data.name").value("Juan"))
                .andExpect(jsonPath("$.data.email").value("juan@email.com"))
                .andExpect(jsonPath("$.data.currency").value("PEN"))
                .andExpect(jsonPath("$.data.role").value("USER"));

        verify(userService).getProfile(1L);
    }

    @Test
    @WithMockUser(username = "1")
    void updateProfile_shouldReturn200WithUpdatedData() throws Exception {
        var updatedDto = UserDto.builder()
                .id(1L)
                .name("Juan Actualizado")
                .email("juan@email.com")
                .currency("USD")
                .role("USER")
                .build();

        when(userService.updateProfile(1L, "Juan Actualizado", "USD")).thenReturn(updatedDto);

        mockMvc.perform(put("/api/v1/users/me")
                        .param("name", "Juan Actualizado")
                        .param("currency", "USD")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Juan Actualizado"))
                .andExpect(jsonPath("$.data.currency").value("USD"));

        verify(userService).updateProfile(1L, "Juan Actualizado", "USD");
    }

    @Test
    @WithMockUser(username = "1")
    void updateProfile_shouldWorkWithPartialUpdate() throws Exception {
        var updatedDto = UserDto.builder()
                .id(1L)
                .name("Solo Nombre")
                .currency("PEN")
                .build();

        when(userService.updateProfile(1L, "Solo Nombre", null)).thenReturn(updatedDto);

        mockMvc.perform(put("/api/v1/users/me")
                        .param("name", "Solo Nombre")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Solo Nombre"))
                .andExpect(jsonPath("$.data.currency").value("PEN"));

        verify(userService).updateProfile(1L, "Solo Nombre", null);
    }

    @Test
    void getProfile_shouldReturn401_whenUnauthenticated() throws Exception {
        mockMvc.perform(get("/api/v1/users/me"))
                .andExpect(status().isUnauthorized());
    }
}
