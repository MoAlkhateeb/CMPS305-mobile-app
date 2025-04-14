import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { useState } from "react";

interface BasketCardProps {
  removeFromBasket: (name: String) => void;
  name: String;
  description: String;
  price: Float;
  amount: number;
}

export function BasketItem({
  removeFromBasket,
  name,
  description,
  price,
  amount,
}: BasketCardProps) {
  const [itemCount, setItemCount] = useState(amount);
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
        <Text style={styles.itemDescription}>
          Price:{price / 100.0}$ Qty:{itemCount} Total Price:
          {(itemCount * price) / 100.0}
        </Text>
      </SafeAreaView>
      <Text style={styles.removeButton}></Text>

      <TouchableOpacity
        onPress={() => {
          removeFromBasket(name);
          setItemCount(itemCount - 1);
        }}
        style={styles.removeButton}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    margin: 5,
    backgroundColor: "#e6ffff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 18,
    fontWeight: 300,
  },
  itemPrice: {
    flexDirection: "column",
    justifyContent: "center",
  },
  removeButton: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
