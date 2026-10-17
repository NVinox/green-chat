import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import type { TChat } from "@/entities/services";
import type { TDeleteNotificationResponse } from "@/entities/receipt";

import { privateApiInstance } from "@/shared/api";
import { API_TOKEN_INSTANCE_KEY, ID_INSTANCE_KEY } from "@/shared/constants";

const idInstance = Cookies.get(ID_INSTANCE_KEY);
const apiTokenInstance = Cookies.get(API_TOKEN_INSTANCE_KEY);

export class ReceiptAPI {
  static async receiveNotification(): Promise<AxiosResponse<TChat[]>> {
    return await privateApiInstance.get<TChat[]>(
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    );
  }

  static async deleteNotification(
    receiptId: number,
  ): Promise<AxiosResponse<TDeleteNotificationResponse>> {
    return await privateApiInstance.delete<TDeleteNotificationResponse>(
      `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    );
  }
}
