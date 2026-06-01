package com.isai.backend.expense.service.impl;

import com.isai.backend.category.entity.Category;
import com.isai.backend.category.repository.CategoryRepository;
import com.isai.backend.common.exception.BadRequestException;
import com.isai.backend.common.exception.ResourceNotFoundException;
import com.isai.backend.expense.dto.ExpenseRequest;
import com.isai.backend.expense.dto.ExpenseResponse;
import com.isai.backend.expense.entity.Expense;
import com.isai.backend.expense.mapper.ExpenseMapper;
import com.isai.backend.expense.repository.ExpenseRepository;
import com.isai.backend.expense.service.ExpenseService;
import com.isai.backend.user.entity.User;
import com.isai.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ExpenseMapper expenseMapper;

    @Override
    public List<ExpenseResponse> getAllByUser(Long userId) {
        return expenseRepository.findByUserIdOrderByExpenseDateDesc(userId)
                .stream()
                .map(expenseMapper::toResponse)
                .toList();
    }

    @Override
    public ExpenseResponse getById(Long id, Long userId) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Expense not found");
        }
        return expenseMapper.toResponse(expense);
    }

    @Override
    public ExpenseResponse create(ExpenseRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Expense expense = expenseMapper.toEntity(request);
        expense.setExpenseDate(java.time.LocalDate.now(java.time.ZoneId.of("America/Lima")));
        expense.setUser(user);
        expense.setCategory(category);

        return expenseMapper.toResponse(expenseRepository.save(expense));
    }

    @Override
    public ExpenseResponse update(Long id, ExpenseRequest request, Long userId) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Expense not found");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        expense.setTitle(request.getTitle());
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setCategory(category);

        return expenseMapper.toResponse(expenseRepository.save(expense));
    }

    @Override
    public void delete(Long id, Long userId) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Expense not found");
        }
        expenseRepository.delete(expense);
    }
}
