import { z } from "zod";
import { create } from "zustand";

import {
  type TAccountCredentials,
  type IAccountCredentialsErrorResponse,
  AccountCredentialsSchema,
  AccountAPI,
  type TAccountSettingsResponse,
} from "@/entities/account";

import { useToastStore } from "@/shared/toast";

interface IAccountStore {
  idInstance: number | null;
  apiTokenInstance: string | null;
  accountErrors: IAccountCredentialsErrorResponse | null;

  setIdInstanse: (id: number) => void;
  setApiTokenInstance: (token: string) => void;
  setAccountErrors: (errors: IAccountCredentialsErrorResponse) => void;
  getIdInstanse: () => number;
  getApiTokenInstance: () => string;
  getAccountErrors: () => IAccountCredentialsErrorResponse;

  getSettings: (
    accountCredentials: TAccountCredentials,
  ) => Promise<TAccountSettingsResponse | undefined>;

  clear: () => void;
}

const useAccountStore = create<IAccountStore>((set, get) => ({
  idInstance: null,
  apiTokenInstance: null,
  accountErrors: null,

  setIdInstanse(id: number): void {
    set({ idInstance: id });
  },

  setApiTokenInstance(token: string): void {
    set({ apiTokenInstance: token });
  },

  setAccountErrors(errors: IAccountCredentialsErrorResponse): void {
    set({ accountErrors: errors });
  },

  getIdInstanse(): number {
    const id = get().idInstance;
    return id ? id : 0;
  },

  getApiTokenInstance(): string {
    const token = get().apiTokenInstance;
    return token ? token : "";
  },

  getAccountErrors(): IAccountCredentialsErrorResponse {
    const errors = get().accountErrors;
    return errors ? errors : {};
  },

  async getSettings(
    accountCredentials: TAccountCredentials,
  ): Promise<TAccountSettingsResponse | undefined> {
    const result = AccountCredentialsSchema.safeParse(accountCredentials);

    if (!result.success) {
      const errors = z.treeifyError(result.error);

      set({
        accountErrors: {
          idInstance: errors.properties?.idInstance?.errors[0],
          apiTokenInstance: errors.properties?.apiTokenInstance?.errors[0],
        },
      });

      return;
    }

    try {
      const data = await AccountAPI.getSettings(accountCredentials);

      useToastStore.getState().showSuccess();
      return data.data;
    } catch (err: unknown) {
      console.log(err);
      useToastStore.getState().showError();
    }
  },

  clear(): void {
    set({ idInstance: null, apiTokenInstance: null, accountErrors: null });
  },
}));

export default useAccountStore;
