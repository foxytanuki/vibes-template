import { z } from "zod";

export const messageSchema = z.object({
	text: z.string().min(1).max(500),
});

export type Message = z.infer<typeof messageSchema>;
