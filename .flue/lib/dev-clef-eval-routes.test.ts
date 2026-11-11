import { describe, expect, it, vi } from "vitest";
import { clefEvalRoutes } from "./dev-clef-eval-routes";

function fakeAi(choice = "spam") {
	return {
		run: vi.fn(async () => ({
			answers: {
				is_spam: { type: "noul", noul: 0.95 },
				category: {
					type: "choice",
					choice,
					probabilities: { [choice]: 0.95 },
					confidence: 0.95,
				},
			},
		})),
	};
}

const comment = {
	comment: {
		id: 1,
		body: "x",
		url: "u",
		author: "a",
		author_association: "NONE",
	},
	parent: {
		kind: "issue",
		number: 1,
		title: "t",
		state: "open",
		url: "u",
		author: "b",
	},
};
const item = {
	eventType: "issues",
	item: { kind: "issue", number: 1, title: "t", body: "b" },
};

function post(path: string, body: unknown, env: object, secret?: string) {
	return clefEvalRoutes.request(
		path,
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
				...(secret ? { "x-dev-secret": secret } : {}),
			},
			body: JSON.stringify(body),
		},
		env,
	);
}

// Node lacks the workerd-only timingSafeEqual; stub it for the auth check.
Object.defineProperty(crypto.subtle, "timingSafeEqual", {
	configurable: true,
	value: async (a: Uint8Array, b: Uint8Array) =>
		a.every((byte, i) => byte === b[i]),
});

describe("clefEvalRoutes", () => {
	it("returns 500 when token is not configured", async () => {
		const res = await post("/item", item, { AI: fakeAi() }, "s");
		expect(res.status).toBe(500);
	});

	it("returns 401 for a missing or wrong secret", async () => {
		const env = { AI: fakeAi(), DOCS_FLUE_INTERNAL_TOKEN: "secret" };
		expect((await post("/item", item, env)).status).toBe(401);
		expect((await post("/comment", comment, env, "wrong")).status).toBe(401);
	});

	it("evaluates an item", async () => {
		const ai = fakeAi();
		const env = {
			AI: ai,
			DOCS_FLUE_INTERNAL_TOKEN: "secret",
			DOCS_FLUE_AI_GATEWAY_ID: "gw",
		};
		const res = await post("/item", item, env, "secret");
		expect(res.status).toBe(200);
		const body = (await res.json()) as { is_spam: boolean; category: string };
		expect(body.is_spam).toBe(true);
		expect(body.category).toBe("spam");
		expect(ai.run).toHaveBeenCalledTimes(1);
	});

	it("evaluates a comment", async () => {
		const env = {
			AI: fakeAi("link_promo"),
			DOCS_FLUE_INTERNAL_TOKEN: "secret",
		};
		const res = await post("/comment", comment, env, "secret");
		expect(res.status).toBe(200);
		const body = (await res.json()) as { is_spam: boolean };
		expect(body.is_spam).toBe(true);
	});
});
