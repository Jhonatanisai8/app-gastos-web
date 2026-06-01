package com.isai.backend.expense.repository;

import com.isai.backend.expense.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserIdOrderByExpenseDateDesc(Long userId);

    @Query("SELECT e FROM Expense e JOIN FETCH e.category WHERE e.user.id = :userId ORDER BY e.expenseDate DESC, e.createdAt DESC")
    List<Expense> findByUserIdWithCategoryOrderByExpenseDateDesc(
            @Param("userId") Long userId);

    List<Expense> findByUserIdAndCategoryIdOrderByExpenseDateDesc(Long userId, Long categoryId);

    boolean existsByIdAndUserId(Long id, Long userId);
}
