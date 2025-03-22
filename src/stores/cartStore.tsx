import { create } from "zustand";
import { persist } from "zustand/middleware"; 

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartStore {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    getCartCount: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                const cart = get().cart;
                const existingProduct = cart.find((item) => item._id === product._id);

                if (existingProduct) {
                    set({
                        cart: cart.map((item) =>
                            item._id === product._id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },

            removeFromCart: (id) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item._id !== id),
                }));
            },

            updateQuantity: (id, quantity) => {
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item._id === id
                            ? { ...item, quantity: Math.max(quantity, 1) } 
                            : item
                    ),
                }));
            },

            getCartCount: () => get().cart.reduce((total, item) => total + item.quantity, 0),

            getSubtotal: () => {
                return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: "cart-storage",
        }
    )
);