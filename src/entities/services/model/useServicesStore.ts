import { z } from "zod";
import { create } from "zustand";

import {
  CheckWhatsAppRequestSchema,
  ServicesAPI,
  type ICheckWhatsAppErrorResponse,
  type ISelectedChat,
  type TChat,
  type TChatHistoryRequest,
  type TChatHistoryResponse,
  type TCheckWhatsAppRequest,
  type TCheckWhatsAppResponse,
} from "@/entities/services";

import { useToastStore } from "@/shared/toast";

interface IServicesStore {
  chats: TChat[];
  chatHistory: TChatHistoryResponse[];
  selectedChat: ISelectedChat | null;
  checkWhatsAppPhone: string | null;
  checkWhatsAppErrors: ICheckWhatsAppErrorResponse | null;
  isChatLoading: boolean;
  isChatHistoryLoading: boolean;

  setChats: (chats: TChat[]) => void;
  setChatHistory: (chatHistory: TChatHistoryResponse[]) => void;
  setChatLoading: (isLoading: boolean) => void;
  setChatHistoryLoading: (isLoading: boolean) => void;
  setSelectedChat: (chat: ISelectedChat) => void;
  setCheckWhatsAppPhone: (phone: string) => void;
  setCheckWhatsAppErrors: (errors: ICheckWhatsAppErrorResponse) => void;
  getChats: () => TChat[];
  getChatHistory: () => TChatHistoryResponse[];
  getChatLoading: () => boolean;
  getChatHistoryLoading: () => boolean;
  getSelectedChat: () => ISelectedChat | null;
  getCheckWhatsAppPhone: () => string;
  getCheckWhatsAppErrors: () => ICheckWhatsAppErrorResponse | null;

  fetchChats: () => Promise<void>;
  fetchChatHistory: (chatData: TChatHistoryRequest) => Promise<void>;
  checkWhatsApp: () => Promise<TCheckWhatsAppResponse | undefined>;
  clearCheckWhatsApp: () => void;
}

const useServicesStore = create<IServicesStore>((set, get) => ({
  chats: [],
  chatHistory: [],
  selectedChat: null,
  checkWhatsAppPhone: null,
  checkWhatsAppErrors: null,
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

  setSelectedChat(chat: ISelectedChat): void {
    set({ selectedChat: chat });
  },

  setCheckWhatsAppPhone(phone: string): void {
    set({ checkWhatsAppPhone: phone });
  },

  setCheckWhatsAppErrors(errors: ICheckWhatsAppErrorResponse): void {
    set({ checkWhatsAppErrors: errors });
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

  getSelectedChat(): ISelectedChat | null {
    return get().selectedChat;
  },

  getCheckWhatsAppPhone(): string {
    const phone = get().checkWhatsAppPhone;
    return phone ? phone : "";
  },

  getCheckWhatsAppErrors(): ICheckWhatsAppErrorResponse | null {
    return get().checkWhatsAppErrors;
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

  async checkWhatsApp(): Promise<TCheckWhatsAppResponse | undefined> {
    const requestData: TCheckWhatsAppRequest = {
      phoneNumber: get().getCheckWhatsAppPhone(),
    };
    const result = CheckWhatsAppRequestSchema.safeParse(requestData);

    if (!result.success) {
      const errors = z.treeifyError(result.error);

      set({
        checkWhatsAppErrors: {
          phoneNumber: errors.properties?.phoneNumber?.errors[0],
          force: errors.properties?.force?.errors[0],
        },
      });

      return;
    }

    try {
      const { data } = await ServicesAPI.checkWhatsApp(requestData);

      if (!data.existsWhatsapp) {
        set({
          checkWhatsAppErrors: {
            phoneNumber: "На данном номере телефона нет аккаунта WhatsApp",
          },
        });

        return;
      }

      return data;
    } catch (err) {
      console.log(err);
      useToastStore.getState().showError();
    }
  },

  clearCheckWhatsApp(): void {
    set({ checkWhatsAppPhone: null, checkWhatsAppErrors: null });
  },
}));

export default useServicesStore;
