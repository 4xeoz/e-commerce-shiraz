import { fetchProducts } from "@/app/api/admin/adminfetch";
import Image from "next/image";
import React from "react";
import ProductCardComponent from "./ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductSection = async () => {
  const products = await fetchProducts();
  const availableProducts = products
    .filter((product) => product.isAvailable)
    .slice(0, 3);
  console.log(availableProducts);

  return (
    <div className="product-list grid grid-cols-3 gap-10 wrapper">
      {availableProducts.map((product) => (
        <div key={product.id}>
          <Link href={`/shop/${product.id}`}>
            <ProductCardComponent
              picture={product.imagePath}
              name={product.name}
              priceInCents={product.priceInCents}
              numberInStock={product.numberOfStock}
            />
          </Link>
        </div>
      ))}
      <div className=" text-center col-span-3">

      <Button asChild variant="link" className="p-0">
        <Link href="/shop">
          <p>DISCOVER MORE</p>
        </Link>
      </Button>
      </div>
    </div>
  );
};

export default ProductSection;
