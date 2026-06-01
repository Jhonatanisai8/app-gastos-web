package com.isai.backend.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private BalanceInfo balance;
    private EstimatesInfo estimates;
    private List<RecentTransactionInfo> recentTransactions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BalanceInfo {
        private BigDecimal totalBalance;
        private BigDecimal income;
        private BigDecimal expenses;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EstimatesInfo {
        private BigDecimal dailyLimit;
        private BigDecimal weeklyLimit;
        private MonthlyProjectionInfo monthlyProjection;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyProjectionInfo {
        private BigDecimal current;
        private BigDecimal target;
        private Integer percentage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentTransactionInfo {
        private Long id;
        private String category;
        private String time;
        private BigDecimal amount;
    }
}
