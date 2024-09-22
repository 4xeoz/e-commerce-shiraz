import React from "react";
import { fetchProducts } from "../_actions/user";
import ShopProductCard from "./_components/ShopProductCard";

const page = async () => {
  const products = await fetchProducts();
  return (
    <div>
      shop
      <div className="container">
        <div className="grid grid-cols-3 gap-10 h-fit items-center">
          {products.map((product) => (
            <ShopProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
