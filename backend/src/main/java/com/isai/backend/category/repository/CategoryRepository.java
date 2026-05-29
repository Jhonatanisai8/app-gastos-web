package com.isai.backend.category.repository;

import com.isai.backend.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUserId(Long userId);
    List<Category> findByUserIdAndType(Long userId, String type);
    boolean existsByIdAndUserId(Long id, Long userId);
}
