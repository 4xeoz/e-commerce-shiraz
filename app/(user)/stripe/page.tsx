import React from 'react'
import Checkout from './_components/Checkout'
import { Product } from '@prisma/client';
import { CartItem } from '@/context/CartContext';

interface StripePageProps {
  searchParams: {
    product?: string; // This matches the query param name
  };
}


const page = async ({ searchParams }: StripePageProps) => {
  const encodedProduct = searchParams.product;

  let cart: CartItem[] = [];
  if (encodedProduct) {
    try {
      cart = JSON.parse(decodeURIComponent(encodedProduct));
    } catch (error) {
      console.error('Error decoding product data:', error);
    }
  }

  console.log('the cart server is  ............................................//////////////////////')
  console.log(cart)

  async function getPaymentAmount(cart : CartItem[]): Promise<number> {
    try {
      const response = await fetch('http://localhost:3000/api/stripe/get-payment-amount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.amountToPay;
    } catch (error) {
      throw error; 
    }
  }
  


const amountToPay = await getPaymentAmount(cart as CartItem[]);
  return (
    <div>
        {<h1>{amountToPay}</h1>}
        <Checkout product={ cart } amount={amountToPay}/>
    </div>
  )
}

export default page

