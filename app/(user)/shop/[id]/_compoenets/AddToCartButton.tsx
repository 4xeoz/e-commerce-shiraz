'use client'

import { Product } from '@prisma/client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

const AddToCartButton = ({product} : {product : Product}) => {
    const {id, name, priceInCents, imagePath} = product
    const { increaseItem } = useCart();
  return (
    <div>
        <Button onClick={() => increaseItem(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
        </Button>
    </div>
  )
}

export default AddToCartButton