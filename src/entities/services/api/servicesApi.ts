import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import type {
  TChat,
  TChatHistoryRequest,
  TChatHistoryResponse,
} from "@/entities/services";

import { privateApiInstance } from "@/shared/api";
import { API_TOKEN_INSTANCE_KEY, ID_INSTANCE_KEY } from "@/shared/constants";

const idInstance = Cookies.get(ID_INSTANCE_KEY);
const apiTokenInstance = Cookies.get(API_TOKEN_INSTANCE_KEY);

export class ServicesAPI {
  static async getChats(): Promise<AxiosResponse<TChat[]>> {
    return await privateApiInstance.get<TChat[]>(
      `/waInstance${idInstance}/getChats/${apiTokenInstance}`,
    );
  }

  static async getChatHistory(
    chatRequest: TChatHistoryRequest,
  ): Promise<AxiosResponse<TChatHistoryResponse[]>> {
    return await privateApiInstance.post<TChatHistoryResponse[]>(
      `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
      { ...chatRequest },
    );
  }
}
