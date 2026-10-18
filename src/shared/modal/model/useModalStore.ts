import type { ReactNode } from "react";
import { create } from "zustand";

interface IModalStore {
  isShow: boolean;
  content: ReactNode | null;

  setContent: (content: ReactNode | null) => void;
  getShow: () => boolean;
  getContent: () => ReactNode | null;

  showModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<IModalStore>((set, get) => ({
  isShow: false,
  content: null,

  setContent(content: ReactNode): void {
    set({ content });
  },

  getContent(): ReactNode | null {
    return get().content;
  },

  getShow(): boolean {
    return get().isShow;
  },

  showModal(): void {
    set({ isShow: true });
  },

  closeModal(): void {
    set({ isShow: false, content: null });
  },
}));

export default useModalStore;
