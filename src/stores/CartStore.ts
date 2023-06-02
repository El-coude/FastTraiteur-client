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
            total: 0,
            setCart: (items) => set({ cart: items }),
            addItem: (item) =>
                set(({ cart, total }) => {
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

                    return {
                        cart: [...cart, item],
                        total:
                            total + parseFloat(item.meal.price) * item.quantity,
                    };
                }),
            updateItemQuantity: (itemId, quantity) =>
                set(({ cart, total }) => {
                    let prev: CartItem | null = null;
                    const newItems = cart.map((item) => {
                        if (item.meal.id === itemId) {
                            prev = { ...item };
                            return { ...item, quantity };
                        }
                        return item;
                    });

                    return {
                        cart: newItems,
                        total:
                            total -
                            parseFloat(prev!.meal.price) * prev!.quantity +
                            parseFloat(prev!.meal.price) * quantity,
                    };
                }),

            removeItem: (id) =>
                set(({ cart, total }) => {
                    let deleted: CartItem | null = null;
                    const newItems = cart.filter((cartItem) => {
                        if (cartItem.meal.id !== id) return true;
                        deleted = cartItem;
                        return false;
                    });

                    return {
                        cart: newItems,
                        total:
                            total -
                            parseFloat(deleted!.meal.price) * deleted!.quantity,
                    };
                }),
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
    total: number;
    setCart: (items: CartItem[]) => void;
    addItem: (item: CartItem) => void;
    updateItemQuantity: (itemId: number, quantity: number) => void;
    removeItem: (itemId: number) => void;
};
export type CartItem = {
    meal: Meal;
    quantity: number;
};
export default useCartStore;
