import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BasketItem } from "@/components/basketItem";
import { useBasket } from "@/context/basketcontext";
import { ScrollView } from "react-native-gesture-handler";
import { PaymentSheet, useStripe } from "@stripe/stripe-react-native";
import { confirmPayment, createIntent } from "@/services/paymentServices";

export default function BasketScreen({ navigation }: { navigation: any }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { basket, removeFromBasket } = useBasket();
  const screenWidth = Dimensions.get("window").width;
  let getTotal = () => {
    let total = 0;
    basket.forEach((item) => (total += item.amount * item.price));
    return total;
  };

  const initializePaymentSheet = async (client_secret: string) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: client_secret,
      merchantDisplayName: "Test",
    });
    if (error) Alert.alert(`error in stripe: ${error.code}`);
  };

  return (
    <View style={styles.container}>
      {basket.length > 0 ? (
        <>
          <ScrollView>
            {basket.map((item) => (
              <BasketItem
                key={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                amount={item.amount}
                removeFromBasket={() => removeFromBasket(item.name)}
              />
            ))}
          </ScrollView>
          <View style={[styles.totalcontainer, { width: screenWidth }]}>
            <Text style={styles.totaltext}>Total:{getTotal() / 100}$</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={async () => {
                const client_secret = await createIntent(getTotal());
                await initializePaymentSheet(client_secret);
                const { error } = await presentPaymentSheet();
                if (error) {
                  Alert.alert(`Error code: ${error.code}`, error.message);
                } else {
                  await confirmPayment(client_secret);
                  Alert.alert("Success", "Your order is confirmed");
                }
              }}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Your basket is empty!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
  totalcontainer: {
    width: "100%",
  },
  totaltext: {
    fontWeight: 900,
    fontSize: 20,
  },
  checkoutText: {
    fontWeight: 800,
    fontSize: 15,
    padding: 2,
    color: "#fff",
  },
  checkoutBtn: {
    width: 200,
    backgroundColor: "#00cc99",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
});
