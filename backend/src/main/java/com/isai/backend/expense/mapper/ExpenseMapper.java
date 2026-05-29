package com.isai.backend.expense.mapper;

import com.isai.backend.expense.dto.ExpenseRequest;
import com.isai.backend.expense.dto.ExpenseResponse;
import com.isai.backend.expense.entity.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    ExpenseResponse toResponse(Expense expense);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "category", ignore = true)
    Expense toEntity(ExpenseRequest request);
}
