import type { AxiosResponse } from "axios";

import type {
  TChat,
  TChatHistoryRequest,
  TChatHistoryResponse,
  TCheckWhatsAppRequest,
  TCheckWhatsAppResponse,
} from "@/entities/services";
import { AccountService } from "@/entities/account";

import { privateApiInstance } from "@/shared/api";

export class ServicesAPI {
  static async getChats(): Promise<AxiosResponse<TChat[]>> {
    const { idInstance, apiTokenInstance } = AccountService.getCredentials();

    return await privateApiInstance.get<TChat[]>(
      `/waInstance${idInstance}/getChats/${apiTokenInstance}`,
    );
  }

  static async getChatHistory(
    chatRequest: TChatHistoryRequest,
  ): Promise<AxiosResponse<TChatHistoryResponse[]>> {
    const { idInstance, apiTokenInstance } = AccountService.getCredentials();

    return await privateApiInstance.post<TChatHistoryResponse[]>(
      `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
      { ...chatRequest },
    );
  }

  static async checkWhatsApp(
    data: TCheckWhatsAppRequest,
  ): Promise<AxiosResponse<TCheckWhatsAppResponse>> {
    const { idInstance, apiTokenInstance } = AccountService.getCredentials();
    return await privateApiInstance.post<TCheckWhatsAppResponse>(
      `/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
      { ...data },
    );
  }
}
