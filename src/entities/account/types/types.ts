import { z } from "zod";

export const AccountCredentialsSchema = z.object({
  idInstance: z
    .number()
    .nonnegative({ message: "Число должно быть положительным" })
    .min(1, { message: "Поле обязательно для заполнения" }),
  apiTokenInstance: z
    .string()
    .trim()
    .min(1, { message: "Поле обязательно для заполнения" }),
});

export const AccountSettingsResponseSchema = z.object({
  autoTyping: z.number(),
  catalogWebhook: z.string(),
  countryInstance: z.string(),
  delaySendMessagesMilliseconds: z.number(),
  deletedMessageWebhook: z.string(),
  deviceWebhook: z.string(),
  editedMessageWebhook: z.string(),
  enableLidMode: z.string(),
  enableMessagesHistory: z.string(),
  incomingBlockWebhook: z.string(),
  incomingCallWebhook: z.string(),
  incomingMessageStatusWebhook: z.string(),
  incomingWebhook: z.string(),
  keepOnlineStatus: z.string(),
  linkPreview: z.string(),
  markIncomingMessagesReaded: z.string(),
  markIncomingMessagesReadedOnReply: z.string(),
  outgoingAPIMessageWebhook: z.string(),
  outgoingCallWebhook: z.string(),
  outgoingMessageWebhook: z.string(),
  outgoingWebhook: z.string(),
  pollMessageWebhook: z.string(),
  proxyInstance: z.string(),
  sharedSession: z.string(),
  stateWebhook: z.string(),
  statusInstanceWebhook: z.string(),
  typeAccount: z.string(),
  webhookUrl: z.string(),
  webhookUrlToken: z.string(),
  wid: z.string(),
});

export type TAccountCredentials = z.infer<typeof AccountCredentialsSchema>;

export interface IAccountCredentialsErrorResponse {
  idInstance?: string;
  apiTokenInstance?: string;
}

export type TAccountSettingsResponse = z.infer<
  typeof AccountSettingsResponseSchema
>;
