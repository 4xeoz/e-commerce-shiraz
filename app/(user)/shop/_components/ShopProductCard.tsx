import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@prisma/client";
import Link from "next/link";

const ShopProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      <Link href={`/shop/${product.id}`}>
        <Card className="h-fit ">
          <CardHeader>
            <div className="w-full h-full relative">
              <Image
                src={product.imagePath}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover aspect-square"
              />
            </div>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default ShopProductCard;
