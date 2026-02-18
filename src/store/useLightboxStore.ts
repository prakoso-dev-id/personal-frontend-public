import { create } from "zustand";

interface LightboxState {
    isOpen: boolean;
    currentIndex: number;
    images: Array<{
        src: string;
        alt: string;
    }>;
    open: (index: number, images: Array<{ src: string; alt: string }>) => void;
    close: () => void;
    setIndex: (index: number) => void;
}

export const useLightboxStore = create<LightboxState>((set) => ({
    isOpen: false,
    currentIndex: 0,
    images: [],
    open: (index, images) => set({ isOpen: true, currentIndex: index, images }),
    close: () => set({ isOpen: false }),
    setIndex: (index) => set({ currentIndex: index }),
}));
