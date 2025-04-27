import { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { ItemCard } from "@/components/ItemCard";
import { useBasket } from "@/context/basketcontext";
import { Host } from ".";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { useAuth } from "@/context/authcontext";

interface Item {
  id: number;
  name: string;
  description: string;
  price: Float;
}

export default function ItemScreen({ navigation }: { navigation: any }) {
  const { addToBasket } = useBasket();
  const [items, setItems] = useState<Item[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    fetch(Host + "/items", {
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(accessToken);
        console.log(json);
        setItems(json);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.BasketButton}
        onPress={() => navigation.navigate("basket")}
      >
        <Text>Basket</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        {items &&
          items.map((item) => (
            <ItemCard
              key={item.id}
              addToBasket={() => addToBasket(item)}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
  },
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
