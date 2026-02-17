import { describe, expect, test } from "bun:test";
import app from "../index.js";

describe("GET /", () => {
	test("returns hello message", async () => {
		const res = await app.request("/");
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ message: "Hello" });
	});
});

describe("GET /health", () => {
	test("returns ok status", async () => {
		const res = await app.request("/health");
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ status: "ok" });
	});
});

describe("POST /messages", () => {
	test("rejects empty text", async () => {
		const res = await app.request("/messages", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: "" }),
		});
		expect(res.status).toBe(400);
	});

	test("rejects missing body", async () => {
		const res = await app.request("/messages", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({}),
		});
		expect(res.status).toBe(400);
	});
});
