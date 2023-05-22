import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URI } from "@env";

export type AsyncStoreType = {
    hasHydrated?: boolean;
    setHasHydrated?: (val: boolean) => void;
};
const useAuthStore = create<AsyncStoreType & AuthStoreType>()(
    persist(
        (set, get) => ({
            hasHydrated: false,
            setHasHydrated: async (val) => {
                set(() => ({ hasHydrated: val }));
                if (get().user) {
                    const userStillExits = await (
                        await fetch(`${API_URI}/clients/${get().user?.id!}`, {
                            method: "get",
                            headers: {
                                "Content-type": "application/json",
                            },
                        })
                    ).json();
                    if (!userStillExits.exists) {
                        get().setUser(null);
                    }
                }
            },

            user: null,
            setUser: (user) => set(() => ({ user })),
        }),
        {
            name: "Auth",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated && state.setHasHydrated(true);
            },
        }
    )
);

type AuthStoreType = {
    user: UserType;
    setUser: (user: UserType) => void;
};

export type UserType = {
    access_token: string;
    id: number;
    name: string;
    phone: string;
    isConfirmed: boolean;
    createdAt: string;
    address?: string;
    longtitud?: number;
    latitud?: number;
    imageUrl?: string;
} | null;

export default useAuthStore;
