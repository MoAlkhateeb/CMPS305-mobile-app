import { Button } from "@react-navigation/elements";
import { DIRECTION_RIGHT } from "hammerjs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function BasketItem() {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.itemName}>Name</Text>
        <Text style={styles.itemDescription}>Description</Text>
      </SafeAreaView>
      <TouchableOpacity onPress={() => {}} style={styles.removeButton}>
        <Text>X</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#e6ffff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  removeButton: {
    flexDirection: "column",
    justifyContent: "center",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 18,
    fontWeight: 300,
  },
});
