import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AsyncStoreType = {
    hasHydrated?: boolean;
    setHasHydrated?: (val: boolean) => void;
};
const useFilterStore = create<AsyncStoreType & FilterStoreType>()(
    persist(
        (set, get) => ({
            hasHydrated: false,
            setHasHydrated: async (val) => set(() => ({ hasHydrated: val })),

            queryParams: "",

            price: {
                min: 1,
                max: 10000,
            },
            setPrice: (price) => {
                set(({ queryParams }) => {
                    return { price, queryParams: price ? "" : "" };
                });
            },

            distance: 10,
            setDistance: (distance) => set(() => ({ distance })),

            category: "all",
            setCategory: (category) => set(() => ({ category })),

            search: "",
            setSearch: (search) => set(() => ({ search })),
        }),
        {
            name: "filter",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated && state.setHasHydrated(true);
            },
        }
    )
);

type FilterStoreType = {
    queryParams: string;

    category?: string;
    setCategory: (category: string) => void;

    price?: {
        min: number;
        max: number;
    };
    setPrice: (price: { min: number; max: number }) => void;

    distance?: number;
    setDistance: (dis: number) => void;

    search: string;
    setSearch: (string: string) => void;
};

export default useFilterStore;
