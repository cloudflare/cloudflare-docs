import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

const oauthPrompts = [
	{
		name: "SFU app",
		filePath: "partials/realtime/sfu/create-app-prompt.mdx",
		scope: "calls.write",
	},
	{
		name: "TURN credentials",
		filePath: "docs/realtime/turn/generate-credentials.mdx",
		scope: "calls.write",
	},
	{
		name: "MoQ relay",
		filePath: "docs/moq/index.mdx",
		scope: "moq.write",
	},
	{
		name: "RealtimeKit app",
		filePath: "docs/realtime/realtimekit/quickstart.mdx",
		scope: "realtime.write",
	},
	{
		name: "participant preset",
		filePath: "partials/realtime/realtimekit/preset-prompt.mdx",
		scope: "realtime.write",
	},
	{
		name: "webhook",
		filePath: "docs/realtime/realtimekit/webhooks.mdx",
		scope: "realtime.write",
	},
	{
		name: "webinar presets",
		filePath: "docs/realtime/realtimekit/webinar.mdx",
		scope: "realtime.write",
	},
];

const tokenPromptPath = "partials/realtime/realtimekit/api-token-prompt.mdx";

function readCopiedPrompt(filePath: string) {
	const source = readFileSync(
		resolve(dirname(fileURLToPath(import.meta.url)), "../content", filePath),
		"utf8",
	);
	const prompts = Array.from(
		source.matchAll(/<CopyPromptButton\b[^>]*\bprompt="([^"]+)"/g),
	);

	expect(prompts, filePath).toHaveLength(1);
	return prompts[0][1];
}

describe("Realtime copied setup prompts", () => {
	test.each(oauthPrompts)(
		"$name requests explicit scopes and waits for browser authorization",
		({ filePath, scope }) => {
			const prompt = readCopiedPrompt(filePath);

			expect(prompt).toContain(
				`cf auth login --scopes ${scope} account:read user:read`,
			);
			expect(prompt).toContain("wait for my confirmation");
			expect(prompt).toContain("cf auth whoami");
			expect(prompt.indexOf("cf auth whoami")).toBeLessThan(
				prompt.indexOf("--dry-run"),
			);
		},
	);

	test.each([
		...oauthPrompts.filter(({ scope }) => scope === "realtime.write"),
		{ name: "RealtimeKit API token", filePath: tokenPromptPath },
	])("$name protects app access tokens", ({ filePath }) => {
		const prompt = readCopiedPrompt(filePath);

		expect(prompt).toContain("access_token");
		expect(prompt).toContain("restricted local file");
		expect(prompt).toContain("display only app IDs and names");
	});

	test("requires token cleanup authorization before creation", () => {
		const prompt = readCopiedPrompt(tokenPromptPath);

		expect(prompt).toContain("Create additional tokens template");
		expect(prompt).toContain("create and delete user tokens");
		expect(prompt).toContain("If any user-token call returns 403, stop");
		expect(prompt.indexOf("create and delete user tokens")).toBeLessThan(
			prompt.indexOf("--dry-run"),
		);
		expect(prompt).toContain("delete the exact token created");
	});

	test("blocks webhook registration until the endpoint is verified", () => {
		const prompt = readCopiedPrompt("docs/realtime/realtimekit/webhooks.mdx");

		expect(prompt).toContain("rtk-signature");
		expect(prompt).toContain("raw request body");
		expect(prompt).toContain(
			"do not register the webhook, enabled or disabled",
		);
		expect(prompt.indexOf("do not register the webhook")).toBeLessThan(
			prompt.indexOf("--dry-run"),
		);
	});

	test("requires consent before changing any existing webinar preset", () => {
		const prompt = readCopiedPrompt("docs/realtime/realtimekit/webinar.mdx");

		expect(prompt).toContain("Do not modify any existing preset");
		expect(prompt).toContain("including the defaults");
		expect(prompt).toContain("explicitly confirm the exact change");
		expect(prompt).toContain("even if no meetings use it");
		expect(prompt).toContain("create separately named");
		expect(prompt).not.toContain("ask before changing a shared preset");
	});
});
