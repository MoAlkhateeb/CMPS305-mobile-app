import { useState, useEffect } from "react";
import { ItemCard } from "@/components/ItemCard";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BasketItem } from "@/components/basketItem";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    fetch("http://192.168.134.142:8080/items")
      .then((res) => res.json())
      .then(res);
  });
  return (
    <View>
      <TouchableOpacity onPress={() => {}}>
        <Text>basket</Text>
      </TouchableOpacity>
      <ItemCard />
    </View>
  );
}
