import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const CATEGORIES = [
  {
    id: 1,
    name: "Food",
    icon: "restaurant-outline",
    activeIcon: "restaurant",
    color: "#0060ac",
  },
  {
    id: 2,
    name: "Transport",
    icon: "car-outline",
    activeIcon: "car",
    color: "#003527",
  },
  {
    id: 3,
    name: "Housing",
    icon: "home-outline",
    activeIcon: "home",
    color: "#273034",
  },
  {
    id: 4,
    name: "Clothes",
    icon: "shirt-outline",
    activeIcon: "shirt",
    color: "#ba1a1a",
  },
  {
    id: 5,
    name: "Health",
    icon: "medical-outline",
    activeIcon: "medical",
    color: "#0060ac",
  },
];

export function AddExpense({ onBack, onSave }) {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [note, setNote] = useState("");

  const handleKeyPress = (val) => {
    if (val === "backspace") {
      setAmount((prev) => prev.slice(0, -1));
    } else if (val === ".") {
      if (!amount.includes(".")) {
        setAmount((prev) => (prev === "" ? "0." : prev + "."));
      }
    } else {
      if (amount.includes(".")) {
        const parts = amount.split(".");
        if (parts[1] && parts[1].length >= 2) {
          return; // Max 2 decimals
        }
      }
      if (amount === "0" && val !== ".") {
        setAmount(val);
      } else {
        setAmount((prev) => prev + val);
      }
    }
  };

  const displayAmount = amount === "" ? "0.00" : amount;

  const handleSave = () => {
    const category = CATEGORIES.find((c) => c.id === selectedCategory);
    if (onSave) {
      onSave({
        amount: parseFloat(displayAmount) || 0,
        category: category ? category.name : "",
        note,
      });
    }
  };

  return (
    <View className="flex-1 bg-background w-full">
      <View className="bg-white border-b border-zinc-100 px-5 h-16 w-full flex-row justify-between items-center shadow-sm">
        <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} className="text-on-surface" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-primary">Financial Zen</Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 justify-between pb-6">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center justify-center py-stack-lg px-margin-edge mt-stack-md">
            <Text className="text-label-md font-semibold text-on-surface-variant mb-stack-sm">
              Amount
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-headline-lg font-bold text-primary-container">
                $
              </Text>
              <Text className="text-headline-xl font-extrabold text-primary text-5xl">
                {displayAmount}
              </Text>
            </View>
          </View>

          <View className="w-full my-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            >
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    activeOpacity={0.8}
                    className={`flex flex-col items-center justify-center w-20 h-24 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-surface-container-high border-secondary-container shadow-md"
                        : "bg-surface-container-lowest border-outline-variant/30 opacity-70"
                    }`}
                  >
                    <View
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isSelected
                          ? "bg-secondary-container"
                          : "bg-surface-container-low"
                      }`}
                    >
                      <Ionicons
                        name={isSelected ? cat.activeIcon : cat.icon}
                        size={20}
                        color={isSelected ? "#ffffff" : cat.color}
                      />
                    </View>
                    <Text
                      className={`text-[11px] font-semibold ${
                        isSelected
                          ? "text-on-secondary-container font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View className="px-margin-edge my-stack-md">
            <View className="relative w-full flex-row items-center bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-3 shadow-sm">
              <Feather
                name="edit-3"
                size={18}
                className="text-on-surface-variant mr-2"
              />
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Add a short note (optional)"
                placeholderTextColor="#707974"
                className="flex-1 text-body-md text-on-surface outline-none"
              />
            </View>
          </View>
        </ScrollView>

        <View className="px-margin-edge mt-stack-lg mb-4">
          <View className="flex-col gap-2">
            <View className="flex-row gap-2">
              {["1", "2", "3"].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handleKeyPress(num)}
                  activeOpacity={0.7}
                  className="flex-1 h-14 bg-surface-container-lowest shadow-sm border border-zinc-100 rounded-xl items-center justify-center active:scale-95"
                >
                  <Text className="text-headline-md font-bold text-on-surface">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row gap-2">
              {["4", "5", "6"].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handleKeyPress(num)}
                  activeOpacity={0.7}
                  className="flex-1 h-14 bg-surface-container-lowest shadow-sm border border-zinc-100 rounded-xl items-center justify-center active:scale-95"
                >
                  <Text className="text-headline-md font-bold text-on-surface">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row gap-2">
              {["7", "8", "9"].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handleKeyPress(num)}
                  activeOpacity={0.7}
                  className="flex-1 h-14 bg-surface-container-lowest shadow-sm border border-zinc-100 rounded-xl items-center justify-center active:scale-95"
                >
                  <Text className="text-headline-md font-bold text-on-surface">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => handleKeyPress(".")}
                activeOpacity={0.7}
                className="flex-1 h-14 bg-surface-container-lowest shadow-sm border border-zinc-100 rounded-xl items-center justify-center active:scale-95"
              >
                <Text className="text-headline-md font-bold text-on-surface">
                  .
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleKeyPress("0")}
                activeOpacity={0.7}
                className="flex-1 h-14 bg-surface-container-lowest shadow-sm border border-zinc-100 rounded-xl items-center justify-center active:scale-95"
              >
                <Text className="text-headline-md font-bold text-on-surface">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleKeyPress("backspace")}
                activeOpacity={0.7}
                className="flex-1 h-14 bg-surface-container-lowest shadow-sm border border-zinc-100 rounded-xl items-center justify-center active:scale-95"
              >
                <Feather
                  name="delete"
                  size={20}
                  className="text-on-surface-variant"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-margin-edge">
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.9}
            className="w-full h-14 bg-primary rounded-xl flex-row items-center justify-center shadow-lg active:scale-95"
          >
            <Text className="text-body-lg font-bold text-on-primary">
              Guardar Gasto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AddExpense;
