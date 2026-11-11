// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import TOML from "@iarna/toml";
import fg from "fast-glob";
import { parse as parseJsonc } from "jsonc-parser";
import { afterAll, describe, expect, test, vi } from "vitest";
import { unstable_readConfig } from "wrangler";

const tempDir = mkdtempSync(join(tmpdir(), "artifacts-wrangler-config-"));

const examples = fg.sync("src/content/**/*.mdx").flatMap((file) =>
	[
		...readFileSync(file, "utf8").matchAll(
			/<WranglerConfig[^>]*>\s*```(jsonc|toml)\n([\s\S]*?)```\s*<\/WranglerConfig>/g,
		),
	]
		.filter(([, , code]) => code!.includes("cf.artifacts.repo."))
		.map(([, language, code], index) => ({
			name: `${file} #${index + 1}`,
			language: language!,
			code: code!,
		})),
);

afterAll(() => rmSync(tempDir, { recursive: true, force: true }));

describe("Artifacts event trigger examples", () => {
	test("are found", () => {
		expect(examples.length).toBeGreaterThan(0);
	});

	test.each(examples)(
		"$name passes Wrangler validation",
		({ name, language, code }) => {
			const configPath = join(
				tempDir,
				`${name.replaceAll(/[^\w.-]/g, "_")}.json`,
			);
			const config = language === "toml" ? TOML.parse(code) : parseJsonc(code);
			writeFileSync(
				configPath,
				JSON.stringify({ name: "artifacts-ci", triggers: config.triggers }),
			);
			const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

			try {
				expect(() => unstable_readConfig({ config: configPath })).not.toThrow();
				expect(warn).not.toHaveBeenCalled();
			} finally {
				warn.mockRestore();
			}
		},
	);
});
