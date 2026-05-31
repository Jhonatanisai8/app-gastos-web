package com.isai.backend.expense.service;

import com.isai.backend.expense.dto.ExpenseRequest;
import com.isai.backend.expense.dto.ExpenseResponse;

import java.util.List;

public interface ExpenseService {
    List<ExpenseResponse> getAllByUser(Long userId);

    ExpenseResponse getById(Long id, Long userId);

    ExpenseResponse create(ExpenseRequest request, Long userId);

    ExpenseResponse update(Long id, ExpenseRequest request, Long userId);

    void delete(Long id, Long userId);

    


}
