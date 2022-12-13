import React from 'react';
import {useElements, CardElement, useStripe} from '@stripe/react-stripe-js'

const PaymentForm = (props) => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        // Creating payment intent on server
        const {error: backendError, clientSecret} = await fetch('https://localhost:7190/Main/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: props.cost,
                paymentMethodType: 'card',
                currency: 'cad'
            }),
        }).then(r => r.json());

        if(backendError) {
            console.log(backendError.message);
            return;
        }

        console.log("Payment Intent Created")

        // Confirm payment on client
        const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
        )

        if(stripeError) {
            console.log(stripeError.message);
            return;
        }

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
