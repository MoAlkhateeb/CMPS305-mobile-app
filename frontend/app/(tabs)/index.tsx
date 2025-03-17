import { useState } from "react";
import { ItemCard } from "@/components/ItemCard";
import { View, Text, StyleSheet } from "react-native";
import { BasketItem } from "@/components/basketItem";

export default function HomeScreen() {
  return (
    <>
      <View>
        <ItemCard />
        <Text>kofta</Text>
        <BasketItem></BasketItem>
      </View>
    </>
  );
}
