package com.isai.backend.dashboard.service.impl;

import com.isai.backend.common.exception.ResourceNotFoundException;
import com.isai.backend.dashboard.dto.DashboardResponse;
import com.isai.backend.dashboard.service.DashboardService;
import com.isai.backend.expense.entity.Expense;
import com.isai.backend.expense.repository.ExpenseRepository;
import com.isai.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboardData(Long userId) {
        // Verify user exists
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }

        // Fetch all expenses with category pre-fetched (join fetch) to optimize
        // database queries
        List<Expense> allExpenses = expenseRepository.findByUserIdWithCategoryOrderByExpenseDateDesc(userId);

        LocalDate now = LocalDate.now();
        int currentYear = now.getYear();
        Month currentMonth = now.getMonth();
        LocalDate thirtyDaysAgo = now.minusDays(29);

        BigDecimal totalBalance = BigDecimal.ZERO;
        BigDecimal incomeSum = BigDecimal.ZERO;
        BigDecimal expenseSum = BigDecimal.ZERO;
        BigDecimal last30DaysExpenseSum = BigDecimal.ZERO;

        for (Expense expense : allExpenses) {
            BigDecimal amount = expense.getAmount();
            String type = expense.getCategory().getType(); // "INCOME" or "EXPENSE"

            // 1. Calculate All-time Total Balance
            if ("INCOME".equalsIgnoreCase(type)) {
                totalBalance = totalBalance.add(amount);
            } else if ("EXPENSE".equalsIgnoreCase(type)) {
                totalBalance = totalBalance.subtract(amount);
            }

            LocalDate expenseDate = expense.getExpenseDate();

            // 2. Calculate Current Month Incomes and Expenses
            if (expenseDate.getYear() == currentYear && expenseDate.getMonth() == currentMonth) {
                if ("INCOME".equalsIgnoreCase(type)) {
                    incomeSum = incomeSum.add(amount);
                } else if ("EXPENSE".equalsIgnoreCase(type)) {
                    expenseSum = expenseSum.add(amount);
                }
            }

            // 3. Calculate Expenses of the Last 30 Days (for daily/weekly limits
            // estimation)
            if ("EXPENSE".equalsIgnoreCase(type)) {
                if (!expenseDate.isBefore(thirtyDaysAgo) && !expenseDate.isAfter(now)) {
                    last30DaysExpenseSum = last30DaysExpenseSum.add(amount);
                }
            }
        }

        // Estimates calculations using the arithmetic mean
        BigDecimal dailyLimit = last30DaysExpenseSum.divide(new BigDecimal("30"), 2, RoundingMode.HALF_UP);
        // Fallback default limit if daily limit is zero/negative
        if (dailyLimit.compareTo(BigDecimal.ZERO) <= 0) {
            dailyLimit = new BigDecimal("50.00");
        }
        BigDecimal weeklyLimit = dailyLimit.multiply(new BigDecimal("7")).setScale(2, RoundingMode.HALF_UP);

        BigDecimal monthlyTarget = new BigDecimal("2000.00");
        int monthlyPercentage = 0;
        if (monthlyTarget.compareTo(BigDecimal.ZERO) > 0) {
            monthlyPercentage = expenseSum.multiply(new BigDecimal("100"))
                    .divide(monthlyTarget, 0, RoundingMode.HALF_UP)
                    .intValue();
        }

        // Top 3 most recent transactions
        List<DashboardResponse.RecentTransactionInfo> recentTransactions = allExpenses.stream()
                .limit(3)
                .map(exp -> {
                    BigDecimal amount = exp.getAmount();
                    if ("EXPENSE".equalsIgnoreCase(exp.getCategory().getType())) {
                        amount = amount.negate();
                    }

                    return DashboardResponse.RecentTransactionInfo.builder()
                            .id(exp.getId())
                            .category(exp.getCategory().getName())
                            .time(formatTime(exp))
                            .amount(amount)
                            .build();
                })
                .toList();

        return DashboardResponse.builder()
                .balance(DashboardResponse.BalanceInfo.builder()
                        .totalBalance(totalBalance.setScale(2, RoundingMode.HALF_UP))
                        .income(incomeSum.setScale(2, RoundingMode.HALF_UP))
                        .expenses(expenseSum.setScale(2, RoundingMode.HALF_UP))
                        .build())
                .estimates(DashboardResponse.EstimatesInfo.builder()
                        .dailyLimit(dailyLimit)
                        .weeklyLimit(weeklyLimit)
                        .monthlyProjection(DashboardResponse.MonthlyProjectionInfo.builder()
                                .current(expenseSum.setScale(2, RoundingMode.HALF_UP))
                                .target(monthlyTarget.setScale(2, RoundingMode.HALF_UP))
                                .percentage(monthlyPercentage)
                                .build())
                        .build())
                .recentTransactions(recentTransactions)
                .build();
    }

    private String formatTime(Expense expense) {
        LocalDate expenseDate = expense.getExpenseDate();
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        if (expenseDate.equals(today)) {
            if (expense.getCreatedAt() != null) {
                DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH);
                return "Today, " + expense.getCreatedAt().format(timeFormatter);
            }
            return "Today";
        } else if (expenseDate.equals(yesterday)) {
            return "Yesterday";
        } else if (expenseDate.getYear() == today.getYear()) {
            DateTimeFormatter currentYearFormatter = DateTimeFormatter.ofPattern("MMM d", Locale.ENGLISH);
            return expenseDate.format(currentYearFormatter);
        } else {
            DateTimeFormatter otherYearFormatter = DateTimeFormatter.ofPattern("MMM d, yyyy", Locale.ENGLISH);
            return expenseDate.format(otherYearFormatter);
        }
    }
}
