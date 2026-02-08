import { zValidator } from "@hono/zod-validator";
import { desc } from "drizzle-orm";
import { type Context, Hono } from "hono";
import { getDb } from "../db/client.js";
import { messages } from "../db/schema.js";
import { messageSchema } from "../schemas/index.js";

export const routes = new Hono();

function onDatabaseError(c: Context, error: unknown) {
	if (error instanceof Error && error.message === "DATABASE_URL is not set") {
		return c.json(
			{
				error:
					"DATABASE_URL is not set. Copy .env.example to .env and update it.",
			},
			500,
		);
	}

	throw error;
}

routes.get("/", (c) => {
	return c.json({ message: "Hello" });
});

routes.get("/health", (c) => {
	return c.json({ status: "ok" });
});

routes.get("/messages", async (c) => {
	try {
		const db = getDb();
		const rows = await db
			.select()
			.from(messages)
			.orderBy(desc(messages.createdAt))
			.limit(50);
		return c.json({ messages: rows });
	} catch (error) {
		return onDatabaseError(c, error);
	}
});

routes.post("/messages", zValidator("json", messageSchema), async (c) => {
	try {
		const data = c.req.valid("json");
		const db = getDb();
		const [created] = await db
			.insert(messages)
			.values({ text: data.text })
			.returning();
		return c.json({ message: created }, 201);
	} catch (error) {
		return onDatabaseError(c, error);
	}
});
