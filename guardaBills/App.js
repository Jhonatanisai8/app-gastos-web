import { Text, View } from "react-native";
import React, { Component } from "react";
import "./global.css";

export default class App extends Component {
  render() {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="bg-black text-xl font-bold p-1 text-white"> App </Text>
      </View>
    );
  }
}
