import { Text, View } from "react-native";
import React, { Component } from "react";
import "./global.css";
import RegistrationLogin from "./src/screens/RegistrationLogin";

export default class App extends Component {
  render() {
    return (
      <View className="flex-1 bg-surface">
        <RegistrationLogin />
      </View>
    );
  }
}
