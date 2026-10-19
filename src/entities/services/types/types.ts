import { z } from "zod";

export const EChatType = {
  USER: "user",
  GROUP: "group",
} as const;

export const EHistoryMessageType = {
  OUTGOING: "outgoing",
  INCOMING: "incoming",
} as const;

export const EMessageType = {
  EXTENDED_TEXT_MESSAGE: "extendedTextMessage",
  TEXT_MESSAGE: "textMessage",
  DELETED_MESSAGE: "deletedMessage",
} as const;

export type TChatType = (typeof EChatType)[keyof typeof EChatType];
export type TMessageType = (typeof EMessageType)[keyof typeof EMessageType];
export type THistoryMessageType =
  (typeof EHistoryMessageType)[keyof typeof EHistoryMessageType];

export const ChatSchema = z.object({
  archive: z.boolean(),
  id: z.string(),
  ephemeralExpiration: z.number().nonnegative(),
  ephemeralSettingTimestamp: z.number().nonnegative(),
  name: z.string(),
  type: z.enum([EChatType.USER, EChatType.GROUP], {
    error: () => ({
      message: "Неопознанный тип чата",
    }),
  }),
  unreadCount: z.number().nonnegative(),
});

export const ChatHistoryRequestSchema = z.object({
  chatId: z.string(),
  count: z.number().nonnegative().min(1).max(100),
});

export const ChatHistoryResponseSchema = z.object({
  type: z.enum([EHistoryMessageType.INCOMING, EHistoryMessageType.OUTGOING], {
    error: () => ({
      message: "Сообщение может быть входящим или исходящим",
    }),
  }),
  idMessage: z.string(),
  timestamp: z.number(),
  typeMessage: z.enum(
    [
      EMessageType.TEXT_MESSAGE,
      EMessageType.EXTENDED_TEXT_MESSAGE,
      EMessageType.DELETED_MESSAGE,
    ],
    {
      error: () => ({
        message: "Неопознанный тип сообщения",
      }),
    },
  ),
  chatId: z.string(),
  textMessage: z.string(),
  extendedTextMessage: z
    .object({
      text: z.string(),
      description: z.string(),
      title: z.string(),
      previewType: z.string(),
      jpegThumbnail: z.string(),
      forwardingScore: z.number(),
      isForwarded: z.boolean(),
    })
    .optional(),
  statusMessage: z.string(),
  sendByApi: z.boolean(),
  deletedMessageId: z.string(),
  editedMessageId: z.string(),
  isEdited: z.boolean(),
  isDeleted: z.boolean(),
});

export const ChatHistoryClientSchema = z.object({
  idMessage: z.string(),
  textMessage: z.string(),
  time: z.string(),
  type: z.enum([EHistoryMessageType.INCOMING, EHistoryMessageType.OUTGOING], {
    error: () => ({
      message: "Сообщение может быть входящим или исходящим",
    }),
  }),
});

export const CheckWhatsAppRequestSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, { message: "Номер телефона должен содержать 11 знаков" })
    .regex(/^\d+$/, {
      message:
        "Номер телефона должен состоять только из цифр (без +, пробелов и дефисов)",
    }),
  force: z.boolean().optional(),
});

export const CheckWhatsAppResponseSchema = z.object({
  existsWhatsapp: z.boolean(),
  chatId: z.string(),
  username: z.string(),
  phoneNumber: z.string(),
  fromCache: z.boolean(),
});

export interface ICheckWhatsAppErrorResponse {
  phoneNumber?: string;
  force?: string;
}

export interface ISelectedChat {
  id: string;
  name: string;
}

export type TChat = z.infer<typeof ChatSchema>;
export type TChatHistoryRequest = z.infer<typeof ChatHistoryRequestSchema>;
export type TChatHistoryResponse = z.infer<typeof ChatHistoryResponseSchema>;
export type TChatHistoryClient = z.infer<typeof ChatHistoryClientSchema>;
export type TCheckWhatsAppRequest = z.infer<typeof CheckWhatsAppRequestSchema>;
export type TCheckWhatsAppResponse = z.infer<
  typeof CheckWhatsAppResponseSchema
>;
