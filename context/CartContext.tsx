'use client'
import { Product } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type CartProviderProps = {
    children: React.ReactNode;
}

type CartContextType = {
    getItemQuantity: (id: string) => number;
    increaseItem: (product: Product) => void;
    decreaseItem: (id: string) => void;
    removeItem: (id: string) => void;
    cartQuantity: number;
    cart: CartItem[];
}

export type CartItem = Product & {
    quantity: number;
};

  

const CartContext = createContext({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartItem[]>([]);

    function getItemQuantity(id: string) {
        const item = cart.find((item) => item.id === id);
        return item?.quantity || 0;
    }

    function increaseItem(product: Product) {
        setCart(currItems => {
            if(currItems.find(item => item.id === product.id) == null){

                return [...currItems, {...product, quantity: 1}]
            } else{
                return currItems.map(item => {
                    if(item.id === product.id){
                        
                        return {...item, quantity: item.quantity + 1}
                    }
                    else{
                        return item;
                    } 
                } )
            }
        })
    }

    function decreaseItem(id: string) {
        setCart(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id);
            } else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }
                    else{
                        return item;
                    } 
                } )
            }
        })
    }

    function removeItem(id: string) {
        setCart(currItems => currItems.filter(item => item.id !== id));
    }

    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);



  return <CartContext.Provider value={{getItemQuantity, decreaseItem, increaseItem, removeItem, cartQuantity, cart}}>{children}</CartContext.Provider>;
}

