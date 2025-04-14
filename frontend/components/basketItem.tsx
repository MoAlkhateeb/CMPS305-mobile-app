import { Button } from "@react-navigation/elements";
import { DIRECTION_RIGHT } from "hammerjs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBasket } from "@/context/basketcontext";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface BasketCardProps {
  removeFromBasket: (name: String) => void;
  name: String;
  description: String;
  price: Float;
}

export function BasketItem({
  removeFromBasket,
  name,
  description,
  price,
}: BasketCardProps) {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </SafeAreaView>
      <Text style={styles.removeButton}>{price / 100.0}$</Text>
      <TouchableOpacity
        onPress={() => removeFromBasket(name)}
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
