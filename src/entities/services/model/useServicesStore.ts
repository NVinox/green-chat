import { create } from "zustand";

import {
  ServicesAPI,
  type TChat,
  type TChatHistoryRequest,
  type TChatHistoryResponse,
} from "@/entities/services";

import { useToastStore } from "@/shared/toast";

interface IServicesStore {
  chats: TChat[];
  chatHistory: TChatHistoryResponse[];

  setChats: (chats: TChat[]) => void;
  setChatHistory: (chatHistory: TChatHistoryResponse[]) => void;
  getChats: () => TChat[];
  getChatHistory: () => TChatHistoryResponse[];

  fetchChats: () => Promise<void>;
  fetchChatHistory: (chatData: TChatHistoryRequest) => Promise<void>;
}

const useServicesStore = create<IServicesStore>((set, get) => ({
  chats: [],
  chatHistory: [],

  setChats(chats: TChat[]): void {
    set({ chats });
  },

  setChatHistory(chatHistory: TChatHistoryResponse[]): void {
    set({ chatHistory });
  },

  getChats(): TChat[] {
    return get().chats;
  },

  getChatHistory(): TChatHistoryResponse[] {
    return get().chatHistory.toReversed();
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

  async fetchChatHistory(chatData: TChatHistoryRequest): Promise<void> {
    try {
      const { data } = await ServicesAPI.getChatHistory(chatData);

      set({ chatHistory: data });
    } catch (err) {
      console.log(err);
      useToastStore.getState().showError();
    }
  },
}));

export default useServicesStore;
