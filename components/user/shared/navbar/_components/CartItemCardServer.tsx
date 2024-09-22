// CartItemCardServer.tsx (Server Component)
import React from 'react';
import { CartItemCard } from './CartItemCard';
import { Product } from '@prisma/client';


const CartItemCardServer = ({SingleProduct}: { SingleProduct: Product}) => {
  return <CartItemCard product={SingleProduct} />;
};

export default CartItemCardServer;
