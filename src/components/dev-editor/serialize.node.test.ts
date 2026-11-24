import { describe, expect, test } from "vitest";
import {
	collectEditableDescriptors,
	collectEditableElements,
	describeElementKind,
	findComponentContext,
	findEmbeddedNonEditableElements,
	findNearestHeading,
	mapPartialSources,
	serializeBlock,
	serializeCodeBlock,
} from "./serialize";

function makeEl(html: string): HTMLElement {
	const wrapper = document.createElement("div");
	wrapper.innerHTML = html;
	return wrapper.firstElementChild as HTMLElement;
}

describe("serializeBlock & serializeCodeBlock", () => {
	test("preserves inline code, emphasis, and links while stripping decorative arrows", () => {
		const p = makeEl(
			`<p>Run <code>wrangler deploy</code> to publish your <strong>Worker</strong> to <a href="https://dash.cloudflare.com">Cloudflare\u2197\uFE0E</a> and read the <em>docs</em>.</p>`,
		);
		expect(serializeBlock(p)).toBe(
			"Run `wrangler deploy` to publish your **Worker** to [Cloudflare](https://dash.cloudflare.com) and read the *docs*.",
		);
	});

	test("uses double backticks when inline code contains a backtick", () => {
		const p = makeEl("<p>Escape <code>`foo`</code> inside code.</p>");
		expect(serializeBlock(p)).toBe("Escape `` `foo` `` inside code.");
	});

	test("ignores aria-hidden and sr-only elements and normalises non-breaking spaces", () => {
		const p = makeEl(
			`<p>Hello&nbsp;&nbsp;world<span aria-hidden="true"> ↗</span><span class="sr-only"> (external)</span></p>`,
		);
		expect(serializeBlock(p)).toBe("Hello world");
	});

	test("preserves glossary tooltip text transparently", () => {
		const p = makeEl(
			`<p>Deploy an <span class="glossary-tooltip" data-tooltip="true">edge Worker</span> globally.</p>`,
		);
		expect(serializeBlock(p)).toBe("Deploy an edge Worker globally.");
	});

	test("preserves verbatim indentation and newlines in Shiki code blocks", () => {
		const code = makeEl(
			`<code><span class="line">export default {</span>\n<span class="line">  fetch() { return new Response("ok"); }</span>\n<span class="line">};</span></code>`,
		);
		expect(serializeCodeBlock(code)).toBe(
			'export default {\n  fetch() { return new Response("ok"); }\n};',
		);
	});
});

describe("mapPartialSources", () => {
	test("maps elements inside nested partial comment markers to the innermost partial", () => {
		document.body.innerHTML = `
			<article class="docs-content">
				<p id="main">Main page paragraph.</p>
				<!--cfdocs-dev-partial-start:src/content/partials/workers/outer.mdx-->
				<p id="outer-1">Outer partial paragraph.</p>
				<!--cfdocs-dev-partial-start:src/content/partials/workers/inner.mdx-->
				<p id="inner">Inner partial paragraph.</p>
				<!--cfdocs-dev-partial-end-->
				<p id="outer-2">After inner partial.</p>
				<!--cfdocs-dev-partial-end-->
				<p id="after">Back in main page.</p>
			</article>
		`;

		const map = mapPartialSources(document.body);
		expect(map.get(document.getElementById("main")!)).toBeUndefined();
		expect(map.get(document.getElementById("outer-1")!)).toBe(
			"src/content/partials/workers/outer.mdx",
		);
		expect(map.get(document.getElementById("inner")!)).toBe(
			"src/content/partials/workers/inner.mdx",
		);
		expect(map.get(document.getElementById("outer-2")!)).toBe(
			"src/content/partials/workers/outer.mdx",
		);
		expect(map.get(document.getElementById("after")!)).toBeUndefined();
	});
});

describe("collectEditableDescriptors & component adapters", () => {
	test("collects prose blocks, component fields, and code blocks without nesting", () => {
		document.body.innerHTML = `
			<h1 data-dev-editable="frontmatter:title">Workers Overview</h1>
			<article class="docs-content">
				<div class="heading-wrapper level-h2">
					<h2 id="intro">Introduction</h2>
					<a class="anchor-link" href="#intro"><span class="anchor-icon"></span></a>
				</div>
				<p id="p1">Introductory paragraph.</p>
				<aside class="aside-card" aria-label="Note">
					<div>
						<p id="aside-title" class="m-0 font-semibold">Note</p>
						<div class="aside-card-body">
							<p id="aside-p">Editable aside body.</p>
						</div>
					</div>
				</aside>
				<article class="group/card">
					<h3 class="text-foreground"><a id="linkcard-title" href="/workers/">LinkCard title</a></h3>
					<div id="linkcard-desc">Direct description prop</div>
				</article>
				<div class="feature">
					<a id="feat-header" href="/x/">Feature header</a>
					<div class="feature-description"><p id="feat-desc">Feature body</p></div>
					<span id="feat-cta" aria-hidden="true">Use Feature</span>
				</div>
				<div data-copy-prompt>
					<p class="m-0"><span id="cp-text" data-copy-prompt-text>Build a Worker</span></p>
					<button type="button">Copy prompt</button>
				</div>
				<figure class="nb-code-figure" data-nb-lang="ts">
					<figcaption class="nb-code-title"><span id="code-file" class="nb-code-title-name">src/index.ts</span></figcaption>
					<pre data-language="ts"><code id="code-body">const x = 1;</code></pre>
				</figure>
				<div data-file-tree>
					<ul>
						<li><span id="ft-file" class="ft-label">index.ts</span></li>
						<li data-placeholder><span id="ft-dots" class="ft-label">⋯</span></li>
					</ul>
				</div>
				<a id="standalone-btn" data-nb-button href="/workers/">Get started</a>
				<astro-island><p id="island-p">Interactive island text</p></astro-island>
			</article>
		`;

		const descriptors = collectEditableDescriptors(document);
		const summary = descriptors.map((d) => ({
			id: d.element.id || d.element.dataset.devEditable,
			kind: d.kind,
			mode: d.mode,
		}));

		expect(summary).toEqual([
			{
				id: "frontmatter:title",
				kind: "frontmatter title",
				mode: "single-line",
			},
			{ id: "intro", kind: "heading (h2)", mode: "single-line" },
			{ id: "p1", kind: "paragraph", mode: "prose" },
			{ id: "aside-title", kind: "<Aside> title", mode: "single-line" },
			{ id: "aside-p", kind: "paragraph", mode: "prose" },
			{ id: "linkcard-title", kind: "<LinkCard> title", mode: "single-line" },
			{ id: "linkcard-desc", kind: "<LinkCard> description", mode: "prose" },
			{ id: "feat-header", kind: "<Feature> header", mode: "single-line" },
			{ id: "feat-desc", kind: "paragraph", mode: "prose" },
			{ id: "feat-cta", kind: "<Feature> cta", mode: "single-line" },
			{ id: "cp-text", kind: "<CopyPrompt> text", mode: "prose" },
			{ id: "code-file", kind: "code block filename", mode: "single-line" },
			{ id: "code-body", kind: "code block (ts)", mode: "code" },
			{ id: "ft-file", kind: "<FileTree> entry", mode: "single-line" },
			{ id: "standalone-btn", kind: "<LinkButton> label", mode: "single-line" },
		]);

		const elements = collectEditableElements(document);
		expect(elements.includes(document.getElementById("ft-dots")!)).toBe(false);
		expect(elements.includes(document.getElementById("island-p")!)).toBe(false);
	});

	test("identifies nested component boundaries including PackageManagers and FileTree", () => {
		document.body.innerHTML = `
			<article class="docs-content">
				<div data-nb-cli-variant="cf" data-cli-variants-item="cf">
					<div role="tabpanel" data-nb-tabs-content data-nb-tab-label="TypeScript">
						<aside class="aside-card" aria-label="Tip">
							<div class="aside-card-body">
								<p id="nested-p">Use the cf CLI.</p>
							</div>
						</aside>
					</div>
				</div>
				<div data-nb-pm>
					<button id="pm-tab-1-pnpm" role="tab" data-nb-pm-tab>pnpm</button>
					<div role="tabpanel" data-nb-pm-panel aria-labelledby="pm-tab-1-pnpm">
						<pre><code id="pm-code" data-nb-pm-code>pnpm exec wrangler deploy</code></pre>
					</div>
				</div>
				<details>
					<summary><p id="summary-p">Expand details</p></summary>
					<p id="details-body">Inside details.</p>
				</details>
			</article>
		`;

		expect(findComponentContext(document.getElementById("nested-p")!)).toEqual([
			'<CliVariant cli="cf">',
			'<TabItem label="TypeScript">',
			'<Aside title="Tip">',
		]);
		expect(findComponentContext(document.getElementById("pm-code")!)).toEqual([
			'<PackageManagers tab="pnpm">',
		]);
		expect(describeElementKind(document.getElementById("summary-p")!)).toBe(
			"<Details> header",
		);
		expect(
			findComponentContext(document.getElementById("details-body")!),
		).toEqual(['<Details header="Expand details">']);
	});

	test("finds embedded non-editable UI controls inside prose blocks", () => {
		const p = makeEl(
			`<p>Open <a data-nb-button href="https://dash.cloudflare.com">Go to Dashboard</a> to continue.</p>`,
		);
		const embedded = findEmbeddedNonEditableElements(p);
		expect(embedded).toHaveLength(1);
		expect(embedded[0]?.tagName.toLowerCase()).toBe("a");
	});
});

describe("findNearestHeading & describeElementKind", () => {
	test("finds the nearest preceding heading in the article and returns null for frontmatter", () => {
		document.body.innerHTML = `
			<h1 id="title" data-dev-editable="frontmatter:title">Guide</h1>
			<article class="docs-content">
				<div class="heading-wrapper level-h2">
					<h2 id="setup">Setup</h2>
					<a class="anchor-link" href="#setup"></a>
				</div>
				<p id="p1">First paragraph.</p>
				<div class="heading-wrapper level-h3">
					<h3 id="install">Install <code>wrangler</code></h3>
				</div>
				<p id="p2">Second paragraph.</p>
			</article>
		`;

		expect(findNearestHeading(document.getElementById("title")!)).toBeNull();
		expect(findNearestHeading(document.getElementById("p1")!)).toBe("## Setup");
		expect(findNearestHeading(document.getElementById("p2")!)).toBe(
			"### Install `wrangler`",
		);
		expect(describeElementKind(document.getElementById("title")!)).toBe(
			"frontmatter title",
		);
		expect(describeElementKind(document.getElementById("setup")!)).toBe(
			"heading (h2)",
		);
		expect(describeElementKind(document.getElementById("p1")!)).toBe(
			"paragraph",
		);
	});
});
