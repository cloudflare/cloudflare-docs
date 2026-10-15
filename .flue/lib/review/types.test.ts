import * as v from "valibot";
import { describe, expect, it } from "vitest";
import {
	JudgeResultSchema,
	SpecialistResultSchema,
	stripDiffPrefixes,
} from "./types";

describe("stripDiffPrefixes", () => {
	it("removes numbered diff prefixes from every line", () => {
		expect(
			stripDiffPrefixes("+ 83 │ \tawait run();\n= 84 │ \treturn;\n  85 │ }"),
		).toBe("\tawait run();\n\treturn;\n}");
	});

	it("removes deleted-line prefixes", () => {
		expect(stripDiffPrefixes("- (old 7) │ const a = 1;")).toBe("const a = 1;");
	});

	it("removes bare markers when every line has one", () => {
		expect(stripDiffPrefixes("+ \tif (x) {\n+ \t\ty();\n\n+ \t}")).toBe(
			"\tif (x) {\n\t\ty();\n\n\t}",
		);
	});

	it("leaves text alone when only some lines have a prefix", () => {
		const snippet = "+ 1 │ a\nplain line";
		expect(stripDiffPrefixes(snippet)).toBe(snippet);
	});

	it("leaves plain code alone", () => {
		expect(stripDiffPrefixes("const total = a + b;")).toBe(
			"const total = a + b;",
		);
	});
});

describe("model-facing schemas", () => {
	it("preserves long prose fields", () => {
		const result = v.parse(SpecialistResultSchema, {
			summary: "s".repeat(900),
			findings: [
				{ path: "a.ts", line: 1, title: "t".repeat(200), explanation: "e" },
			],
		});

		expect(result.summary).toHaveLength(900);
		expect(result.findings[0].title).toHaveLength(200);
	});

	it("drops an over-long snippet and keeps one within the limit", () => {
		const result = v.parse(SpecialistResultSchema, {
			summary: "",
			findings: [
				{
					path: "a.ts",
					title: "t",
					explanation: "e",
					snippet: "x".repeat(501),
				},
				{ path: "a.ts", title: "t", explanation: "e", snippet: "y" },
			],
		});

		expect(result.findings[0].snippet).toBeUndefined();
		expect(result.findings[1].snippet).toBe("y");
	});

	it("strips finding fields outside the schema", () => {
		const result = v.parse(SpecialistResultSchema, {
			summary: "",
			findings: [{ path: "a.ts", title: "t", explanation: "e", fix: "y" }],
		});

		expect(result.findings[0]).not.toHaveProperty("fix");
	});

	it("still rejects an empty title", () => {
		const result = v.safeParse(SpecialistResultSchema, {
			summary: "",
			findings: [{ path: "a.ts", title: "", explanation: "e" }],
		});

		expect(result.success).toBe(false);
	});

	it("parses its own output again unchanged", () => {
		const once = v.parse(SpecialistResultSchema, {
			summary: "s".repeat(900),
			findings: [],
		});
		const twice = v.parse(SpecialistResultSchema, structuredClone(once));

		expect(twice).toEqual(once);
	});

	it("preserves judge reasons", () => {
		const result = v.parse(JudgeResultSchema, {
			new_findings: [{ id: "C1", decision: "keep", reason: "r".repeat(400) }],
			prior_findings: [],
		});

		expect(result.new_findings[0].reason).toHaveLength(400);
	});
});
