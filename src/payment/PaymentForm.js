import React, { useState } from "react";
import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js";
import './payment.css'

const PaymentForm = (props) => {
  const elements = useElements();
  const stripe = useStripe();

  const [nameOnCard, setNameOnCard] = useState("");
  const [validNameOnCard, setValidNameOnCard] = useState(true);
  const [stripeErrorMsg, setStripeErrorMsg] = useState("");
  const [backendErrorMsg, setBackendErrorMsg] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [payButtonDisable, setPayButtonDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPayButtonDisable(true)

    const name_regex = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g);
    if (name_regex.test(nameOnCard) === false) {
      setValidNameOnCard(false)
      setPayButtonDisable(false)
      return
    } else {
      setValidNameOnCard(true)
    }

    if (!stripe || !elements) {
      setPayButtonDisable(false)
      return;
    }

    // Creating payment intent on server
    const { error: backendError, clientSecret } = await fetch(
      "https://localhost:7190/Main/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(props.order.cost) * 100,
          paymentMethodType: "card",
          currency: "cad",
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      setBackendErrorMsg(backendError.message);
      setPayButtonDisable(false)
      console.log(backendError.message);
      return;
    }

    console.log("Payment Intent Created");

    // Confirm payment on client
    const {
      error: stripeError,
      paymentIntent,
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (stripeError) {
      setStripeErrorMsg(stripeError.message);
      setPayButtonDisable(false)
      console.log(stripeError.message);
      return;
    }

    console.log(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);

    setPaymentStatus(paymentIntent.status);

    if (paymentIntent.status === "succeeded") {
      console.log("Creating order");

      fetch("https://localhost:7190/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: props.order.selectedDate,
          time_slot: props.order.selectedTime,
          emp_id: parseInt(props.order.emp_id),
          user_id: parseInt(localStorage.getItem('user_id')),
        }),
      })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          console.log(r);
        });
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Checkout</h3>
      {paymentStatus !== "succeeded" ? (
        <form id="payment-form" onSubmit={handleSubmit}>
          <div
            style={{
              padding: "10px 20px",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
          >
            <input 
              type="text"
              value={nameOnCard}
              onChange={(e) => {
                setNameOnCard(e.target.value);
              }}
              style={{fontSize: "14px", border: "0", width: "100%"}} 
              placeholder="Name on Card"
              required />
          </div>
          {validNameOnCard === false ? <p style={{color: "red"}}>Name can not have numbers or special characters</p> : ""}
          <br/>
          <div
            style={{
              padding: "10px 20px",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
          >
            <CardElement />
          </div>
          {stripeErrorMsg !== "" ? (
            <p style={{ color: "red" }}>{stripeErrorMsg}</p>
          ) : (
            <></>
          )}
          {backendErrorMsg !== "" ? (
            <p style={{ color: "red" }}>{stripeErrorMsg}</p>
          ) : (
            <></>
          )}
          <br />
          <button style={{ backgroundColor:  payButtonDisable ? '#e5e5e5' : '#0082ff' }} disabled={payButtonDisable}>
            Pay
          </button>
        </form>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "10px" }}>
          <h3 style={{ color: "green" }}>Payment Sucessful</h3>
          <p style={{ color: "grey" }}>
            Click anywhere outside to close this window
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
