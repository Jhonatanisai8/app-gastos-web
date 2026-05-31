import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

export function RegistrationLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //extraemos las funciones
  const { login, loading, error, authData } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor llena todos los campos.");
      return;
    }

    try {
      const data = await login(email, password);
      console.log(data);
      Alert.alert("Login exitoso");
    } catch (error) {
      Alert.alert(
        "Error de Autenticación",
        error.message || "Credenciales incorrectas",
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface w-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="px-margin-edge py-section-padding"
      >
        <View className="w-full max-w-md bg-surface-container-lowest rounded-[24px] p-6 shadow-sm flex flex-col gap-stack-lg self-center border border-surface-container/50">
          {/* Brand Header */}
          <View className="flex flex-col items-center gap-stack-sm text-center">
            {/* Wallet Icon */}
            <View className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-stack-md shadow-sm">
              <Ionicons name="wallet-outline" size={32} color="#ffffff" />
            </View>
            <Text className="text-3xl font-bold text-primary tracking-tight">
              Financial Zen
            </Text>
            <Text className="text-sm text-on-surface-variant font-medium">
              La gestión de tus gastos en un solo lugar.
            </Text>
          </View>

          {/* Login Form */}
          <View className="flex flex-col gap-gutter">
            {/* Email Field */}
            <View className="flex flex-col gap-stack-sm">
              <Text className="text-sm font-semibold text-on-surface-variant">
                Email
              </Text>
              <View className="relative flex-row items-center">
                <View className="absolute left-3 z-10">
                  <Feather name="mail" size={18} color="#bfc9c3" />
                </View>
                <TextInput
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base text-on-surface outline-none"
                  placeholder="name@example.com"
                  placeholderTextColor="#bfc9c3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="flex flex-col gap-stack-sm">
              <Text className="text-sm font-semibold text-on-surface-variant">
                Password
              </Text>
              <View className="relative flex-row items-center">
                <View className="absolute left-3 z-10">
                  <Feather name="lock" size={18} color="#bfc9c3" />
                </View>
                <TextInput
                  className="w-full pl-10 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base text-on-surface outline-none"
                  placeholder="••••••••"
                  placeholderTextColor="#bfc9c3"
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 z-10 p-1"
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  activeOpacity={0.6}
                >
                  <Feather
                    name={secureTextEntry ? "eye-off" : "eye"}
                    size={18}
                    color="#bfc9c3"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="flex flex-row justify-end mt-1"
                activeOpacity={0.6}
              >
                <Text className="text-xs font-semibold text-primary">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Actions */}
            <View className="flex flex-col gap-stack-md mt-stack-sm">
              <TouchableOpacity
                className="w-full h-12 bg-primary items-center justify-center rounded-lg shadow-sm active:opacity-90"
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Text className="text-on-primary font-semibold text-sm">
                  Iniciar Sesión
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-full h-12 bg-secondary-fixed items-center justify-center rounded-lg active:opacity-90"
                activeOpacity={0.8}
              >
                <Text className="text-on-secondary-fixed-variant font-semibold text-sm">
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegistrationLogin;
