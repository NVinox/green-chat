import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import type {
  TSendMessageResponse,
  TSendMessageRequest,
} from "@/entities/dispatch";

import { privateApiInstance } from "@/shared/api";
import { API_TOKEN_INSTANCE_KEY, ID_INSTANCE_KEY } from "@/shared/constants";

const idInstance = Cookies.get(ID_INSTANCE_KEY);
const apiTokenInstance = Cookies.get(API_TOKEN_INSTANCE_KEY);

export class DispatchAPI {
  static async sendMessage(
    data: TSendMessageRequest,
  ): Promise<AxiosResponse<TSendMessageResponse>> {
    return await privateApiInstance.post<TSendMessageResponse>(
      `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      { ...data },
    );
  }
}
