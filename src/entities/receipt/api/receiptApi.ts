import type { AxiosResponse } from "axios";

import type {
  TDeleteNotificationRequest,
  TDeleteNotificationResponse,
  TReceiveNotificationRequest,
  TReceiveNotificationResponse,
} from "@/entities/receipt";
import { AccountService } from "@/entities/account";

import { privateApiInstance } from "@/shared/api";

export class ReceiptAPI {
  static async receiveNotification(
    params?: TReceiveNotificationRequest,
  ): Promise<AxiosResponse<TReceiveNotificationResponse>> {
    const { idInstance, apiTokenInstance } = AccountService.getCredentials();

    return await privateApiInstance.get<TReceiveNotificationResponse>(
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      { params: { ...params } },
    );
  }

  static async deleteNotification(
    data: TDeleteNotificationRequest,
  ): Promise<AxiosResponse<TDeleteNotificationResponse>> {
    const { idInstance, apiTokenInstance } = AccountService.getCredentials();

    return await privateApiInstance.delete<TDeleteNotificationResponse>(
      `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`,
    );
  }
}
