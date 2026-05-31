import React, { useState } from "react";
import { View } from "react-native";
import "./global.css";
import RegistrationLogin from "./src/screens/RegistrationLogin";
import Home from "./src/screens/Home";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <View className="flex-1 bg-surface">
      {user ? (
        <Home onLogout={() => setUser(null)} userData={user} />
      ) : (
        <RegistrationLogin onLoginSuccess={(data) => setUser(data)} />
      )}
    </View>
  );
}
