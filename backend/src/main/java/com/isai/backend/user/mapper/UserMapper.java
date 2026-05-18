package com.isai.backend.user.mapper;

import com.isai.backend.user.dto.UserDto;
import com.isai.backend.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "role", expression = "java(user.getRole().name())")
    UserDto toDto(User user);
}
