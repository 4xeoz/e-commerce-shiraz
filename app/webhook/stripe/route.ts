 import { NextRequest } from "next/server";
import Stripe from "stripe";
import { db } from "@/auth/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature") as string, process.env.STRIPE_WEBHOOK_SECRET as string);

  if(event.type === 'charge.succeeded') {
    const charge = event.data.object
    const product = JSON.parse(charge.metadata.product)
    const userEmail = event.data.object.billing_details.email as string
    const postCode = event.data.object.billing_details.address?.postal_code


    const order = await db.order.create({
      data: {
        userEmail: userEmail,
        pricePaidInCents: charge.amount,
        products: {
          create: product.map((p: any) => ({
            product: {
              connect: { id: p.id },
            },
            quantity: p.quantity,
          })),
        },
        postCode: postCode,
      },
    });

    return new Response('OK');
  }
  return new Response('Not OK');
}