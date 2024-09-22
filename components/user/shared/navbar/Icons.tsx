"use client";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Icons = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    getItemQuantity,
    increaseItem,
    decreaseItem,
    removeItem,
    cartQuantity,
    cart,
  } = useCart();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const handleCheckout = () => {
    console.log('the cart is')
    console.log(cart)
    setIsSheetOpen(false); // Close the sheet
    const carttosendurl = encodeURIComponent(JSON.stringify(cart))
    const url = `/stripe?product=${carttosendurl}`;
    router.push(url);
  };


  return (
    <div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsSheetOpen(true)}>
            <CiShoppingCart className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              <div className="flex gap-5 flex-col">
                {cart.map((item) => (
                  <div className="h-36" key={item.id}>
                    <div className="flex gap-10">
                      <div className="w-1/3">
                        <img
                          src={item.imagePath}
                          alt={item.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h1>{item.name}</h1>
                        <p>{item.priceInCents}</p>
                        <p>{getItemQuantity(item.id)}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <Button onClick={() => increaseItem(item)}>+</Button>
                      <Button onClick={() => decreaseItem(item.id)}>-</Button>
                      <Button onClick={() => removeItem(item.id)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
              <Button onClick={handleCheckout}>Checkout</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {cartQuantity}
    </div>
  );
};

export default Icons;
