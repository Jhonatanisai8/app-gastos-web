import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCategories } from "../hooks/useCategories";
import { useExpense } from "../hooks/useExpense";

const mapIconName = (apiIcon, isSelected) => {
  switch (apiIcon) {
    case "utensils":
      return isSelected ? "restaurant" : "restaurant-outline";
    case "car":
      return isSelected ? "car" : "car-outline";
    case "home":
      return isSelected ? "home" : "home-outline";
    case "film":
      return isSelected ? "film" : "film-outline";
    case "heartbeat":
    case "heart":
      return isSelected ? "heart" : "heart-outline";
    default:
      return isSelected ? "list" : "list-outline";
  }
};

export function AddExpense({ token, onBack, onSave }) {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [note, setNote] = useState("");

  const {
    data: categoriesResponse,
    loading: loadingCategories,
    obtenerListadoCategories,
  } = useCategories();
  const { loading: saving, registroExpense } = useExpense();

  const categoriesList = categoriesResponse?.data || [];

  useEffect(() => {
    if (token) {
      obtenerListadoCategories(token)
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            setSelectedCategory(res.data[0].id);
          }
        })
        .catch((err) => {
          console.error("Error loading categories:", err);
        });
    }
  }, [token, obtenerListadoCategories]);

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

  const handleSave = async () => {
    const category = categoriesList.find((c) => c.id === selectedCategory);
    if (!category) return;

    if (parseFloat(displayAmount) <= 0) {
      alert("Por favor ingrese un monto mayor a 0");
      return;
    }

    const expensePayload = {
      title: note || `Gasto de ${category.name}`,
      description: note,
      amount: parseFloat(displayAmount) || 0,
      expenseDate: new Date().toISOString().split("T")[0],
      type: "VARIABLE",
      categoryId: category.id,
    };

    try {
      const response = await registroExpense(expensePayload, token);
      if (onSave) {
        onSave(response.data);
      }
    } catch (err) {
      console.error("Error al registrar gasto:", err);
    }
  };

  return (
    <View className="flex-1 bg-background w-full">
      <View className="flex-1 justify-between pb-24">
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
                S/
              </Text>
              <Text className="text-headline-xl font-extrabold text-primary text-5xl">
                {displayAmount}
              </Text>
            </View>
          </View>

          <View className="w-full my-4 justify-center items-center min-h-[96px]">
            {loadingCategories ? (
              <ActivityIndicator size="large" color="#0060ac" />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
              >
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => setSelectedCategory(cat.id)}
                      activeOpacity={0.8}
                      className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl border transition-all ${
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
                          name={mapIconName(cat.icon, isSelected)}
                          size={20}
                          color={
                            isSelected ? "#ffffff" : cat.color || "#0060ac"
                          }
                        />
                      </View>
                      <Text
                        className={`text-[11px] font-semibold ${
                          isSelected
                            ? "text-on-secondary-container font-bold"
                            : "text-on-surface-variant"
                        }`}
                        numberOfLines={1}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
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

          <View className="px-margin-edge">
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
              disabled={saving || loadingCategories}
              className="w-full h-14 bg-primary rounded-xl flex-row items-center justify-center shadow-lg active:scale-95"
            >
              {saving ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-body-lg font-bold text-on-primary">
                  Guardar Gasto
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default AddExpense;
