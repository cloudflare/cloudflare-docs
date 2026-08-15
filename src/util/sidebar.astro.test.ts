import { describe, expect, test } from "vitest";

import {
	externalAppLinksTransform,
	styleGuideGroupingTransform,
} from "./sidebar";
import type { SidebarItem } from "@cloudflare/nimbus-docs/types";

const ARROW = " \u2197";

const run = (tree: SidebarItem[]) =>
	externalAppLinksTransform({
		tree,
		sectionSlug: "test",
		currentSlug: "test/page",
	});

const link = (over: Partial<SidebarItem> = {}): SidebarItem =>
	({
		type: "link",
		label: "Link",
		href: "/docs/page/",
		order: 0,
		...over,
	}) as SidebarItem;

describe("externalAppLinksTransform", () => {
	test("appends the arrow to internal redirects and keeps them same-tab links", async () => {
		const [item] = await run([
			link({ label: "Redirect", href: "/other/", _neverActive: true }),
		]);
		expect(item).toMatchObject({ type: "link", label: `Redirect${ARROW}` });
	});

	test("re-marks /api/ links as external with the arrow", async () => {
		const [item] = await run([link({ label: "API", href: "/api/foo/" })]);
		expect(item).toMatchObject({
			type: "external",
			label: `API${ARROW}`,
			href: "/api/foo/",
		});
	});

	test("leaves ordinary in-docs links untouched", async () => {
		const input = link({ label: "Normal", href: "/docs/normal/" });
		const [item] = await run([input]);
		expect(item).toEqual(input);
	});

	test("recurses into groups", async () => {
		const [group] = await run([
			{
				type: "group",
				label: "Group",
				order: 0,
				children: [
					link({ label: "Redirect", href: "/other/", _neverActive: true }),
				],
			} as SidebarItem,
		]);
		if (group.type !== "group") throw new Error("expected group");
		expect(group.children[0]).toMatchObject({ label: `Redirect${ARROW}` });
	});

	test("is idempotent (no double arrow)", async () => {
		const input = [
			link({ label: "Redirect", href: "/other/", _neverActive: true }),
		];
		const [item] = await run(await run(input));
		expect(item.label).toBe(`Redirect${ARROW}`);
	});
});

describe("styleGuideGroupingTransform", () => {
	const sgGroup = (dir: string, label: string): SidebarItem =>
		({
			type: "group",
			label,
			order: 0,
			indexHref: `/style-guide/${dir}/`,
			children: [
				{
					type: "link",
					label: "Child",
					href: `/style-guide/${dir}/child/`,
					order: 0,
				},
			],
		}) as SidebarItem;

	// The real style-guide top-level sections, in their current (messy) order.
	const styleGuideTree = (): SidebarItem[] => [
		link({ label: "Contributions", href: "/style-guide/contributions/" }),
		sgGroup("grammar", "Grammar"),
		sgGroup("formatting", "Formatting"),
		sgGroup("components", "Components"),
		sgGroup("frontmatter", "Frontmatter"),
		sgGroup("documentation-content-strategy", "Product content"),
		sgGroup("api-content-strategy", "API content"),
		sgGroup("how-we-docs", "How we docs"),
	];

	const runSg = (tree: SidebarItem[], sectionSlug = "style-guide") =>
		styleGuideGroupingTransform({
			tree,
			sectionSlug,
			currentSlug: `${sectionSlug}/page`,
		});

	test("regroups the flat sections into the journey order", async () => {
		const out = await runSg(styleGuideTree());
		expect(out.map((i) => i.label)).toEqual([
			"Contributions",
			"Plan your content",
			"Style & grammar",
			"Build the page",
			"How we docs",
		]);
		expect(out.map((i) => i.order)).toEqual([0, 1, 2, 3, 4]);
	});

	test("keeps a single-section bucket (Contribute) at the top level, unwrapped", async () => {
		const out = await runSg(styleGuideTree());
		const contributions = out.find((i) => i.label === "Contributions");
		// Not wrapped in a redundant "Contribute" group; stays the section link.
		expect(contributions).toMatchObject({
			type: "link",
			href: "/style-guide/contributions/",
		});
		expect(out.some((i) => i.label === "Contribute")).toBe(false);
	});

	test("nests the correct sections under each multi-section bucket", async () => {
		const out = await runSg(styleGuideTree());
		const childrenOf = (label: string) => {
			const g = out.find((i) => i.label === label);
			if (!g || g.type !== "group") throw new Error(`no group ${label}`);
			return g.children.map((c) => c.label);
		};
		expect(childrenOf("Plan your content")).toEqual([
			"Product content",
			"API content",
		]);
		expect(childrenOf("Style & grammar")).toEqual(["Grammar", "Formatting"]);
		expect(childrenOf("Build the page")).toEqual(["Frontmatter", "Components"]);
	});

	test("keeps How we docs as the existing group, not double-nested", async () => {
		const out = await runSg(styleGuideTree());
		const hwd = out.find((i) => i.label === "How we docs");
		if (!hwd || hwd.type !== "group") throw new Error("no How we docs");
		// Its children are the real pages, not a re-wrapped "How we docs" group.
		expect(hwd.children.every((c) => c.label !== "How we docs")).toBe(true);
		expect(hwd).toMatchObject({ indexHref: "/style-guide/how-we-docs/" });
	});

	test("leaves non-style-guide sections untouched", async () => {
		const input = styleGuideTree();
		expect(await runSg(input, "workers")).toBe(input);
	});

	test("never drops an unrecognized top-level item", async () => {
		const stray = link({ label: "Stray", href: "/style-guide/stray-page/" });
		const out = await runSg([...styleGuideTree(), stray]);
		expect(out.some((i) => i.label === "Stray")).toBe(true);
	});

	test("omits buckets whose sections are all absent", async () => {
		const out = await runSg([
			link({ label: "Contributions", href: "/style-guide/contributions/" }),
		]);
		expect(out.map((i) => i.label)).toEqual(["Contributions"]);
	});

	test("bucketed section groups keep their indexHref (overview-leaf still works)", async () => {
		const out = await runSg(styleGuideTree());
		const write = out.find((i) => i.label === "Style & grammar");
		if (!write || write.type !== "group") throw new Error("no Style & grammar");
		const grammar = write.children.find((c) => c.label === "Grammar");
		expect(grammar).toMatchObject({ indexHref: "/style-guide/grammar/" });
	});

	test("preserves the section overview leaf (undefined key) rather than dropping it", async () => {
		const overview = link({ label: "Overview", href: "/style-guide/" });
		const out = await runSg([overview, ...styleGuideTree()]);
		expect(out.some((i) => i.label === "Overview")).toBe(true);
	});

	test("never drops a node sharing a section key; the real group wins the bucket", async () => {
		const redirect = link({
			label: "Grammar (redirect)",
			href: "/style-guide/grammar/",
			_neverActive: true,
		});
		// redirect precedes the real group but must not steal or drop it.
		const out = await runSg([redirect, ...styleGuideTree()] as SidebarItem[]);
		const write = out.find((i) => i.label === "Style & grammar");
		if (!write || write.type !== "group") throw new Error("no Style & grammar");
		// The real group (with children) is what got bucketed.
		const grammar = write.children.find((c) => c.label === "Grammar");
		expect(grammar).toMatchObject({ type: "group" });
		// The redirect stub is not lost.
		expect(out.some((i) => i.label === "Grammar (redirect)")).toBe(true);
	});

	test("keys index-less groups off _routeKey", async () => {
		const routeKeyGroup = {
			type: "group",
			label: "Grammar",
			order: 0,
			_routeKey: "/style-guide/grammar/",
			children: [],
		} as unknown as SidebarItem;
		const out = await runSg([
			routeKeyGroup,
			sgGroup("formatting", "Formatting"),
		]);
		const write = out.find((i) => i.label === "Style & grammar");
		if (!write || write.type !== "group") throw new Error("no Style & grammar");
		// Grammar was keyed purely off _routeKey (no indexHref) and still bucketed.
		expect(write.children.map((c) => c.label)).toEqual([
			"Grammar",
			"Formatting",
		]);
	});

	test("passes external nodes through as unplaced tail items", async () => {
		const external = {
			type: "external",
			label: "Elsewhere",
			href: "https://example.com/",
			order: 0,
		} as SidebarItem;
		const out = await runSg([...styleGuideTree(), external]);
		expect(out.at(-1)).toMatchObject({ type: "external", label: "Elsewhere" });
	});

	test("is idempotent (re-running does not reorder or re-wrap)", async () => {
		const once = await runSg(styleGuideTree());
		const twice = await runSg(once);
		expect(twice).toBe(once);
	});
});
