import { create } from "zustand";

export type AsyncStoreType = {
    hasHydrated?: boolean;
    setHasHydrated?: (val: boolean) => void;
};
const usePageStore = create<{
    title: string;
    setTitle: (s: string) => void;
}>((set) => ({
    title: "",
    setTitle: (title) => set(() => ({ title })),
}));

export default usePageStore;
