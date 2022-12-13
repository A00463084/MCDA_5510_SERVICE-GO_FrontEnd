import React from 'react';
import {useElements, CardElement, useStripe} from '@stripe/react-stripe-js'

const PaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        // Creating payment intent on server
        const {clientSecret} = await fetch('https://localhost:7190/Main/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'cad'
            }),
        }).then(r => r.json());
        console.log("Payment Intent Created")

        // Confirm payment on client
        const {paymentIntent} = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
        )
        console.log(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`)

    }


    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement />
                <button>Pay</button>
            </form>
        </div>
    )
}

export default PaymentForm;
