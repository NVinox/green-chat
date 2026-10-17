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
  selectedChat: TChat | null;
  isChatLoading: boolean;
  isChatHistoryLoading: boolean;

  setChats: (chats: TChat[]) => void;
  setChatHistory: (chatHistory: TChatHistoryResponse[]) => void;
  setChatLoading: (isLoading: boolean) => void;
  setChatHistoryLoading: (isLoading: boolean) => void;
  setSelectedChat: (chat: TChat) => void;
  getChats: () => TChat[];
  getChatHistory: () => TChatHistoryResponse[];
  getChatLoading: () => boolean;
  getChatHistoryLoading: () => boolean;
  getSelectedChat: () => TChat | null;

  fetchChats: () => Promise<void>;
  fetchChatHistory: (chatData: TChatHistoryRequest) => Promise<void>;
}

const useServicesStore = create<IServicesStore>((set, get) => ({
  chats: [],
  chatHistory: [],
  selectedChat: null,
  isChatLoading: false,
  isChatHistoryLoading: false,

  setChats(chats: TChat[]): void {
    set({ chats });
  },

  setChatHistory(chatHistory: TChatHistoryResponse[]): void {
    set({ chatHistory });
  },

  setChatLoading(isLoading: boolean): void {
    set({ isChatLoading: isLoading });
  },

  setChatHistoryLoading(isLoading: boolean): void {
    set({ isChatHistoryLoading: isLoading });
  },

  setSelectedChat(chat: TChat) {
    set({ selectedChat: chat });
  },

  getChats(): TChat[] {
    return get().chats;
  },

  getChatHistory(): TChatHistoryResponse[] {
    return get().chatHistory.toReversed();
  },

  getChatLoading(): boolean {
    return get().isChatLoading;
  },

  getChatHistoryLoading(): boolean {
    return get().isChatHistoryLoading;
  },

  getSelectedChat(): TChat | null {
    return get().selectedChat;
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
