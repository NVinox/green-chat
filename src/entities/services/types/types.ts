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
  count: z.number().nonnegative(),
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
    [EMessageType.TEXT_MESSAGE, EMessageType.EXTENDED_TEXT_MESSAGE],
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

export type TChat = z.infer<typeof ChatSchema>;
export type TChatHistoryRequest = z.infer<typeof ChatHistoryRequestSchema>;
export type TChatHistoryResponse = z.infer<typeof ChatHistoryResponseSchema>;
