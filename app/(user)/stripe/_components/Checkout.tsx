'use client'
import React from 'react'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutClient from './CheckoutClient'
import { CartItem } from '@/context/CartContext'

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLI_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Checkout = ({product ,amount} : {product: CartItem[], amount: number}) => {
    console.log('the product is  ............................................//////////////////////')
    console.log(product)

  return (
    <div>
        pay the amount of £{amount}
        <div>
            <Elements 
            stripe={stripePromise}
            options={{
                mode: 'payment',
                amount: amount,
                currency: 'gbp'
            }}
            >
                <CheckoutClient product={product} amount={amount} />
            </Elements>
        </div>
    </div>
  )
}

export default Checkout