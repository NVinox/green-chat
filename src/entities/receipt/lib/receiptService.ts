import {
  ReceiptAPI,
  type TDeleteNotificationRequest,
  type TReceiveNotificationResponse,
} from "@/entities/receipt";

export class ReceiptService {
  static async receiveNotification(): Promise<
    TReceiveNotificationResponse | undefined
  > {
    try {
      const { data } = await ReceiptAPI.receiveNotification();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteNotification(
    request: TDeleteNotificationRequest,
  ): Promise<void> {
    try {
      await ReceiptAPI.deleteNotification(request);
    } catch (err) {
      console.log(err);
    }
  }
}
