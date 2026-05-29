package com.isai.backend.category.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank
    private String name;

    private String icon;

    private String color;

    @NotBlank
    private String type;
}
