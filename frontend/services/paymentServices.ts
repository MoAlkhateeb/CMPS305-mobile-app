import axios from 'axios'
import { useStripe } from '@stripe/stripe-react-native'
export async function createIntent(amount: number) {
    return await axios.post('http://192.168.1.122:8080/create-payment-intent', {
        amount: amount,
    })
        .then(response => response.data)
        .catch(error => {
        console.error('Error creating payment intent:', error)
        throw error
        })
}

export async function confirmPayment(clientSecret: string) {
    const stripe = useStripe()
    if (!stripe) {
        throw new Error('Stripe is not initialized')
    }
    try {
        const paymentIntent = await stripe.confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
        })
        return paymentIntent;
    } catch (error) {
        console.error('Error confirming payment:', error)
        throw error
    }
}

export async function cancelPayment(clientSecret: string) {
    const stripe = useStripe();
    if (!stripe) {
        throw new Error('Stripe is not initialized')
    }
    try {
        

    } catch (error) {
        console.error('Error cancelling payment:', error)
        throw error
    }
}