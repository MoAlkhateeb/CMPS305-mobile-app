import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BasketItem } from "@/components/basketItem"; // Import your BasketItem component

interface Item {
  id: number;
  name: String;
  description: String;
}

export default function BasketScreen({ route }: { route: any }) {
  const [basket, setBasket] = useState<Item[]>(route.params.basket || []);

  const removeFromBasket = (name: String) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.name !== name)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basket</Text>
      {basket.length > 0 ? (
        basket.map((item) => (
          <BasketItem
            key={item.id}
            name={item.name}
            description={item.description}
            removeFromBasket={removeFromBasket}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>Your basket is empty!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
