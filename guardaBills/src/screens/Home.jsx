import React from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export function Home({ onLogout }) {
  // Mock profile picture similar to the HTML
  const profilePhoto =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";

  return (
    <SafeAreaView className="flex-1 bg-background w-full">
      {/* TopAppBar */}
      <View className="bg-surface border-b border-zinc-100 flex-row justify-between items-center px-5 h-16 w-full">
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: profilePhoto }}
            className="w-8 h-8 rounded-full object-cover"
          />
          <Text className="text-xl font-bold text-primary">Financial Zen</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="p-2 rounded-full active:bg-zinc-100">
            <Feather name="bell" size={20} color="#003527" />
          </TouchableOpacity>
          {/* Logout Button */}
          <TouchableOpacity
            className="p-2 rounded-full active:bg-red-50"
            onPress={onLogout}
          >
            <Feather name="log-out" size={20} color="#ba1a1a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Scroll Canvas */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-margin-edge py-stack-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-col gap-stack-lg pb-24">
          {/* Balance Card */}
          <View className="bg-primary rounded-2xl p-6 shadow-md relative overflow-hidden">
            {/* Background Blur effect decorator */}
            <View
              className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-20 rounded-full"
              style={{ transform: [{ translateX: 30 }, { translateY: -30 }] }}
            />

            <View className="relative z-10">
              <Text className="text-primary-fixed-dim uppercase tracking-wider text-xs font-semibold mb-2">
                Total Balance
              </Text>
              <Text className="text-4xl font-bold text-white mb-6">
                $12,450.00
              </Text>

              <View className="flex-row justify-between items-center mt-4 border-t border-white/10 pt-4">
                {/* Income info */}
                <View className="flex-row items-center gap-2">
                  <View className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                    <Feather name="arrow-up-right" size={16} color="#b0f0d6" />
                  </View>
                  <View>
                    <Text className="text-[10px] text-primary-fixed-dim font-medium uppercase">
                      Income
                    </Text>
                    <Text className="text-sm font-semibold text-white">
                      $4,200
                    </Text>
                  </View>
                </View>

                {/* Expenses info */}
                <View className="flex-row items-center gap-2">
                  <View className="w-8 h-8 rounded-full bg-surface-tint flex items-center justify-center">
                    <Feather name="arrow-down-left" size={16} color="#ffffff" />
                  </View>
                  <View>
                    <Text className="text-[10px] text-primary-fixed-dim font-medium uppercase">
                      Expenses
                    </Text>
                    <Text className="text-sm font-semibold text-white">
                      $1,850
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Estimación de Gastos (Bento Grid) */}
          <View className="flex flex-col gap-stack-md">
            <Text className="text-lg font-bold text-on-surface">
              Estimación de Gastos
            </Text>

            <View className="flex-row gap-gutter">
              {/* Daily Projection */}
              <View className="flex-1 bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/40 h-32 justify-between">
                <View>
                  <Text className="text-xs text-on-surface-variant font-semibold">
                    Daily Limit
                  </Text>
                  <Text className="text-xl font-bold text-on-surface mt-1">
                    $50
                  </Text>
                </View>
                <View className="w-full bg-surface-variant rounded-full h-2 mt-auto">
                  <View
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "65%" }}
                  />
                </View>
              </View>

              {/* Weekly Projection */}
              <View className="flex-1 bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/40 h-32 justify-between">
                <View>
                  <Text className="text-xs text-on-surface-variant font-semibold">
                    Weekly Limit
                  </Text>
                  <Text className="text-xl font-bold text-on-surface mt-1">
                    $350
                  </Text>
                </View>
                <View className="w-full bg-surface-variant rounded-full h-2 mt-auto">
                  <View
                    className="bg-secondary h-2 rounded-full"
                    style={{ width: "40%" }}
                  />
                </View>
              </View>
            </View>

            {/* Monthly Projection (Full width) */}
            <View className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/40 flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-on-surface-variant font-semibold">
                  Monthly Projection
                </Text>
                <View className="flex-row items-baseline gap-2 mt-1">
                  <Text className="text-xl font-bold text-on-surface">
                    $1,450
                  </Text>
                  <Text className="text-xs text-outline">/ $2,000</Text>
                </View>
              </View>
              {/* Circular Progress Ring Mock */}
              <View className="w-12 h-12 rounded-full border-4 border-surface-variant flex items-center justify-center relative">
                <View
                  className="absolute w-12 h-12 rounded-full border-4 border-primary border-t-transparent border-r-transparent"
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
                <Text className="text-[10px] font-bold text-primary">72%</Text>
              </View>
            </View>
          </View>

          {/* Recent Transactions */}
          <View className="flex flex-col gap-stack-md">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-on-surface">
                Recent Transactions
              </Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Text className="text-sm font-semibold text-primary">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-col gap-3">
              {/* Transaction Item 1 */}
              <View className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/20 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                    <Feather name="shopping-cart" size={18} color="#0060ac" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-on-surface">
                      Groceries
                    </Text>
                    <Text className="text-xs text-on-surface-variant">
                      Today, 10:30 AM
                    </Text>
                  </View>
                </View>
                <Text className="text-sm font-bold text-on-surface">
                  -$85.50
                </Text>
              </View>

              {/* Transaction Item 2 */}
              <View className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/20 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                    <Feather name="truck" size={18} color="#003527" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-on-surface">
                      Gas Station
                    </Text>
                    <Text className="text-xs text-on-surface-variant">
                      Yesterday
                    </Text>
                  </View>
                </View>
                <Text className="text-sm font-bold text-on-surface">
                  -$40.00
                </Text>
              </View>

              {/* Transaction Item 3 */}
              <View className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant/20 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center">
                    <Feather name="coffee" size={18} color="#273034" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-on-surface">
                      Dinner
                    </Text>
                    <Text className="text-xs text-on-surface-variant">
                      Mar 12
                    </Text>
                  </View>
                </View>
                <Text className="text-sm font-bold text-on-surface">
                  -$120.00
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BottomNavBar */}
      <View className="bg-white/90 border-t border-zinc-100 absolute bottom-0 left-0 w-full flex-row justify-around items-center pt-3 pb-5 h-20 shadow-md">
        <TouchableOpacity className="flex items-center justify-center group">
          <Feather name="home" size={22} className="text-primary" />
          <Text className="text-[10px] font-semibold mt-1 text-primary">
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex items-center justify-center group">
          <Feather name="bar-chart-2" size={22} className="text-zinc-400" />
          <Text className="text-[10px] font-semibold mt-1 text-zinc-400">
            Stats
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex items-center justify-center group">
          <Feather name="plus-circle" size={22} className="text-zinc-400" />
          <Text className="text-[10px] font-semibold mt-1 text-zinc-400">
            Add
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex items-center justify-center group">
          <Feather name="user" size={22} className="text-zinc-400" />
          <Text className="text-[10px] font-semibold mt-1 text-zinc-400">
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Home;
