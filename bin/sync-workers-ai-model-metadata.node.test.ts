import { describe, expect, it } from "vitest";
import {
	buildSyncPlan,
	parseHydratedModels,
	parseSearchPage,
	renderPullRequestBody,
	type ModelDocument,
} from "./sync-workers-ai-model-metadata";

function existing(fileName: string, model: ModelDocument) {
	return { fileName, model };
}

describe("Workers AI model metadata sync", () => {
	it("parses and validates the Config API response", () => {
		expect(
			parseSearchPage({
				success: true,
				result: [
					{
						name: "@cf/example/model",
						properties: [{ property_id: "context_window", value: "128000" }],
					},
				],
				result_info: { page: 2, per_page: 100, total_count: 101 },
			}),
		).toEqual({
			models: [
				{
					name: "@cf/example/model",
					properties: [{ property_id: "context_window", value: "128000" }],
				},
			],
			page: 2,
			perPage: 100,
			totalCount: 101,
		});

		expect(() => parseSearchPage({ success: true, result: null })).toThrow(
			"did not return a result array",
		);
		expect(() => parseHydratedModels({ models: [] })).toThrow(
			"returned no models",
		);
	});

	it("updates authoritative tracked properties and preserves unrelated values", () => {
		const original: ModelDocument = {
			name: "@cf/example/model",
			description: "Keep this description",
			properties: [
				{ property_id: "context_window", value: "64000" },
				{ property_id: "max_output_tokens", value: "4096" },
				{
					property_id: "reasoning_effort",
					value: { default_effort: "high", supported_efforts: ["low", "high"] },
				},
				{ property_id: "price", value: [{ price: 1, unit: "per token" }] },
			],
		};
		const plan = buildSyncPlan(
			new Map([[original.name, existing("model.json", original)]]),
			[
				{
					name: original.name,
					properties: [
						{ property_id: "context_window", value: "128000" },
						{ property_id: "max_output_tokens", value: "8192" },
						{
							property_id: "reasoning_effort",
							value: {
								supported_efforts: ["low", "high", "max"],
								default_effort: "max",
							},
						},
					],
				},
			],
			[],
		);

		expect(plan.changes.map((change) => change.propertyId)).toEqual([
			"context_window",
			"max_output_tokens",
			"reasoning_effort",
		]);
		expect(plan.files.get("model.json")).toMatchObject({
			description: "Keep this description",
			properties: expect.arrayContaining([
				{ property_id: "context_window", value: "128000" },
				{ property_id: "max_output_tokens", value: "8192" },
				{ property_id: "price", value: [{ price: 1, unit: "per token" }] },
			]),
		});
		expect(original.properties?.[0].value).toBe("64000");
	});

	it("does not rewrite semantically identical structured metadata", () => {
		const model: ModelDocument = {
			name: "@cf/example/model",
			properties: [
				{
					property_id: "reasoning_effort",
					value: {
						default_effort: "high",
						mandatory: true,
						supported_efforts: ["low", "high", "max"],
					},
				},
			],
		};
		const plan = buildSyncPlan(
			new Map([[model.name, existing("model.json", model)]]),
			[
				{
					name: model.name,
					properties: [
						{
							property_id: "reasoning_effort",
							value: {
								mandatory: true,
								default_effort: "high",
								supported_efforts: ["max", "high", "low"],
							},
						},
					],
				},
			],
			[],
		);

		expect(plan).toEqual({ files: new Map(), changes: [] });
	});

	it("preserves existing values when tracked API metadata is empty or invalid", () => {
		const model: ModelDocument = {
			name: "@cf/example/model",
			properties: [
				{ property_id: "context_window", value: "64000" },
				{ property_id: "max_output_tokens", value: "4096" },
				{ property_id: "reasoning_effort", value: { default_effort: "high" } },
			],
		};
		const plan = buildSyncPlan(
			new Map([[model.name, existing("model.json", model)]]),
			[
				{
					name: model.name,
					properties: [
						{ property_id: "context_window", value: null },
						{ property_id: "max_output_tokens", value: 0 },
						{ property_id: "reasoning_effort", value: {} },
					],
				},
			],
			[],
		);

		expect(plan).toEqual({ files: new Map(), changes: [] });
	});

	it("hydrates new models without deleting models absent from the API", () => {
		const retained: ModelDocument = {
			name: "@cf/example/retained",
			properties: [{ property_id: "context_window", value: "32000" }],
		};
		const added: ModelDocument = {
			name: "@cf/example/new-model",
			description: "Full hydrated model",
			schema: { input: { type: "object" }, output: { type: "object" } },
			properties: [{ property_id: "context_window", value: "64000" }],
		};
		const plan = buildSyncPlan(
			new Map([[retained.name, existing("retained.json", retained)]]),
			[
				{
					name: added.name,
					properties: [{ property_id: "context_window", value: "128000" }],
				},
			],
			[added],
		);

		expect(plan.files.has("retained.json")).toBe(false);
		expect(plan.files.get("new-model.json")).toMatchObject({
			description: "Full hydrated model",
			schema: added.schema,
			properties: [{ property_id: "context_window", value: "128000" }],
		});
		expect(plan.changes).toEqual([{ model: added.name, kind: "new" }]);
	});

	it("refuses incomplete new-model hydration and duplicate API records", () => {
		const searchModel = {
			name: "@cf/example/new-model",
			properties: [{ property_id: "context_window", value: "128000" }],
		};

		expect(() => buildSyncPlan(new Map(), [searchModel], [])).toThrow(
			"is not yet available from the full model-docs endpoint",
		);
		expect(() =>
			buildSyncPlan(new Map(), [searchModel, searchModel], []),
		).toThrow("duplicate model");
	});

	it("renders a reviewable pull request summary", () => {
		const body = renderPullRequestBody([
			{ model: "@cf/example/new-model", kind: "new" },
			{
				model: "@cf/example/model",
				kind: "updated",
				propertyId: "context_window",
				before: "64000",
				after: "128000",
			},
		]);

		expect(body).toContain("## New models");
		expect(body).toContain("`@cf/example/new-model`");
		expect(body).toContain('`context_window`: `"64000"` → `"128000"`');
		expect(body).toContain("Models absent from the API response are preserved");
	});
});
