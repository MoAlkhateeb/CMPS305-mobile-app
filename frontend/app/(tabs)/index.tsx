import { Component, useState } from "react";
import { ItemCard } from "@/components/ItemCard";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BasketItem } from "@/components/basketItem";
import { createStackNavigator } from "@react-navigation/stack";
import ItemScreen from "./itemScreen";
import BasketScreen from "./basketScreen";
import { title } from "process";
import LoginScreen from "./loginScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="items"
        component={ItemScreen}
        options={{ title: "items", headerShown: true }}
      />
      <Stack.Screen
        name="basket"
        component={BasketScreen}
        options={{ title: "basket", headerShown: true }}
      />
    </Stack.Navigator>
  );
}
