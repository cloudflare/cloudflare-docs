import { parse } from "node-html-parser";
import { mdxToJs } from "satteri";
import { afterEach, describe, expect, it, vi } from "vitest";

import { buildAnnotatedCategories } from "./annotated-config";
import {
	buildAnnotatedSnippet,
	dedentSnippet,
	restoreMdxIndentation,
	tokenize,
} from "./annotated-snippet";

// The configuration `cf init` generates (packages/cli/src/commands/init/template.ts).
const INIT_CONFIG = `import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "my-worker",
		compatibilityDate: "2026-09-17",
		entrypoint,
		env: {
			WORLD: bindings.text("World"),
		},
	},
});`;

// The orders-api example from the Wrangler migration guide.
const ORDERS_CONFIG = `import { bindings, defineConfig, exports, triggers } from "cf/config";
import * as entrypoint from "./src/index" with { type: "cf-worker" };

type Job = {
	orderId: string;
};

export default defineConfig({
	accountId: "<ACCOUNT_ID>",
	worker: {
		name: "orders-api",
		entrypoint,
		compatibilityDate: "2026-08-24",
		compatibilityFlags: ["nodejs_compat"],
		env: {
			ENVIRONMENT: bindings.text("production"),
			DB: bindings.d1({
				name: "orders-db",
				id: "<DATABASE_ID>",
			}),
			JOBS: bindings.queue<Job>({ name: "orders-jobs" }),
			COUNTERS: bindings.durableObject({
				worker: "orders-api",
				exportName: "Counter",
			}),
		},
		exports: {
			Counter: exports.durableObject({ storage: "sqlite" }),
		},
		triggers: [
			triggers.fetch({
				pattern: "api.example.com/*",
				zone: "example.com",
			}),
			triggers.queue({ name: "orders-jobs", maxBatchSize: 10 }),
			triggers.scheduled({ schedule: "0 * * * *" }),
		],
	},
});`;

// The mode example from the Wrangler migration guide.
const MODE_CONFIG = `import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index" with { type: "cf-worker" };

export default defineConfig(({ mode }) => {
	const isStaging = mode === "staging";

	return {
		worker: {
			name: isStaging ? "orders-api-staging" : "orders-api",
			entrypoint,
			compatibilityDate: "2026-08-24",
			env: {
				ENVIRONMENT: bindings.text(isStaging ? "staging" : "production"),
				DB: bindings.d1({
					name: isStaging ? "orders-db-staging" : "orders-db",
				}),
			},
		},
	};
});`;

// What the MDX compiler passes to the component: every line of an attribute
// expression after the first loses one leading tab.
const mdxStrip = (code: string) =>
	code
		.split("\n")
		.map((line, index) => (index ? line.replace(/^\t/, "") : line))
		.join("\n");

type Snippet = ReturnType<typeof buildAnnotatedSnippet>;

// Visible text of the highlighted HTML, with entities decoded.
const textOf = (html: string) => parse(html).text;

const lineFor = (snippet: Snippet, text: string) => {
	const line = snippet.lines.find((candidate) =>
		textOf(candidate.html).includes(text),
	);
	if (!line) {
		throw new Error(`No line contains ${text}`);
	}
	return line;
};

const refsOn = (snippet: Snippet, text: string) =>
	lineFor(snippet, text).references.map((ref) => ref.id);

const tokensOn = (snippet: Snippet, text: string) =>
	[...lineFor(snippet, text).html.matchAll(/class="ace-token">([^<]*)</g)].map(
		(match) => match[1],
	);

afterEach(() => {
	vi.restoreAllMocks();
});

describe("dedentSnippet", () => {
	it("trims blank edges and shared indentation but keeps tabs", () => {
		expect(dedentSnippet("\n\n\t\tfoo({\n\t\t\tbar,\n\n\t\t});\n\t")).toBe(
			"foo({\n\tbar,\n\n});",
		);
		expect(dedentSnippet("  a\r\n    b  \r\n")).toBe("a\n  b");
	});
});

describe("restoreMdxIndentation", () => {
	const CONTINUATION = `export default defineConfig({
	worker: {
		name: isStaging
			? "api-staging"
			: "api",
		/* compatibilityDate: {
			old: true,
		}, */
		compatibilityDate: "2026-09-17",
	},
});`;

	it("restores the tab MDX removes from each continuation line", () => {
		for (const code of [
			INIT_CONFIG,
			ORDERS_CONFIG,
			MODE_CONFIG,
			CONTINUATION,
		]) {
			expect(mdxStrip(code)).not.toBe(code);
			expect(restoreMdxIndentation(mdxStrip(code))).toBe(code);
		}
	});

	it("leaves correctly indented code unchanged", () => {
		for (const code of [
			INIT_CONFIG,
			ORDERS_CONFIG,
			MODE_CONFIG,
			CONTINUATION,
			// A snippet that starts on a new line loses one tab from every line,
			// which dedenting already handles.
			dedentSnippet(mdxStrip(`\n\t${INIT_CONFIG.replaceAll("\n", "\n\t")}`)),
		]) {
			expect(restoreMdxIndentation(code)).toBe(code);
		}
	});

	it("restores the two tabs MDX removes inside a numbered list", () => {
		for (const code of [INIT_CONFIG, ORDERS_CONFIG, MODE_CONFIG]) {
			expect(restoreMdxIndentation(mdxStrip(mdxStrip(code)))).toBe(code);
		}
		// Two levels collapse completely, so flat code is re-indented.
		expect(
			restoreMdxIndentation("defineConfig({\nworker: {\nname: 1,\n},\n});"),
		).toBe("defineConfig({\n\tworker: {\n\t\tname: 1,\n\t},\n});");
	});

	it("leaves ambiguous or space-indented code unchanged", () => {
		const unindented = "defineConfig({\nworker: {\nenv: {\nA: 1,\n},\n},\n});";
		const mixed = "defineConfig({\nworker: {\n\t\tname: 1,\n},\n});";
		const spaces = INIT_CONFIG.replaceAll("\t", "  ");

		expect(restoreMdxIndentation(unindented)).toBe(unindented);
		expect(restoreMdxIndentation(mixed)).toBe(mixed);
		expect(restoreMdxIndentation(mdxStrip(spaces))).toBe(mdxStrip(spaces));
		expect(restoreMdxIndentation("")).toBe("");
	});

	it("is applied before annotating", () => {
		const snippet = buildAnnotatedSnippet(mdxStrip(INIT_CONFIG), "mdx");

		expect(snippet.code).toBe(INIT_CONFIG);
		expect(lineFor(snippet, "worker: {").indent).toBe(2);
		expect(lineFor(snippet, "WORLD:").indent).toBe(6);
	});
});

describe("snippets compiled by the site's MDX compiler", () => {
	// A `cf migrate` style config with JSDoc comments at two depths, a
	// ternary that continues over several lines, and five levels of nesting.
	const MIGRATED = `import { bindings, defineConfig } from "cf/config";

/**
 * Wrangler environments are selected through ctx.mode and the cf --mode flag.
 */

export default defineConfig((ctx) => {
	switch (ctx.mode) {
		case "staging": {
			return {
				worker: {
					/**
					 * TODO(@cloudflare): cf migrate: Replace the generated placeholder.
					 */
					name: "TODO",
					env: {
						API_BASE: bindings.text(
							ctx.isPreview
								? "https://preview.example.com"
								: "https://staging.example.com",
						),
					},
				},
			};
		}
		default: {
			return { worker: { name: "marketing-site" } };
		}
	}
});`;

	const element = (indent: string) =>
		[
			`${indent}<AnnotatedConfigExplorer`,
			`${indent}\tid="example"`,
			`${indent}\tcode={\`${MIGRATED}\`}`,
			`${indent}/>`,
		].join("\n");

	/** Returns the `code` prop as the component receives it. */
	function compile(mdx: string) {
		// Without plugins, satteri compiles synchronously.
		const { code } = mdxToJs(
			`export const AnnotatedConfigExplorer = () => null;\nexport const Aside = () => null;\n\n${mdx}\n`,
		);
		const literal = /code: (`(?:[^`\\]|\\[\s\S])*`)/.exec(code)?.[1];
		expect(literal).toBeDefined();
		return new Function(`return ${literal};`)() as string;
	}

	it.each([
		["at the top level", element("")],
		["in a bulleted list", `- Step\n\n${element("  ")}`],
		["in a numbered list", `1. Step\n\n${element("   ")}`],
		["inside a component", `<Aside>\n\n${element("")}\n\n</Aside>`],
	])("restores the authored code %s", (_, mdx) => {
		const received = compile(mdx);
		expect(buildAnnotatedSnippet(received, "example").code).toBe(MIGRATED);
	});
});

describe("tokenize", () => {
	it("covers every character of the input", () => {
		const inputs = [
			ORDERS_CONFIG,
			'const s = "unterminated\nnext',
			"/* open comment",
			"`template ${x}\n`",
			"a?.b ... => é 😀 \\",
		];
		for (const input of inputs) {
			expect(
				tokenize(input)
					.map((token) => token.text)
					.join(""),
			).toBe(input);
		}
	});
});

describe("buildAnnotatedSnippet", () => {
	it("annotates the configuration cf init generates", () => {
		const snippet = buildAnnotatedSnippet(INIT_CONFIG, "init");

		expect(snippet.code).toBe(INIT_CONFIG);
		expect(refsOn(snippet, "export default defineConfig({")).toEqual([
			"defineConfig",
		]);
		expect(lineFor(snippet, "defineConfig({").references[0].kind).toBe(
			"Function",
		);
		expect(refsOn(snippet, "worker: {")).toEqual(["CloudflareConfig.worker"]);
		expect(refsOn(snippet, 'name: "my-worker"')).toEqual(["WorkerConfig.name"]);
		expect(refsOn(snippet, "compatibilityDate:")).toEqual([
			"WorkerConfig.compatibilityDate",
		]);
		expect(refsOn(snippet, "env: {")).toEqual(["WorkerConfig.env"]);
		expect(refsOn(snippet, "WORLD:")).toEqual(["Bindings.text.default"]);
		expect(tokensOn(snippet, "WORLD:")).toEqual(["text"]);
		// Import lines and the Worker's own binding names stay plain.
		expect(refsOn(snippet, 'from "cf/config"')).toEqual([]);
		expect(refsOn(snippet, "cf-worker")).toEqual([]);
	});

	it("resolves shorthand properties like keys", () => {
		const snippet = buildAnnotatedSnippet(INIT_CONFIG, "init");

		expect(refsOn(snippet, "entrypoint,")).toEqual(["WorkerConfig.entrypoint"]);
		expect(tokensOn(snippet, "entrypoint,")).toEqual(["entrypoint"]);
	});

	it("annotates builders and their option keys", () => {
		const snippet = buildAnnotatedSnippet(ORDERS_CONFIG, "orders");

		expect(refsOn(snippet, "accountId:")).toEqual(["Settings.accountId"]);
		expect(refsOn(snippet, "compatibilityFlags:")).toEqual([
			"WorkerConfig.compatibilityFlags",
		]);
		expect(refsOn(snippet, "DB: bindings.d1({")).toEqual([
			"Bindings.d1.default",
		]);
		expect(refsOn(snippet, 'name: "orders-db"')).toEqual([
			"Bindings.d1.default.name",
		]);
		expect(refsOn(snippet, 'id: "<DATABASE_ID>"')).toEqual([
			"Bindings.d1.default.id",
		]);
		// Type arguments between the builder and its options are skipped.
		expect(refsOn(snippet, "bindings.queue<Job>")).toEqual([
			"Bindings.queue.default",
			"Bindings.queue.default.name",
		]);
		expect(refsOn(snippet, 'worker: "orders-api"')).toEqual([
			"Bindings.durableObject.all.worker",
		]);
		expect(refsOn(snippet, "Counter: exports.durableObject")).toEqual([
			"Exports.durableObject.created",
			"Exports.durableObject.created.storage",
		]);
		expect(refsOn(snippet, "triggers.fetch({")).toEqual([
			"Triggers.fetch.default",
		]);
		expect(refsOn(snippet, 'pattern: "api.example.com/*"')).toEqual([
			"Triggers.fetch.default.pattern",
		]);
		expect(refsOn(snippet, "maxBatchSize: 10")).toEqual([
			"Triggers.queue.default",
			"Triggers.queue.default.name",
			"Triggers.queue.default.maxBatchSize",
		]);
		expect(lineFor(snippet, "DB: bindings.d1({").references[0]).toMatchObject({
			kind: "Builder",
			signature: "d1(options?: D1BindingOptions): D1Binding;",
		});
		// Type literals, binding names, and export names are not config fields.
		expect(refsOn(snippet, "orderId: string")).toEqual([]);
		expect(tokensOn(snippet, "COUNTERS:")).toEqual(["durableObject"]);
	});

	it("picks the Durable Object export overload from its state", () => {
		const snippet = buildAnnotatedSnippet(
			`import { defineConfig, exports } from "cf/config";

export default defineConfig({
	worker: {
		exports: {
			Counter: exports.durableObject({ storage: "sqlite" }),
			OldCounter: exports.durableObject({
				state: "renamed",
				renamedTo: "Counter",
			}),
			UnusedCounter: exports.durableObject({ state: "deleted" }),
		},
	},
});`,
			"lifecycle",
		);

		expect(refsOn(snippet, "OldCounter:")).toEqual([
			"Exports.durableObject.renamed",
		]);
		expect(refsOn(snippet, "renamedTo:")).toEqual([
			"Exports.durableObject.renamed.renamedTo",
		]);
		expect(refsOn(snippet, "UnusedCounter:")).toEqual([
			"Exports.durableObject.deleted",
			"Exports.durableObject.deleted.state",
		]);
	});

	it("annotates nested worker fields and merges union options", () => {
		const snippet = buildAnnotatedSnippet(
			`export default defineConfig({
	worker: {
		observability: {
			logs: { persist: true },
		},
		tailConsumers: [{ worker: "log-sink" }],
		triggers: [triggers.connect({ protocol: "udp", port: 53 })],
	},
});`,
			"nested",
		);

		expect(refsOn(snippet, "logs:")).toEqual([
			"WorkerConfig.observability.logs",
			"WorkerConfig.observability.logs.persist",
		]);
		expect(refsOn(snippet, "tailConsumers:")).toEqual([
			"WorkerConfig.tailConsumers",
			"WorkerConfig.tailConsumers.worker",
		]);
		const protocol = lineFor(snippet, "protocol:").references.find(
			(ref) => ref.name === "protocol",
		)!;
		expect(protocol.signature).toBe('protocol: "tcp" | "udp"');
	});

	it("annotates context values in a function-form config", () => {
		const snippet = buildAnnotatedSnippet(MODE_CONFIG, "mode");

		expect(refsOn(snippet, "({ mode }) =>")).toEqual([
			"defineConfig",
			"ConfigContext.mode",
		]);
		expect(lineFor(snippet, "({ mode })").references[1].kind).toBe(
			"Context value",
		);
		// Later reads of the destructured value stay plain.
		expect(refsOn(snippet, "const isStaging")).toEqual([]);
		// The returned object is the configuration.
		expect(refsOn(snippet, "worker: {")).toEqual(["CloudflareConfig.worker"]);
		expect(refsOn(snippet, "entrypoint,")).toEqual(["WorkerConfig.entrypoint"]);
		expect(refsOn(snippet, 'name: isStaging ? "orders-db')).toEqual([
			"Bindings.d1.default.name",
		]);
	});

	it("annotates context parameters and other function forms", () => {
		const context = buildAnnotatedSnippet(
			`export default defineConfig((ctx) => ({
	worker: {
		name: ctx.mode === "staging" ? "api-staging" : "api",
		workersDev: !ctx.isPreview,
	},
}));`,
			"ctx",
		);
		expect(refsOn(context, "name: ctx.mode")).toEqual([
			"WorkerConfig.name",
			"ConfigContext.mode",
		]);
		expect(refsOn(context, "workersDev:")).toEqual([
			"WorkerConfig.workersDev",
			"ConfigContext.isPreview",
		]);

		const asyncFunction = buildAnnotatedSnippet(
			`export default defineConfig(async function ({ mode, isPreview }) {
	if (isPreview) {
		return { worker: { name: "preview" } };
	}
	return {
		worker: defineWorker(({ mode: workerMode }) => ({ name: "api" })),
	};
});`,
			"async",
		);
		expect(refsOn(asyncFunction, "async function")).toEqual([
			"defineConfig",
			"ConfigContext.mode",
			"ConfigContext.isPreview",
		]);
		expect(refsOn(asyncFunction, 'name: "preview"')).toEqual([
			"CloudflareConfig.worker",
			"WorkerConfig.name",
		]);
		expect(refsOn(asyncFunction, "defineWorker(")).toEqual([
			"CloudflareConfig.worker",
			"defineWorker",
			"ConfigContext.mode",
			"WorkerConfig.name",
		]);
	});

	it("annotates configs returned from switch cases", () => {
		// The shape `cf migrate` writes for Wrangler environments.
		const snippet = buildAnnotatedSnippet(
			`export default defineConfig((ctx) => {
	switch (ctx.mode) {
		case "staging": {
			return {
				worker: {
					name: "site-staging",
				},
			};
		}
		default: {
			return { worker: { name: "site" } };
		}
	}
});`,
			"switch",
		);

		expect(refsOn(snippet, "switch (ctx.mode)")).toEqual([
			"ConfigContext.mode",
		]);
		expect(refsOn(snippet, "worker: {")).toEqual(["CloudflareConfig.worker"]);
		expect(refsOn(snippet, '"site-staging"')).toEqual(["WorkerConfig.name"]);
		expect(refsOn(snippet, 'name: "site" }')).toEqual([
			"CloudflareConfig.worker",
			"WorkerConfig.name",
		]);
		expect(lineFor(snippet, "case").html).toContain(
			'<span class="ace-keyword">case</span>',
		);
		// A ternary's object branch is not mistaken for a block.
		const ternary = buildAnnotatedSnippet(
			`export default defineConfig(({ mode }) => {
	return mode === "x" ? { name: "a" } : { name: "b" };
});`,
			"ternary",
		);
		expect(refsOn(ternary, "return mode")).toEqual([]);
	});

	it("annotates defineContainer without inventing Container fields", () => {
		const snippet = buildAnnotatedSnippet(
			`const processor = defineContainer({
	name: "image-processor",
	image: { dockerfile: "./Dockerfile" },
});

export default defineConfig({
	worker: {
		exports: {
			Processor: exports.durableObject({
				storage: "sqlite",
				container: processor,
			}),
		},
	},
	containers: [processor],
});`,
			"container",
		);

		expect(refsOn(snippet, "defineContainer({")).toEqual(["defineContainer"]);
		expect(lineFor(snippet, "defineContainer({").references[0].kind).toBe(
			"Function",
		);
		expect(refsOn(snippet, '"image-processor"')).toEqual([]);
		expect(refsOn(snippet, "dockerfile")).toEqual([]);
		expect(refsOn(snippet, "container: processor")).toEqual([
			"Exports.durableObject.created.container",
		]);
		expect(refsOn(snippet, "containers:")).toEqual([
			"CloudflareConfig.containers",
		]);
	});

	it("keeps comments plain", () => {
		const snippet = buildAnnotatedSnippet(
			`export default defineConfig({
	// TODO(@cloudflare): set accountId: "<ACCOUNT_ID>"
	/* worker: {
		name: "commented-out",
	}, */
	worker: {
		name: "api", // name: "old-api"
	},
});`,
			"comments",
		);

		for (const text of ["TODO(@cloudflare)", "/* worker", "commented-out"]) {
			const line = lineFor(snippet, text);
			expect(line.references).toEqual([]);
			expect(line.html).not.toContain("ace-token");
			expect(line.html).toContain('class="ace-comment"');
		}
		expect(refsOn(snippet, 'name: "api"')).toEqual(["WorkerConfig.name"]);
		expect(tokensOn(snippet, 'name: "api"')).toEqual(["name"]);
	});

	it("leaves unknown keys and builders plain", () => {
		const snippet = buildAnnotatedSnippet(
			`export default defineConfig({
	custom: { name: "not-a-worker" },
	worker: {
		nmae: "typo",
		env: {
			DB: bindings.notABuilder({ name: "db" }),
			CACHE: other.kv({ id: "id" }),
		},
		exports: {
			worker: {},
		},
	},
});`,
			"unknown",
		);

		expect(refsOn(snippet, "custom:")).toEqual([]);
		expect(refsOn(snippet, "nmae:")).toEqual([]);
		expect(refsOn(snippet, "notABuilder")).toEqual([]);
		expect(refsOn(snippet, "other.kv")).toEqual([]);
		expect(refsOn(snippet, "worker: {},")).toEqual([]);
	});

	it("never throws or falls back on malformed input", () => {
		const warn = vi.spyOn(console, "warn");
		const inputs = [
			"",
			"})]}",
			"defineConfig(",
			"defineConfig({ worker: { name: ",
			"bindings.d1<{ a: 1 }>({ name: 'x' })",
			"exports.durableObject({ state: })",
			'const x = /regex"with quote/; export default defineConfig({ worker: {} });',
			"defineConfig(ctx => ctx.",
			"defineConfig(function named({ mode }) { return { worker: { name } } })",
			"{ { { [ ( ",
			"`unterminated template",
			"constructor.valueOf({ toString: 1, __proto__: {} }); hasOwnProperty()",
			"defineConfig({ constructor: {}, worker: { __proto__: { name: 1 } } })",
			...Array.from({ length: ORDERS_CONFIG.length }, (_, end) =>
				ORDERS_CONFIG.slice(0, end),
			).filter((_, index) => index % 7 === 0),
		];

		for (const input of inputs) {
			expect(() => buildAnnotatedSnippet(input, "fuzz")).not.toThrow();
		}
		expect(warn).not.toHaveBeenCalled();
	});

	it("escapes the snippet before it becomes HTML", () => {
		const code = `export default defineConfig({
	// </span><script>alert("x")</script>
	worker: {
		name: "<img src=x onerror=alert(1)>",
		compatibilityDate: a < b && c > d ? "&amp;" : 'it\\'s',
	},
});`;
		const snippet = buildAnnotatedSnippet(code, "escape");
		const html = snippet.lines.map((line) => line.html).join("\n");

		expect(html).not.toMatch(/<(?!\/?span[ >])/);
		expect(html).toContain("&lt;/span&gt;&lt;script&gt;");
		expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
		expect(html).toContain("&amp;amp;");
		expect(snippet.lines.map((line) => textOf(line.html)).join("\n")).toBe(
			code.replaceAll("\t", ""),
		);
	});

	it("measures indentation with tabs as two columns", () => {
		const snippet = buildAnnotatedSnippet(INIT_CONFIG, "init");

		expect(lineFor(snippet, "worker: {").indent).toBe(2);
		expect(lineFor(snippet, "WORLD:").indent).toBe(6);
		expect(lineFor(snippet, "WORLD:").html.startsWith("WORLD")).toBe(true);
	});

	it("creates unique IDs within a snippet and across snippets", () => {
		const repeated = buildAnnotatedSnippet(
			`export default defineConfig({
	worker: {
		env: {
			A: bindings.d1({ name: "a" }),
			B: bindings.d1({ name: "b" }),
		},
	},
});`,
			"repeat",
		);
		const repeatedIds = repeated.lines.flatMap((line) =>
			line.id ? [line.id] : [],
		);
		expect(repeatedIds).toEqual([
			"repeat-defineconfig",
			"repeat-cloudflareconfig-worker",
			"repeat-workerconfig-env",
			"repeat-bindings-d1-default",
			"repeat-bindings-d1-default-2",
		]);

		const first = buildAnnotatedSnippet(ORDERS_CONFIG, "first");
		const second = buildAnnotatedSnippet(ORDERS_CONFIG, "second");
		const firstIds = first.lines.flatMap((line) => (line.id ? [line.id] : []));
		const secondIds = second.lines.flatMap((line) =>
			line.id ? [line.id] : [],
		);
		expect(new Set(firstIds).size).toBe(firstIds.length);
		expect(firstIds.length).toBe(secondIds.length);
		expect(firstIds.filter((id) => secondIds.includes(id))).toEqual([]);
		for (const line of first.lines) {
			expect(Boolean(line.id)).toBe(line.references.length > 0);
		}
	});

	it("uses the same reference shapes as the category explorer", () => {
		const snippet = buildAnnotatedSnippet(ORDERS_CONFIG, "orders");
		const categories = buildAnnotatedCategories("test");
		const categoryRefs = new Map(
			categories
				.flatMap((category) => category.lines)
				.flatMap((line) => line.references)
				.map((ref) => [ref.id, ref]),
		);

		let compared = 0;
		for (const ref of snippet.lines.flatMap((line) => line.references)) {
			const shared = categoryRefs.get(ref.id);
			expect(Object.keys(ref).sort()).toEqual(
				Object.keys(shared ?? ref).sort(),
			);
			// Snippets merge repeated union members, such as both storage types.
			if (shared && ref.signature === shared.signature) {
				expect(ref).toEqual(shared);
				compared++;
			}
		}
		expect(compared).toBeGreaterThan(10);
	});
});

describe("category explorer", () => {
	it("is unaffected by snippet-only annotations", () => {
		const categories = buildAnnotatedCategories("test");
		const html = categories
			.flatMap((category) => category.lines)
			.map((line) => line.html)
			.join("\n");
		const kinds = new Set(
			categories
				.flatMap((category) => category.lines)
				.flatMap((line) => line.references)
				.map((ref) => ref.kind),
		);

		expect(html).not.toContain("ace-comment");
		expect(kinds.has("Function")).toBe(false);
		expect(
			categories.find((category) => category.id === "exports")!.code,
		).toContain("exports.workflow({");
	});
});
