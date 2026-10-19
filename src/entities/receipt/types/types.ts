import { z } from "zod";

export const ReceiveNotificationRequestSchema = z.object({
  receiveTime: z.number().nonnegative().min(5).max(60),
});

export const DeleteNotificationRequestSchema = z.object({
  receiptId: z.number().nonnegative(),
});

export const ReceiveNotificationResponseSchema = z.object({
  receiptId: z.number().nonnegative(),
  body: z.object({
    typeWebhook: z.string(),
    instanceData: z.object({
      idInstance: z.number().nonnegative(),
      wid: z.string(),
      typeInstance: z.string(),
    }),
    timestamp: z.number().nonnegative(),
    idMessage: z.string(),
    senderData: z.object({
      chatId: z.string(),
      sender: z.string(),
      senderName: z.string(),
      senderContactName: z.string(),
    }),
    messageData: z.object({
      typeMessage: z.string(),
      textMessageData: z.object({
        textMessage: z.string(),
      }),
    }),
  }),
});

export const DeleteNotificationResponseSchema = z.object({
  result: z.boolean(),
  reason: z.string(),
});

export type TReceiveNotificationRequest = z.infer<
  typeof ReceiveNotificationRequestSchema
>;
export type TReceiveNotificationResponse = z.infer<
  typeof ReceiveNotificationResponseSchema
>;
export type TDeleteNotificationRequest = z.infer<
  typeof DeleteNotificationRequestSchema
>;
export type TDeleteNotificationResponse = z.infer<
  typeof DeleteNotificationResponseSchema
>;
