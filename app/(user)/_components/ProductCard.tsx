import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  picture: string;
  name: string;
  priceInCents: number;
  numberInStock: number;
}

export default function ProductCardComponent({picture, name, priceInCents, numberInStock}: ProductCardProps) {
  const isOutOfStock = numberInStock === 0;
  const formattedPrice = (priceInCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div>
      <Card className="w-full max-w-sm overflow-hidden">
        {isOutOfStock && (
          <div className="absolute bg-black p-1">
            <p className="text-white">Out of stock</p>
          </div>
        )}
        <CardContent className="p-10">
          <div className="relative aspect-square">
            <Image src={picture} alt={name} fill className=" object-cover" />
          </div>
        </CardContent>
      </Card>
      <div className="w-full text-center">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{formattedPrice}</p>
      </div>
    </div>
  );
}
