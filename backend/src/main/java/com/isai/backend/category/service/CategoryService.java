package com.isai.backend.category.service;

import com.isai.backend.category.dto.CategoryRequest;
import com.isai.backend.category.dto.CategoryResponse;
import com.isai.backend.category.entity.Category;
import com.isai.backend.category.mapper.CategoryMapper;
import com.isai.backend.category.repository.CategoryRepository;
import com.isai.backend.common.exception.BadRequestException;
import com.isai.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }

    public List<CategoryResponse> getByType(String type) {
        return categoryRepository.findByType(type.toUpperCase())
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }

    public CategoryResponse getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return categoryMapper.toResponse(category);
    }

    public CategoryResponse create(CategoryRequest request) {
        String type = request.getType().toUpperCase();
        if (!type.equals("EXPENSE") && !type.equals("INCOME")) {
            throw new BadRequestException("Type must be EXPENSE or INCOME");
        }

        Category category = categoryMapper.toEntity(request);
        category.setType(type);

        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        String type = request.getType().toUpperCase();
        if (!type.equals("EXPENSE") && !type.equals("INCOME")) {
            throw new BadRequestException("Type must be EXPENSE or INCOME");
        }

        category.setName(request.getName());
        category.setIcon(request.getIcon());
        category.setColor(request.getColor());
        category.setType(type);

        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        categoryRepository.delete(category);
    }
}
