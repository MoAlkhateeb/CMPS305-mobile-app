import { useState, useEffect } from "react";
import { ItemCard } from "@/components/ItemCard";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BasketItem } from "@/components/basketItem";

interface Item {
  id: number;
  name: String;
  description: String;
}

export default function ItemScreen() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("http://192.168.134.142:8080/items")
      .then((res) => res.json())
      .then((json) => setItems(json))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={() => {}}>
        <Text>basket</Text>
      </TouchableOpacity>
      {items.map((item) => (
        <ItemCard
          addToBasket={() => {}}
          name={item.name}
          description={item.description}
        />
      ))}
    </View>
  );
}
