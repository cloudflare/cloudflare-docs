import { describe, expect, test } from "vitest";
import { orderCliVariants, validateCliVariants } from "./cli-variants";

const variant = (cli: string, body = "<p>Text</p>") =>
	`<div data-nb-cli-variant="${cli}" data-cli-variants-item="${cli}">${body}</div>`;

describe("validateCliVariants", () => {
	test("accepts one Wrangler and one cf variant in either order", () => {
		expect(validateCliVariants(variant("wrangler") + variant("cf"))).toBeNull();
		expect(
			validateCliVariants(`\n${variant("cf")}\n\n${variant("wrangler")}\n`),
		).toBeNull();
	});

	test("accepts other components inside a variant", () => {
		const steps = "<ol><li><pre><code>cf deploy</code></pre></li></ol>";
		expect(
			validateCliVariants(variant("wrangler") + variant("cf", steps)),
		).toBeNull();
	});

	test.each([
		["a missing cf variant", variant("wrangler"), 'cli="cf"> child, found 0'],
		[
			"a duplicate variant",
			variant("wrangler") + variant("cf") + variant("cf"),
			'cli="cf"> child, found 2',
		],
		[
			"content outside the variants",
			`<p>Intro</p>${variant("wrangler")}${variant("cf")}`,
			"Put all content inside",
		],
		[
			"loose text outside the variants",
			`Intro${variant("wrangler")}${variant("cf")}`,
			"Put all content inside",
		],
		[
			"nested CliVariants",
			variant("wrangler", variant("wrangler") + variant("cf")) + variant("cf"),
			"Do not nest",
		],
		[
			"a nested CLI selector",
			variant(
				"wrangler",
				'<div data-nb-cli-preference-scope><div data-nb-cli-variant="cf"></div></div>',
			) + variant("cf"),
			"own CLI selector",
		],
	])("rejects %s", (_name, html, message) => {
		expect(validateCliVariants(html)).toContain(message);
	});
});

describe("orderCliVariants", () => {
	const wrangler = variant(
		"wrangler",
		"<div><div>Run   Wrangler</div></div><div>&amp; wait.</div>",
	);
	const cf = variant("cf", "<pre><code>cf deploy\n</code></pre>");

	test.each([
		["Wrangler first", `\n${wrangler}\n\n${cf}\n`],
		["cf first", cf + wrangler],
	])("puts cf first when the author wrote %s", (_name, html) => {
		expect(orderCliVariants(html)).toBe(cf + wrangler);
	});
});
