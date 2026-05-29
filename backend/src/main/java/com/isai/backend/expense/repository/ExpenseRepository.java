package com.isai.backend.expense.repository;

import com.isai.backend.expense.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserIdOrderByExpenseDateDesc(Long userId);
    List<Expense> findByUserIdAndCategoryIdOrderByExpenseDateDesc(Long userId, Long categoryId);
    boolean existsByIdAndUserId(Long id, Long userId);
}
