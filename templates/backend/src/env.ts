import { z } from "zod";

const runtimeEnvSchema = z.object({
	DATABASE_URL: z.string().url(),
});

function formatError(error: z.ZodError) {
	return error.issues
		.map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
		.join("; ");
}

let cachedEnv: z.infer<typeof runtimeEnvSchema> | null = null;

export function getEnv() {
	if (cachedEnv) {
		return cachedEnv;
	}

	const parsedEnv = runtimeEnvSchema.safeParse(process.env);

	if (!parsedEnv.success) {
		const hasMissingDatabaseUrl = parsedEnv.error.issues.some(
			(issue) =>
				issue.path[0] === "DATABASE_URL" && issue.code === "invalid_type",
		);

		if (hasMissingDatabaseUrl) {
			throw new Error("DATABASE_URL is not set");
		}

		throw new Error(
			`Invalid backend environment variables: ${formatError(parsedEnv.error)}`,
		);
	}

	cachedEnv = parsedEnv.data;
	return cachedEnv;
}
