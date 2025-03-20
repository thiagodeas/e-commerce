import { create } from "zustand";
import { persist } from "zustand/middleware"; 

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
}

interface CartStore {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) =>
                set((state) => ({ cart: [...state.cart, product] })),

            removeFromCart: (id) =>
                set((state) => ({ cart: state.cart.filter((item) => item._id !== id) })),

            getCartCount: () => get().cart.length,
        }),
        {
            name: "cart-storage",
        }
    )
);