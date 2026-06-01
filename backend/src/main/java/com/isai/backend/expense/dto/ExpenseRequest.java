package com.isai.backend.expense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {
    @NotBlank
    private String title;

    private String description;

    @NotNull
    @Positive
    private BigDecimal amount;

    @NotNull
    private LocalDate expenseDate;

    @NotNull
    private Long categoryId;
}
