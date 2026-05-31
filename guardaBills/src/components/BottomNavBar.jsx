import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

export function BottomNavBar() {
  return (
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
  );
}

export default BottomNavBar;
