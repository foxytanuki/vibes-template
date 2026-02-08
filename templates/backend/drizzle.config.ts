import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

const configEnvSchema = z.object({
	DATABASE_URL: z.string().url().default("postgresql://postgres:postgres@localhost:5432/app"),
});

const configEnv = configEnvSchema.parse(process.env);

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	dbCredentials: {
		url: configEnv.DATABASE_URL,
	},
});
