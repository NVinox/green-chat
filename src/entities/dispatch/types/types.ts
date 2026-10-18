import { z } from "zod";

export const SendMessageSchemaRequest = z.object({
  chatId: z.string(),
  message: z.string().max(20_000),
});

export const SendMessageSchemaResponse = z.object({
  idMessage: z.string(),
});

export type TSendMessageRequest = z.infer<typeof SendMessageSchemaRequest>;
export type TSendMessageResponse = z.infer<typeof SendMessageSchemaResponse>;
