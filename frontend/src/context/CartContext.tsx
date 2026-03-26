import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../types/cartItem";

// Defines the shape of the cart context available to consuming components
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provides cart state and actions to the component tree via React Context
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    // Adds an item to the cart, or increments the quantity if it already exists
    const addToCart = (item: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find((c) => c.bookId === item.bookId);

            if (existingItem) {
                // Update quantity for existing item, keep original unit price
                return prevCart.map((c) =>
                    c.bookId === item.bookId
                        ? { ...c, quantity: c.quantity + item.quantity }
                        : c
                );
            }

            return [...prevCart, item];
        });
    };

    // Removes an item from the cart entirely by bookId
    const removeFromCart = (bookId: number) => {
        setCart(prevCart => prevCart.filter(c => c.bookId !== bookId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};