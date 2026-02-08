import { drizzle } from "drizzle-orm/bun-sql";
import { getEnv } from "../env.js";
import * as schema from "./schema.js";

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
	if (db) {
		return db;
	}

	db = drizzle(getEnv().DATABASE_URL, { schema });
	return db;
}
