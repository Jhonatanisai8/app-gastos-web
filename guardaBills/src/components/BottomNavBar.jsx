import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

export function BottomNavBar({ currentTab = "home", onTabPress }) {
  return (
    <View className="bg-white/90 border-t border-zinc-100 absolute bottom-0 left-0 w-full flex-row justify-around items-center pt-3 pb-5 h-20 shadow-md">
      <TouchableOpacity 
        onPress={() => onTabPress && onTabPress("home")}
        className="flex items-center justify-center group"
      >
        <Feather 
          name="home" 
          size={22} 
          className={currentTab === "home" ? "text-primary" : "text-zinc-400"} 
        />
        <Text className={`text-[10px] font-semibold mt-1 ${currentTab === "home" ? "text-primary" : "text-zinc-400"}`}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onTabPress && onTabPress("stats")}
        className="flex items-center justify-center group"
      >
        <Feather 
          name="bar-chart-2" 
          size={22} 
          className={currentTab === "stats" ? "text-primary" : "text-zinc-400"} 
        />
        <Text className={`text-[10px] font-semibold mt-1 ${currentTab === "stats" ? "text-primary" : "text-zinc-400"}`}>
          Stats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onTabPress && onTabPress("add")}
        className="flex items-center justify-center group"
      >
        <Feather 
          name="plus-circle" 
          size={22} 
          className={currentTab === "add" ? "text-primary scale-110" : "text-zinc-400"} 
        />
        <Text className={`text-[10px] font-semibold mt-1 ${currentTab === "add" ? "text-primary font-bold" : "text-zinc-400"}`}>
          Add
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onTabPress && onTabPress("profile")}
        className="flex items-center justify-center group"
      >
        <Feather 
          name="user" 
          size={22} 
          className={currentTab === "profile" ? "text-primary" : "text-zinc-400"} 
        />
        <Text className={`text-[10px] font-semibold mt-1 ${currentTab === "profile" ? "text-primary" : "text-zinc-400"}`}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavBar;

