import { describe, expect, test } from "bun:test";
import { messageSchema } from "../schemas/index.js";

describe("messageSchema", () => {
	test("accepts valid text", () => {
		const result = messageSchema.safeParse({ text: "hello" });
		expect(result.success).toBe(true);
	});

	test("rejects empty text", () => {
		const result = messageSchema.safeParse({ text: "" });
		expect(result.success).toBe(false);
	});

	test("rejects text over 500 chars", () => {
		const result = messageSchema.safeParse({ text: "a".repeat(501) });
		expect(result.success).toBe(false);
	});

	test("accepts text at 500 chars", () => {
		const result = messageSchema.safeParse({ text: "a".repeat(500) });
		expect(result.success).toBe(true);
	});

	test("rejects missing text", () => {
		const result = messageSchema.safeParse({});
		expect(result.success).toBe(false);
	});

	test("rejects non-string text", () => {
		const result = messageSchema.safeParse({ text: 123 });
		expect(result.success).toBe(false);
	});
});
