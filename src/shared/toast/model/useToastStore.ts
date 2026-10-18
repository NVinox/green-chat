import { create } from "zustand";

import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS } from "@/shared/constants";

const TIMEOUT = 3000;

interface IToastStore {
  isShow: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
  timeoutId: number | null;
  getShow: () => boolean;
  getError: () => boolean;
  getSuccess: () => boolean;
  getMessage: () => string | null;
  showError: (message?: string) => void;
  showSuccess: (message?: string) => void;
  close: () => void;
}

const useToastStore = create<IToastStore>((set, get) => ({
  isShow: false,
  isError: false,
  isSuccess: false,
  message: null,
  timeoutId: null,

  getShow(): boolean {
    return get().isShow;
  },

  getError(): boolean {
    return get().isError;
  },

  getSuccess(): boolean {
    return get().isSuccess;
  },

  getMessage() {
    return get().message;
  },

  showError(message = NOTIFICATION_ERROR): void {
    const currentTimeoutId = get().timeoutId;

    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      get().close();
    }, TIMEOUT);

    set({
      isShow: true,
      isError: true,
      isSuccess: false,
      message,
      timeoutId,
    });
  },

  showSuccess(message = NOTIFICATION_SUCCESS): void {
    const currentTimeoutId = get().timeoutId;

    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      get().close();
    }, TIMEOUT);

    set({
      isShow: true,
      isError: false,
      isSuccess: true,
      message,
      timeoutId,
    });
  },

  close(): void {
    const timeout = get().timeoutId;
    if (timeout) {
      clearTimeout(timeout);
    }

    set({
      isShow: false,
      isError: false,
      isSuccess: false,
      message: null,
      timeoutId: null,
    });
  },
}));

export default useToastStore;
