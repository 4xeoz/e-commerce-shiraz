import { CartItem } from '@/context/CartContext';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { cart } = await req.json(); 
    console.log('the server cart is ')
    console.log(cart)

    const totalAmount = calculateTotalAmountToPay(cart);

    // Return the total amount as a JSON response
    return NextResponse.json({ amountToPay: totalAmount });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Failed to calculate total amount' }, { status: 500 });
  }
}


function calculateTotalAmountToPay(cart : CartItem[]): number {
  let totalAmountToPay = 0;

  for (const product of cart) {
    totalAmountToPay += product.priceInCents * product.quantity;
  }

  return totalAmountToPay;
}