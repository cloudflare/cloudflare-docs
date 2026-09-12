import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

import { AGENTS } from "./agents";
import { getAgentIconSource } from "./types";

const publicDirectory = resolve(
	dirname(fileURLToPath(import.meta.url)),
	"../../../public",
);

describe("getAgentIconSource", () => {
	test("uses theme-specific SVGs by default", () => {
		expect(getAgentIconSource("claude", undefined, "light")).toBe(
			"/icons/agents/claude/light.svg",
		);
		expect(getAgentIconSource("claude", undefined, "dark")).toBe(
			"/icons/agents/claude/dark.svg",
		);
	});

	test("uses a shared icon file when configured", () => {
		expect(getAgentIconSource("vibe", "icon.png", "light")).toBe(
			"/icons/agents/vibe/icon.png",
		);
		expect(getAgentIconSource("vibe", "icon.png", "dark")).toBe(
			"/icons/agents/vibe/icon.png",
		);
	});

	test("every agent icon exists", () => {
		for (const agent of AGENTS) {
			for (const theme of ["light", "dark"] as const) {
				const source = getAgentIconSource(agent.icon, agent.iconFile, theme);
				expect(existsSync(resolve(publicDirectory, source.slice(1)))).toBe(
					true,
				);
			}
		}
	});
});
