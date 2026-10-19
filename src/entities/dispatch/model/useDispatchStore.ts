import { create } from "zustand";

import { DispatchAPI, type TSendMessageRequest } from "@/entities/dispatch";
import { useServicesStore } from "@/entities/services";

import { useToastStore } from "@/shared/toast";

interface IDispatchStore {
  message: string | null;

  setMessage: (message: string) => void;
  getMessage: () => string;

  sendMessage: (message: TSendMessageRequest) => Promise<void>;

  clear: () => void;
}

const useDispatchStore = create<IDispatchStore>((set, get) => ({
  message: null,

  setMessage(message: string): void {
    set({ message });
  },

  getMessage(): string {
    const message = get().message;
    return message ? message : "";
  },

  async sendMessage(message: TSendMessageRequest): Promise<void> {
    const servicesStore = useServicesStore.getState();
    const selectedChat = servicesStore.getSelectedChat();

    try {
      if (selectedChat) {
        await DispatchAPI.sendMessage(message);
        setTimeout(async () => {
          await servicesStore.fetchChatHistory({
            chatId: selectedChat.id,
            count: 100,
          });
          await servicesStore.fetchChats();
        }, 2000);
        get().clear();
      }
    } catch (err) {
      console.log(err);
      useToastStore.getState().showError("Не удалось отправить сообщение");
    }
  },

  clear(): void {
    set({ message: null });
  },
}));

export default useDispatchStore;
