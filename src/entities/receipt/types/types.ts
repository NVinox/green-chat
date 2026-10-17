import { z } from "zod";

export const DeleteNotificationResponseSchema = z.object({
  result: z.boolean(),
  reason: z.string(),
});

export type TDeleteNotificationResponse = z.infer<
  typeof DeleteNotificationResponseSchema
>;
