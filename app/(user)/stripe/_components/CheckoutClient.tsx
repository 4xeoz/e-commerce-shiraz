"use client";
import { CartItem } from "@/context/CartContext";
import { useElements, useStripe, PaymentElement, LinkAuthenticationElement } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { db } from "@/auth/db";

const CheckoutClient = ({ product, amount }: { product: CartItem[], amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState<string>('')


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe or Elements is not loaded");
      setLoading(false);
      return;
    }

    try {
      // Submit payment data first
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }

      // Confirm payment
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/stripe/success?amount=${amount}`,
        },
      });

      if (paymentError) {
        setError(paymentError.message);
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (dbError) {
      setError("Order creation failed");
      setLoading(false);
      console.error("Error creating order:", dbError);
    }
  };

  function getProductIdAndQuantity(cartItems: CartItem[]): { id: string; quantity: number }[] {
    return cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));
  }

  const mappedProducts = getProductIdAndQuantity(product);
  console.log('the mapped products are this............................')
  console.log(mappedProducts)

  useEffect(() => {
    if (amount) {
      // Fetch client secret only if amount is valid
      fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount,
          products: mappedProducts,
        }),

      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("Client secret not found in the response:", data);
            setError("Payment setup failed.");
          }
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
          setError("Failed to initiate payment process.");
        });
    }
  }, [amount]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {clientSecret ?
        <div>
           <PaymentElement /> 
           <LinkAuthenticationElement onChange={e => setEmail(e.value.email)}/>
        </div>
        
         : <p>Loading...</p>}
        
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className="p-5 w-full bg-slate-200 rounded-lg mt-10"
          disabled={loading || !stripe || !clientSecret}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutClient;
