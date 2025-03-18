import { useState, useEffect } from "react";
import { ItemCard } from "@/components/ItemCard";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Item {
  id: number;
  name: String;
  description: String;
}

export default function ItemScreen({ navigation }: { navigation: any }) {
  const [items, setItems] = useState<Item[]>([]);
  const [basket, setBasket] = useState<Item[]>([]);

  useEffect(() => {
    fetch("http:/localhost:8080/items")
      .then((res) => res.json())
      .then((json) => setItems(json))
      .catch((err) => console.log(err));
  }, []);

  const addToBasket = (item: Item) => {
    setBasket((prevBasket) => [...prevBasket, item]);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.BasketButton}
        onPress={() => {
          navigation.navigate("basket", { basket });
        }}
      >
        <Text>Basket</Text>
      </TouchableOpacity>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          addToBasket={() => addToBasket(item)}
          name={item.name}
          description={item.description}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  BasketButton: {
    backgroundColor: "#33cccc",
    width: 75,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
