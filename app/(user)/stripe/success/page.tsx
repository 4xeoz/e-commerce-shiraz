import { notFound } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)


const page = async ({searchParams} : {searchParams : { payment_intent : string }}) => {



  return (
    <div>sucess thank you for your purshese
    </div>
  )
}

export default page