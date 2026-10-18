import type { AxiosResponse } from "axios";

import type {
  TSendMessageResponse,
  TSendMessageRequest,
} from "@/entities/dispatch";
import { AccountService } from "@/entities/account";

import { privateApiInstance } from "@/shared/api";

export class DispatchAPI {
  static async sendMessage(
    data: TSendMessageRequest,
  ): Promise<AxiosResponse<TSendMessageResponse>> {
    const { idInstance, apiTokenInstance } = AccountService.getCredentials();

    return await privateApiInstance.post<TSendMessageResponse>(
      `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      { ...data },
    );
  }
}
