import { describe, expect, it } from "vitest";
import { syncZdrFields } from "./catalog-import-utils";

function modelFile(fields: Record<string, unknown> = {}): string {
	const model = {
		model_id: "anthropic/claude-haiku-5.5",
		provider_id: "anthropic",
		name: "Claude Haiku 5.5",
		description: "Committed description.",
		zdr: false,
		zdr_comment: null,
		...fields,
	};
	return `${JSON.stringify(model, null, "\t")}\n`;
}

function parse(text: string | null): Record<string, unknown> {
	return JSON.parse(text ?? "{}");
}

describe("syncZdrFields", () => {
	it("turns ZDR on for a model that already has a page", () => {
		const updated = syncZdrFields(modelFile(), modelFile({ zdr: true }));

		expect(updated).not.toBeNull();
		expect(parse(updated).zdr).toBe(true);
	});

	it("turns ZDR off when the catalog removes it", () => {
		const current = modelFile({ zdr: true });
		const updated = syncZdrFields(current, modelFile({ zdr: false }));

		expect(updated).not.toBeNull();
		expect(parse(updated).zdr).toBe(false);
	});

	it("copies the ZDR comment", () => {
		const comment = "Retention disabled by the provider.";
		const fetched = modelFile({ zdr: true, zdr_comment: comment });

		const updated = syncZdrFields(modelFile(), fetched);

		expect(parse(updated).zdr_comment).toBe(comment);
	});

	it("changes only the ZDR fields and keeps the file's formatting", () => {
		const fetched = modelFile({ zdr: true, description: "Fetched." });
		const expected = modelFile({ zdr: true });

		expect(syncZdrFields(modelFile(), fetched)).toBe(expected);
	});

	it("escapes non-ASCII in the comment like the fetch script", () => {
		const comment = "Confirmed \u2014 terms";
		const fetched = modelFile({ zdr: true, zdr_comment: comment });
		const updated = syncZdrFields(modelFile(), fetched);

		expect(updated).toContain('"zdr_comment": "Confirmed \\u2014 terms"');
		expect(parse(updated).zdr_comment).toBe(comment);
	});

	it("returns null when the ZDR fields already match", () => {
		const fetched = modelFile({ description: "Fetched." });

		expect(syncZdrFields(modelFile(), fetched)).toBeNull();
	});
});
