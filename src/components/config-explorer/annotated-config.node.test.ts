import { parse } from "node-html-parser";
import { describe, expect, it } from "vitest";

import {
	buildAnnotatedCategories,
	formatDescription,
	highlightCode,
} from "./annotated-config";
import { buildCategoryLines } from "./config-examples";
import { CONFIG_REFERENCE } from "./config-reference.generated";

describe("annotated config explorer", () => {
	it("formats generated descriptions as safe HTML", () => {
		expect(
			formatDescription(
				"Use `accountId` <b>here</b>. See [Vite modes](https://vite.dev/guide/env-and-mode.html#modes) or https://developers.cloudflare.com/workers/configuration/compatibility-dates.",
			),
		).toBe(
			'Use <code>accountId</code> &lt;b&gt;here&lt;/b&gt;. See <a href="https://vite.dev/guide/env-and-mode.html#modes">Vite modes</a> or <a href="/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>.',
		);
	});

	it("highlights strings and keywords without changing the text", () => {
		const html = highlightCode('import { defineConfig } from "cf/config";');

		expect(html).toContain('<span class="ace-keyword">import</span>');
		expect(html).toContain(
			'<span class="ace-string">&quot;cf/config&quot;</span>',
		);
		expect(parse(html).text).toBe('import { defineConfig } from "cf/config";');
	});

	it("annotates every referenced line with a unique deep-link ID", () => {
		const categories = buildAnnotatedCategories("test");
		const ids = categories.flatMap((category) =>
			category.lines.flatMap((line) => (line.id ? [line.id] : [])),
		);

		expect(categories.map((category) => category.id)).toEqual([
			"config",
			"worker",
			"bindings",
			"triggers",
			"exports",
		]);
		expect(new Set(ids).size).toBe(ids.length);
		for (const category of categories) {
			expect(category.code).toBe(
				buildCategoryLines(category.id)
					.map((line) => line.text)
					.join("\n"),
			);
			for (const line of category.lines) {
				expect(Boolean(line.id)).toBe(line.references.length > 0);
				if (line.id) {
					expect(line.html).toContain('class="ace-token"');
				}
			}
		}
	});

	it("annotates Issues enablement with its generated description", () => {
		const worker = buildAnnotatedCategories("test").find(
			(category) => category.id === "worker",
		)!;
		const enabled = worker.lines
			.flatMap((line) => line.references)
			.find((ref) => ref.id === "WorkerConfig.observability.issues.enabled")!;

		expect(enabled.signature).toBe("enabled?: boolean");
		expect(enabled.descriptionHtml).toBe(
			"Whether real-time Issues are enabled.",
		);
	});

	it("includes builder options and full signatures in notes", () => {
		const bindings = buildAnnotatedCategories("test").find(
			(category) => category.id === "bindings",
		)!;
		const d1 = bindings.lines
			.flatMap((line) => line.references)
			.find((ref) => ref.name === "d1")!;

		expect(d1.kind).toBe("Builder");
		expect(d1.signature).toBe("d1(options?: D1BindingOptions): D1Binding;");
		expect(d1.options.map((option) => option.signature)).toEqual([
			"id?: string",
			"name?: string",
			"dev?: BindingDevOptions",
		]);
	});

	it("renders labeled links from generated metadata", () => {
		const limits = CONFIG_REFERENCE.worker.find(
			(reference) => reference.name === "limits",
		)!;
		const cpuMs = limits.children.find(
			(property) => property.name === "cpuMs",
		)! as (typeof limits.children)[number] & {
			links?: Array<{ label: string; url: string }>;
		};
		cpuMs.links = [
			{
				label: "Workers limits",
				url: "https://developers.cloudflare.com/workers/platform/limits/",
			},
		];

		try {
			const worker = buildAnnotatedCategories("test").find(
				(category) => category.id === "worker",
			)!;
			const reference = worker.lines
				.flatMap((line) => line.references)
				.find((ref) => ref.id === "WorkerConfig.limits.cpuMs")!;

			expect(reference.links).toEqual([
				{ label: "Workers limits", url: "/workers/platform/limits/" },
			]);
		} finally {
			delete cpuMs.links;
		}
	});
});
