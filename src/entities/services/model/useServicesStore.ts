import { create } from "zustand";

import { ServicesAPI, type TChat } from "@/entities/services";

import { useToastStore } from "@/shared/toast";

interface IServicesStore {
  chats: TChat[];

  setChats: (chats: TChat[]) => void;
  getChats: () => TChat[];

  fetchChats: () => Promise<void>;
}

const useServicesStore = create<IServicesStore>((set, get) => ({
  chats: [],

  setChats(chats: TChat[]): void {
    set({ chats });
  },

  getChats(): TChat[] {
    return get().chats;
  },

  async fetchChats(): Promise<void> {
    try {
      const { data } = await ServicesAPI.getChats();

      set({ chats: data });
    } catch (err) {
      console.log(err);
      useToastStore.getState().showError();
    }
  },
}));

export default useServicesStore;
