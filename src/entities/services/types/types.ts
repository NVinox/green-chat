import { z } from "zod";

export const EChatType = {
  USER: "user",
  GROUP: "group",
} as const;

export type TChatType = (typeof EChatType)[keyof typeof EChatType];

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

export type TChat = z.infer<typeof ChatSchema>;
