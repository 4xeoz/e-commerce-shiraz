'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { Product } from '@prisma/client'
import { updateProduct } from '../../../../_actions/admin'

const EditFrom = ({product}: {product: Product}) => {
    const [PriceInCents, setPriceInCents] = useState<number>()
    const [file, setFile] = useState<File>()
    const [error, action] = useFormState(updateProduct.bind(null, product?.id as string), {})
  return (
    <div>
        <form action={action}>
        <div>
        <Label htmlFor='name'>Product name</Label>
        <Input placeholder='Product name' id='name' type='text' name='name' defaultValue={product?.name}/>
        {error?.name}
        </div>
        <div>
        <Label htmlFor='description'>Product description</Label>
        <Input placeholder='Product description' id='description' type='text' name='description' defaultValue={product?.description} />
        {error?.description}
        </div>
        <div>
        <Label htmlFor='priceInCents'>Price in cents</Label>
        <Input placeholder='Price In Cents' id='priceInCents' type='number' name='priceInCents' value={PriceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)} defaultValue={product?.priceInCents}/>
        {PriceInCents}
        {error?.priceInCents}
        </div>
        <div>
        <Label htmlFor='stock'>Stock</Label>
        <Input placeholder='Stock' id='stock' type='number' name='stock' defaultValue={0}/>
        </div>
        <div>
        <Label htmlFor='image'>Product image</Label>
        <Input onChange={e => setFile(e.target.files ? e.target.files[0] : undefined)} id='image' type='file' name='image' />
        {error?.image}
        <div>
            {file ? <img src={URL.createObjectURL(file)} alt='Product image' width={300} height={300} className=' object-cover'/> : <img src={product?.imagePath} alt='Product image' width={300} height={300} className=' object-cover'/>}
        </div>
        </div>
            <SubmitButton />
        </form>
    </div>
  )
}

export default EditFrom


function SubmitButton() {
    const {pending} = useFormStatus()
    return (
        <Button type='submit' disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
    )
}