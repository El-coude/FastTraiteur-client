import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AsyncStoreType = {
    hasHydrated?: boolean;
    setHasHydrated?: (val: boolean) => void;
};
const useAuthStore = create<AsyncStoreType & AuthStoreType>()(
    persist(
        (set) => ({
            hasHydrated: false,
            setHasHydrated: (val) => set(() => ({ hasHydrated: val })),

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

export type UserType = {} | null;

export default useAuthStore;
