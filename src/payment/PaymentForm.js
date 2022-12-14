import React, {useState} from 'react';
import {useElements, CardElement, useStripe} from '@stripe/react-stripe-js'

const PaymentForm = (props) => {
    const elements = useElements();
    const stripe = useStripe();

    const [stripeErrorMsg, setStripeErrorMsg] = useState("")
    const [backendErrorMsg, setBackendErrorMsg] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")

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
            setBackendErrorMsg(backendError.message)
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
            setStripeErrorMsg(stripeError.message)
            console.log(stripeError.message);
            return;
        }

        setPaymentStatus(paymentIntent.status)

        console.log(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`)

    }


    return (
        <div>
            <h3 style={{textAlign: "center"}}>Checkout</h3>
                { paymentStatus !== "succeeded" ?
                    <form id="payment-form" onSubmit={handleSubmit}>
                    <div style={{padding: "10px 20px",border: "1px solid grey", borderRadius: "10px"}}>
                        <CardElement />
                        </div>
                        { stripeErrorMsg !== "" ? <p style={{color: "red"}}>{stripeErrorMsg}</p> : <></> }
                        { backendErrorMsg !== "" ? <p style={{color: "red"}}>{stripeErrorMsg}</p> : <></> }
                        <br/>
                        <button 
                            style={{
                                fontSize: "15px",
                                marginLeft: "45%", 
                                padding: "10px 20px",
                                backgroundColor: "#0082ff",
                                color: "white",
                                border: "1px solid white",
                                borderRadius: "5px"
                            }}
                        >
                            Pay
                        </button>
                    </form>
                    :
                    <div style={{textAlign: "center", paddingTop: "10px"}}>
                        <h3 style={{color: "green"}}>Payment Sucessful</h3>
                        <p style={{color: "grey"}}>Click anywhere outside to close this window</p>
                    </div>
                }
            
        </div>
    )
}

export default PaymentForm;