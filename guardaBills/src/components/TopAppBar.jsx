import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export function TopAppBar({ onLogout }) {
  // Mock profile picture similar to the HTML
  const profilePhoto =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";

  return (
    <View className="bg-surface border-b border-zinc-100 mt-8 flex-row justify-between items-center px-5 h-16 w-full">
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: profilePhoto }}
          className="w-8 h-8 rounded-full"
          style={{ width: 32, height: 32 }}
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
  );
}

export default TopAppBar;
