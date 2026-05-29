package com.isai.backend.category.mapper;

import com.isai.backend.category.dto.CategoryRequest;
import com.isai.backend.category.dto.CategoryResponse;
import com.isai.backend.category.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toResponse(Category category);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    Category toEntity(CategoryRequest request);
}
