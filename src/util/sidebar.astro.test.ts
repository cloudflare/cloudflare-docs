import { describe, expect, test, vi } from "vitest";

import { docsSidebarTransform, externalAppLinksTransform } from "./sidebar";
import type { SidebarItem } from "@cloudflare/nimbus-docs/types";

// The `product-availability` collection is a remote middlecache loader that
// downloads over the network at test time. Stub it to keep the badge tests
// hermetic and data-independent; everything else still reads real content.
vi.mock("astro:content", async (importOriginal) => {
	const actual = await importOriginal<typeof import("astro:content")>();
	return {
		...actual,
		getCollection: vi.fn(async (id: string, ...args: any[]) =>
			id === "product-availability"
				? []
				: actual.getCollection(id as any, ...args),
		),
	};
});

const ARROW = " \u2197";

const run = (tree: SidebarItem[]) =>
	externalAppLinksTransform({
		tree,
		sectionSlug: "test",
		currentSlug: "test/page",
	});

const runDocs = (tree: SidebarItem[]) =>
	docsSidebarTransform({
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

describe("docsSidebarTransform badges", () => {
	test("does not badge /api-shield/ links as API", async () => {
		const [item] = await runDocs([
			link({ label: "API Shield", href: "/api-shield/" }),
		]);
		expect(item.type).toBe("link");
		expect(item.badge).toBeUndefined();
	});

	test("does not badge /api-gateway/ links as API", async () => {
		const [item] = await runDocs([
			link({ label: "API Gateway", href: "/api-gateway/" }),
		]);
		expect(item.type).toBe("link");
		expect(item.badge).toBeUndefined();
	});

	test("badges the /api/ OpenAPI reference as API", async () => {
		const [item] = await runDocs([link({ label: "API", href: "/api/" })]);
		expect(item).toMatchObject({
			type: "external",
			badge: { text: "API", variant: "note" },
		});
	});
});
