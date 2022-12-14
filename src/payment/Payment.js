import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const publishableKey = "pk_test_51MDemNKaNeuM0GXPoi67orj68jgvsbftQ9UV8iOnXg1MiykkGvm18O1u6ZS6TEuPsRUw6ljT6ST0jxCbf33rfsSw00G1Jou2Af"
const stripePromise = loadStripe(publishableKey)

const Payment = (props) => {
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                <div style={{padding: "0 10%"}}>
                    <PaymentForm order={props.order} />
                </div>
            </Elements>
        </div>
    )
}

export default Payment;
