import { describe, expect, it } from "vitest";

import { buildCategoryLines } from "./config-examples";

const referencesIn = (category: Parameters<typeof buildCategoryLines>[0]) =>
	buildCategoryLines(category).flatMap((line) =>
		line.segments.flatMap((segment) => (segment.ref ? [segment.ref] : [])),
	);

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
				"      logs: {",
				"        persist: true,",
				"      },",
				"      traces: {",
				"        persist: true,",
				"      },",
				"    },",
			].join("\n"),
		);
	});
});
