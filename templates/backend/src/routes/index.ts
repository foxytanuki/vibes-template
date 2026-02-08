import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { messageSchema } from "../schemas/index.js";

export const routes = new Hono();

routes.get("/", (c) => {
	return c.json({ message: "Hello" });
});

routes.get("/health", (c) => {
	return c.json({ status: "ok" });
});

routes.post("/messages", zValidator("json", messageSchema), (c) => {
	const data = c.req.valid("json");
	return c.json({ message: `Received: ${data.text}` });
});
