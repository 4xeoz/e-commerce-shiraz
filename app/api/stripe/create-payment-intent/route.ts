import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body
        const { amount, products } = await req.json();

        // Create the payment intent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'gbp',
            automatic_payment_methods: { enabled: true },
            metadata: {
                product: JSON.stringify(products)
              },       
        });

        // Return the client_secret to the client
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);

        // Return a 500 status with an error message
        return NextResponse.json({ message: 'An error occurred while creating the payment intent' }, { status: 500 });
    }
}