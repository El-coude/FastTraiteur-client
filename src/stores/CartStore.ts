import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "src/screens/home/Meals";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AsyncStoreType = {
    hasHydrated?: boolean;
    setHasHydrated?: (val: boolean) => void;
};

const useCartStore = create<AsyncStoreType & StoreType>()(
    persist(
        (set, get) => ({
            cart: [],

            setCart: (items) => set({ cart: items }),
            addItem: (item) =>
                set(({ cart }) => {
                    const alreadyExists = cart
                        .map((cr) => cr.meal)
                        .find((it) => it.id == item.meal.id);
                    if (alreadyExists) {
                        get().updateItemQuantity(
                            alreadyExists.id,
                            item.quantity
                        );
                        return {};
                    }
                    return { cart: [...cart, item] };
                }),
            updateItemQuantity: (itemId, quantity) =>
                set(({ cart }) => ({
                    cart: cart.map((item) =>
                        item.meal.id === itemId ? { ...item, quantity } : item
                    ),
                })),
            removeItem: (item) =>
                set(({ cart }) => ({
                    cart: cart.filter(
                        (cartItem) => cartItem.meal.id !== item.meal.id
                    ),
                })),
        }),
        {
            name: "Cart",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated && state.setHasHydrated(true);
            },
        }
    )
);

type StoreType = {
    cart: CartItem[];

    setCart: (items: CartItem[]) => void;
    addItem: (item: CartItem) => void;
    updateItemQuantity: (itemId: number, quantity: number) => void;
    removeItem: (item: CartItem) => void;
};
export type CartItem = {
    meal: Meal;
    quantity: number;
};
export default useCartStore;
