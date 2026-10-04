import { InputWorkerSchema } from "@cloudflare/config";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { allReferences, buildCategoryLines } from "./config-examples";

const referencesIn = (category: Parameters<typeof buildCategoryLines>[0]) =>
	buildCategoryLines(category).flatMap((line) =>
		line.segments.flatMap((segment) => (segment.ref ? [segment.ref] : [])),
	);

function examplePropertyValue(name: string, mode?: string): unknown {
	const code = buildCategoryLines("worker")
		.map((line) => line.text)
		.join("\n");
	const source = ts.createSourceFile(
		"example.ts",
		code,
		ts.ScriptTarget.Latest,
	);
	let initializer: ts.Expression | undefined;

	function visit(node: ts.Node) {
		if (ts.isPropertyAssignment(node) && node.name.getText(source) === name) {
			initializer ??= node.initializer;
		}
		ts.forEachChild(node, visit);
	}
	visit(source);

	if (!initializer) {
		throw new Error(`Missing Worker example property: ${name}`);
	}
	return new Function("mode", `return (${initializer.getText(source)});`)(mode);
}

describe("config examples", () => {
	it("renders the default configuration export", () => {
		const config = buildCategoryLines("config")
			.map((line) => line.text)
			.join("\n");
		const worker = buildCategoryLines("worker")
			.map((line) => line.text)
			.join("\n");

		expect(config).toContain('import { defineConfig } from "cf/config";');
		expect(config).toContain("export default defineConfig(");
		expect(config).toContain("  accountId:");
		expect(config).toContain("  worker: {");
		expect(config).not.toContain("defineSettings");
		expect(worker).toContain("export default defineConfig(");
		expect(worker).toContain("  worker: {");
		expect(worker).not.toContain("defineWorker");
	});

	it("renders generated references for nested example properties", () => {
		expect(referencesIn("worker")).toEqual(
			expect.arrayContaining([
				"WorkerConfig.limits.cpuMs",
				"WorkerConfig.observability.issues",
				"WorkerConfig.observability.issues.enabled",
				"Bindings.d1.default.name",
				"Exports.worker.default.cache.enabled",
			]),
		);
		expect(referencesIn("triggers")).toContain(
			"Triggers.queue.default.maxBatchSize",
		);
		expect(referencesIn("exports")).toContain(
			"Exports.durableObject.renamed.renamedTo",
		);
	});

	it.each(["observability", "assets", "placement"] as const)(
		"features every generated %s field in the Worker example",
		(name) => {
			const prefix = `WorkerConfig.${name}`;
			const expected = allReferences()
				.filter((ref) => ref.id === prefix || ref.id.startsWith(`${prefix}.`))
				.map((ref) => ref.id);

			expect(expected.length).toBeGreaterThan(1);
			expect(referencesIn("worker")).toEqual(expect.arrayContaining(expected));
		},
	);

	it.each(["observability", "assets"] as const)(
		"renders valid %s configuration",
		(name) => {
			expect(() =>
				InputWorkerSchema.shape[name].parse(examplePropertyValue(name)),
			).not.toThrow();
		},
	);

	it.each([
		{ mode: undefined, expected: { mode: "smart", hint: "ENAM" } },
		{ mode: "regional", expected: { region: "aws:us-east-1" } },
		{ mode: "host", expected: { host: "database.example.com:5432" } },
		{ mode: "hostname", expected: { hostname: "api.example.com" } },
	])("renders valid placement for $mode mode", ({ mode, expected }) => {
		const value = examplePropertyValue("placement", mode);

		expect(value).toEqual(expected);
		expect(() => InputWorkerSchema.shape.placement.parse(value)).not.toThrow();
	});

	it("formats nested examples without long code lines", () => {
		for (const category of [
			"config",
			"worker",
			"bindings",
			"triggers",
			"exports",
		] as const) {
			const lines = buildCategoryLines(category);
			expect(
				Math.max(...lines.map((line) => line.text.length)),
			).toBeLessThanOrEqual(70);
		}

		expect(
			buildCategoryLines("worker")
				.map((line) => line.text)
				.join("\n"),
		).toContain(
			[
				"    observability: {",
				"      enabled: true,",
				"      headSamplingRate: 1,",
				"      redactQueryString: true,",
				"      issues: {",
				"        enabled: true,",
				"      },",
				"      logs: {",
				"        enabled: true,",
				"        headSamplingRate: 1,",
				"        invocationLogs: true,",
				"        persist: true,",
				"        destinations: [],",
				"      },",
				"      traces: {",
				"        enabled: true,",
				"        headSamplingRate: 0.1,",
				"        persist: true,",
				"        destinations: [],",
				"      },",
				"    },",
			].join("\n"),
		);
	});
});
