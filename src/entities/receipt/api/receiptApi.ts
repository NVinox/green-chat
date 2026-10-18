import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import type {
  TDeleteNotificationRequest,
  TDeleteNotificationResponse,
  TReceiveNotificationRequest,
  TReceiveNotificationResponse,
} from "@/entities/receipt";

import { privateApiInstance } from "@/shared/api";
import { API_TOKEN_INSTANCE_KEY, ID_INSTANCE_KEY } from "@/shared/constants";

const idInstance = Cookies.get(ID_INSTANCE_KEY);
const apiTokenInstance = Cookies.get(API_TOKEN_INSTANCE_KEY);

export class ReceiptAPI {
  static async receiveNotification(
    params?: TReceiveNotificationRequest,
  ): Promise<AxiosResponse<TReceiveNotificationResponse>> {
    return await privateApiInstance.get<TReceiveNotificationResponse>(
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      { params: { ...params } },
    );
  }

  static async deleteNotification(
    data: TDeleteNotificationRequest,
  ): Promise<AxiosResponse<TDeleteNotificationResponse>> {
    return await privateApiInstance.delete<TDeleteNotificationResponse>(
      `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`,
    );
  }
}
