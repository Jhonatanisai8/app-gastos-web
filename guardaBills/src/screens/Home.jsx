import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import AddExpense from "./AddExpense";
import { useDashboard } from "../hooks/useDashboard";

const getCurrencySymbol = (currency) => {
  if (currency === "USD") return "$";
  if (currency === "PEN") return "S/";
  return "S/";
};

const formatAmount = (amount, currencySymbol) => {
  if (amount === undefined || amount === null) return `${currencySymbol}0.00`;
  const absVal = Math.abs(amount).toFixed(2);
  const formatted = absVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return amount < 0 ? `-${currencySymbol}${formatted}` : `${currencySymbol}${formatted}`;
};

const getCategoryIcon = (categoryName) => {
  const name = (categoryName || "").toLowerCase();
  if (
    name.includes("grocery") ||
    name.includes("groceries") ||
    name.includes("super") ||
    name.includes("comida") ||
    name.includes("alimento") ||
    name.includes("mercado") ||
    name.includes("tienda")
  ) {
    return { name: "shopping-cart", color: "#0060ac", bgClass: "bg-surface-container-high" };
  }
  if (
    name.includes("gas") ||
    name.includes("truck") ||
    name.includes("transporte") ||
    name.includes("combustible") ||
    name.includes("carro") ||
    name.includes("taxi")
  ) {
    return { name: "truck", color: "#003527", bgClass: "bg-primary-fixed" };
  }
  if (
    name.includes("dinner") ||
    name.includes("coffee") ||
    name.includes("cafe") ||
    name.includes("restaurante") ||
    name.includes("cena") ||
    name.includes("comida fuera")
  ) {
    return { name: "coffee", color: "#273034", bgClass: "bg-tertiary-fixed" };
  }
  return { name: "credit-card", color: "#707974", bgClass: "bg-surface-variant/40" };
};

export function Home({ onLogout, userData }) {
  const [currentTab, setCurrentTab] = useState("home");
  const { data: dashboardResponse, loading, error, cargarDashboard } = useDashboard();
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    if (userData && userData.token) {
      try {
        await cargarDashboard(userData.token);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [userData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const dashboard = dashboardResponse?.data;
  const balance = dashboard?.balance || { totalBalance: 0, income: 0, expenses: 0 };
  const estimates = dashboard?.estimates || {
    dailyLimit: 50,
    weeklyLimit: 350,
    monthlyProjection: { current: 0, target: 2000, percentage: 0 },
  };
  const recentTransactions = dashboard?.recentTransactions || [];

  const currencySymbol = getCurrencySymbol(userData?.currency);

  // Dynamic progress bars using arithmetic calculations
  const averageDailySpend = estimates.monthlyProjection.current / 30;
  const dailyProgress = estimates.dailyLimit > 0
    ? Math.min(100, Math.round((averageDailySpend / estimates.dailyLimit) * 100))
    : 0;

  const averageWeeklySpend = averageDailySpend * 7;
  const weeklyProgress = estimates.weeklyLimit > 0
    ? Math.min(100, Math.round((averageWeeklySpend / estimates.weeklyLimit) * 100))
    : 0;

  const monthlyProgress = estimates.monthlyProjection.percentage || 0;

  if (loading && !refreshing) {
    return (
      <SafeAreaView className="flex-1 bg-background w-full">
        <TopAppBar onLogout={onLogout} userData={userData}></TopAppBar>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0060ac" />
          <Text className="text-sm text-on-surface-variant mt-4 font-semibold">
            Cargando dashboard...
          </Text>
        </View>
        <BottomNavBar currentTab={currentTab} onTabPress={(tab) => setCurrentTab(tab)} />
      </SafeAreaView>
    );
  }

  if (error && !dashboard) {
    return (
      <SafeAreaView className="flex-1 bg-background w-full">
        <TopAppBar onLogout={onLogout} userData={userData}></TopAppBar>
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="alert-circle-outline" size={64} color="#ba1a1a" />
          <Text className="text-lg font-bold text-on-surface mt-4">
            Error de conexión
          </Text>
          <Text className="text-sm text-on-surface-variant mt-2 text-center">
            {error}
          </Text>
          <TouchableOpacity
            onPress={fetchDashboardData}
            className="mt-6 px-6 py-3 bg-primary rounded-xl"
          >
            <Text className="text-white font-bold text-sm">Reintentar</Text>
          </TouchableOpacity>
        </View>
        <BottomNavBar currentTab={currentTab} onTabPress={(tab) => setCurrentTab(tab)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background w-full">
      <TopAppBar onLogout={onLogout} userData={userData}></TopAppBar>

      {currentTab === "home" ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-margin-edge py-stack-lg"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#0060ac"]}
            />
          }
        >
          <View className="flex flex-col gap-stack-lg pb-24">
            {/* Total Balance Card */}
            <View className="bg-primary rounded-2xl p-6 shadow-md relative overflow-hidden">
              <View
                className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-20 rounded-full"
                style={{ transform: [{ translateX: 30 }, { translateY: -30 }] }}
              />

              <View className="relative z-10">
                <Text className="text-primary-fixed-dim uppercase tracking-wider text-xs font-semibold mb-2">
                  Total Balance
                </Text>
                <Text className="text-4xl font-bold text-white mb-6">
                  {formatAmount(balance.totalBalance, currencySymbol)}
                </Text>

                <View className="flex-row justify-between items-center mt-4 border-t border-white/10 pt-4">
                  <View className="flex-row items-center gap-2">
                    <View className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                      <Feather name="arrow-up-right" size={16} color="#b0f0d6" />
                    </View>
                    <View>
                      <Text className="text-[10px] text-primary-fixed-dim font-medium uppercase">
                        Ingresos
                      </Text>
                      <Text className="text-sm font-semibold text-white">
                        {formatAmount(balance.income, currencySymbol)}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <View className="w-8 h-8 rounded-full bg-surface-tint flex items-center justify-center">
                      <Feather name="arrow-down-left" size={16} color="#ffffff" />
                    </View>
                    <View>
                      <Text className="text-[10px] text-primary-fixed-dim font-medium uppercase">
                        Gastos
                      </Text>
                      <Text className="text-sm font-semibold text-white">
                        {formatAmount(balance.expenses, currencySymbol)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Estimates Cards */}
            <View className="flex flex-col gap-stack-md">
              <Text className="text-lg font-bold text-on-surface">
                Estimación de Gastos
              </Text>

              <View className="flex-row gap-gutter">
                {/* Daily Limit */}
                <View className="flex-1 bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/40 h-32 justify-between">
                  <View>
                    <Text className="text-xs text-on-surface-variant font-semibold">
                      Daily Limit
                    </Text>
                    <Text className="text-xl font-bold text-on-surface mt-1">
                      {formatAmount(estimates.dailyLimit, currencySymbol)}
                    </Text>
                  </View>
                  <View className="w-full bg-surface-variant rounded-full h-2 mt-auto">
                    <View
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${dailyProgress}%` }}
                    />
                  </View>
                </View>

                {/* Weekly Limit */}
                <View className="flex-1 bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/40 h-32 justify-between">
                  <View>
                    <Text className="text-xs text-on-surface-variant font-semibold">
                      Weekly Limit
                    </Text>
                    <Text className="text-xl font-bold text-on-surface mt-1">
                      {formatAmount(estimates.weeklyLimit, currencySymbol)}
                    </Text>
                  </View>
                  <View className="w-full bg-surface-variant rounded-full h-2 mt-auto">
                    <View
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: `${weeklyProgress}%` }}
                    />
                  </View>
                </View>
              </View>

              {/* Monthly Projection */}
              <View className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/40 flex-row items-center justify-between">
                <View>
                  <Text className="text-xs text-on-surface-variant font-semibold">
                    Monthly Projection
                  </Text>
                  <View className="flex-row items-baseline gap-2 mt-1">
                    <Text className="text-xl font-bold text-on-surface">
                      {formatAmount(estimates.monthlyProjection.current, currencySymbol)}
                    </Text>
                    <Text className="text-xs text-outline">
                      / {formatAmount(estimates.monthlyProjection.target, currencySymbol)}
                    </Text>
                  </View>
                </View>
                <View className="w-12 h-12 rounded-full border-4 border-surface-variant flex items-center justify-center relative">
                  <View
                    className="absolute w-12 h-12 rounded-full border-4 border-primary border-t-transparent border-r-transparent"
                    style={{ transform: [{ rotate: `${(monthlyProgress / 100) * 360}deg` }] }}
                  />
                  <Text className="text-[10px] font-bold text-primary">
                    {monthlyProgress}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Recent Transactions List */}
            <View className="flex flex-col gap-stack-md">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold text-on-surface">
                  Recent Transactions
                </Text>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text className="text-sm font-semibold text-primary">See All</Text>
                </TouchableOpacity>
              </View>

              <View className="flex flex-col gap-3">
                {recentTransactions.length === 0 ? (
                  <View className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant/20 items-center justify-center">
                    <Text className="text-sm text-on-surface-variant text-center">
                      No hay transacciones recientes
                    </Text>
                  </View>
                ) : (
                  recentTransactions.map((tx) => {
                    const iconInfo = getCategoryIcon(tx.category);
                    const isExpense = tx.amount < 0;
                    return (
                      <View
                        key={tx.id}
                        className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/20 flex-row items-center justify-between"
                      >
                        <View className="flex-row items-center gap-3">
                          <View
                            className={`w-10 h-10 rounded-full ${iconInfo.bgClass} flex items-center justify-center`}
                          >
                            <Feather name={iconInfo.name} size={18} color={iconInfo.color} />
                          </View>
                          <View>
                            <Text className="text-sm font-semibold text-on-surface">
                              {tx.category}
                            </Text>
                            <Text className="text-xs text-on-surface-variant">
                              {tx.time}
                            </Text>
                          </View>
                        </View>
                        <Text
                          className={`text-sm font-bold ${
                            isExpense ? "text-on-surface" : "text-primary"
                          }`}
                        >
                          {formatAmount(tx.amount, currencySymbol)}
                        </Text>
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : currentTab === "add" ? (
        <AddExpense
          token={userData.token}
          onBack={() => setCurrentTab("home")}
          onSave={(data) => {
            console.log("Expense saved:", data);
            fetchDashboardData(); // Automatically reload dashboard statistics upon saving a transaction!
            setCurrentTab("home");
          }}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons
            name={
              currentTab === "stats"
                ? "bar-chart-outline"
                : currentTab === "profile"
                ? "person-outline"
                : "construct-outline"
            }
            size={64}
            color="#003527"
          />
          <Text className="text-lg font-bold text-on-surface mt-4 uppercase tracking-wider">
            Pantalla {currentTab}
          </Text>
          <Text className="text-sm text-on-surface-variant mt-2 text-center">
            Esta pantalla se encuentra actualmente en desarrollo y forma parte del prototipo de Financial Zen.
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentTab("home")}
            className="mt-6 px-6 py-3 bg-primary rounded-xl"
          >
            <Text className="text-white font-bold text-sm">Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      )}

      <BottomNavBar currentTab={currentTab} onTabPress={(tab) => setCurrentTab(tab)} />
    </SafeAreaView>
  );
}

export default Home;
