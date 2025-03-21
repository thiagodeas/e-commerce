import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            setIsLoggedIn: (value) => set({ isLoggedIn: value }),
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);
