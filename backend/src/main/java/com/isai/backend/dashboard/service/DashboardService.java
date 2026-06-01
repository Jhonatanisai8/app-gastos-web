package com.isai.backend.dashboard.service;

import com.isai.backend.dashboard.dto.DashboardResponse;

public interface DashboardService {
    DashboardResponse getDashboardData(Long userId);
}
