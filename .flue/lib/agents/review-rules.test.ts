import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { STYLE_RULE_INSTRUCTIONS } from "./review-rules";

const STYLE_GUIDE_DIR = join(import.meta.dirname, "../../prompts/style-guide");

describe("review rules", () => {
	it("loads every style rule file exactly once", () => {
		const onDisk = ["always", "conditional", "components"].flatMap((category) =>
			readdirSync(join(STYLE_GUIDE_DIR, category))
				.filter((name) => name.endsWith(".md"))
				.map((name) => `${category}/${name.slice(0, -3)}`),
		);
		const loaded = STYLE_RULE_INSTRUCTIONS.map(
			(rules) => /^<style_rules name="([^"]+)">/.exec(rules)?.[1],
		);
		expect(new Set(loaded).size).toBe(loaded.length);
		expect([...loaded].sort()).toEqual(onDisk.sort());
	});
});
