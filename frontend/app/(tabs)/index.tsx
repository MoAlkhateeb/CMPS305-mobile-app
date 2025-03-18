import { Component, useState } from "react";
import { ItemCard } from "@/components/ItemCard";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BasketItem } from "@/components/basketItem";
import { createStackNavigator } from "@react-navigation/stack";
import ItemScreen from "./itemScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "@/components/loginScreen";
import basketScreen from "./basket";
import { title } from "process";
const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer>
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
          component={basketScreen}
          options={{ title: 'basket' headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
