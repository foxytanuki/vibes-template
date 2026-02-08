import { z } from "zod";

const envSchema = z.object({
	VITE_APP_NAME: z.string().min(1).default("Vibes App"),
	VITE_API_BASE_URL: z.string().url().default("http://localhost:3000"),
});

function formatError(error: z.ZodError) {
	return error.issues
		.map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
		.join("; ");
}

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
	throw new Error(`Invalid frontend environment variables: ${formatError(parsedEnv.error)}`);
}

export const env = parsedEnv.data;
