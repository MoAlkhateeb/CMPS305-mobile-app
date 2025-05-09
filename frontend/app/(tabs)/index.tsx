import { createStackNavigator } from "@react-navigation/stack";
import ItemScreen from "./itemScreen";
import BasketScreen from "./basketScreen";
import { BasketProvider } from "@/context/basketcontext";
import LoginScreen from "./loginScreen";
import RegisterScreen from "./RegisterScreen";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useState } from "react";
import { AuthProvider } from "@/context/authcontext";

const Stack = createStackNavigator();

export const Host = "https://cmps305-mobile-app-production.up.railway.app";
export const paymentKey = process.env.EXPO_PUBLIC_STRIPE_KEY;

export default function App() {
  return (
    <StripeProvider publishableKey={paymentKey!}>
      <BasketProvider>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="items"
              component={ItemScreen}
              options={{ title: "items", headerShown: true }}
            />
            <Stack.Screen
              name="basket"
              component={BasketScreen}
              options={{ title: "basket", headerShown: true }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register", headerShown: true }}
            />
          </Stack.Navigator>
        </AuthProvider>
      </BasketProvider>
    </StripeProvider>
  );
}
