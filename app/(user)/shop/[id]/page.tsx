'use client'
import { fetchProductById } from "@/app/api/admin/adminfetch";
import React from "react";
import AddToCartButton from "./_compoenets/AddToCartButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";


const page = async ({ params }: { params: { id: string } }) => {

  
  const { id } = params;
  const singleProduct = await fetchProductById(id);
  if (!singleProduct) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="relative h-screen ">
          <Image src={singleProduct.imagePath} alt="product" fill className="object-cover"/>
        </div>
        <div className=" p-20">
          <h1>{singleProduct.name}</h1>
          <p>{singleProduct.description}</p>
          <p>{singleProduct.priceInCents}</p>
          <p>{singleProduct.numberOfStock}</p>
          <AddToCartButton product={singleProduct} />
        </div>
      </div>
    </div>
  );
};

export default page;
