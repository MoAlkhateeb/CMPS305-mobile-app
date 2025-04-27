import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { AccessToken, Host } from "@/app/(tabs)";
export async function createIntent(amount: number) {
  return await axios
    .post(
      Host + "/create-payment-intent",
      {
        amount: amount,
      },
      {
        headers: {
          Authorization: `${AccessToken}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating payment intent:", error);
      throw error;
    });
}

export async function confirmPayment(clientSecret: string) {
  const stripe = useStripe();
  if (!stripe) {
    throw new Error("Stripe is not initialized");
  }
  try {
    const paymentIntent = await stripe.confirmPayment(clientSecret, {
      paymentMethodType: "Card",
    });
    return paymentIntent;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
}

export async function cancelPayment(clientSecret: string) {
  const stripe = useStripe();
  if (!stripe) {
    throw new Error("Stripe is not initialized");
  }
  try {
  } catch (error) {
    console.error("Error cancelling payment:", error);
    throw error;
  }
}
