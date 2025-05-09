import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface ItemCardProps {
  addToBasket: () => void;
  name: String;
  description: String;
  price: Float;
}

export function ItemCard({
  addToBasket,
  name,
  description,
  price,
}: ItemCardProps) {
  const itemprice = price / 100.0;
  return (
    <View style={styles.container}>
      <Text id="ItemName" style={styles.TextName}>
        {name}
      </Text>
      <Text id="ItemPrice" style={styles.ItemPrice}>
        {itemprice}$
      </Text>
      <Text id="ItemDescription" style={styles.TextDescription}>
        {description}
      </Text>
      <TouchableOpacity style={styles.AddButton} onPress={addToBasket}>
        <Text style={styles.AddButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6ffff",
  },
  TextName: {
    fontSize: 30,
    fontWeight: "900",
  },
  TextDescription: {
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 20,
  },
  AddButton: {
    width: "50%",
    height: "15%",
    backgroundColor: "#00cc99",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#33adff",
    justifyContent: "center",
    alignItems: "center",
  },
  AddButtonText: {
    color: "#fff",
    padding: 5,
  },
  ItemPrice: {
    fontWeight: 700,
  },
});
