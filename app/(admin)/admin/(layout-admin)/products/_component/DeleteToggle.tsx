'use client';
import React from 'react'
import { deleteProduct } from '../../_actions/admin'

interface DeleteToggleProps {
  productId: string;
  imagePath: string;
}

const DeleteToggle =  ({productId, imagePath}: DeleteToggleProps) => {
  return (
    <div className='text-destructive' onClick={async () => {await deleteProduct(productId, imagePath)}}>
        Delete
    </div>
  )
}

export default DeleteToggle