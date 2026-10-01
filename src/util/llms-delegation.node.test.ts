import { describe, expect, test } from "vitest";
import {
	assertLlmsIndexLinkBudget,
	compareLlmsSidebarOrder,
	compareLlmsSidebarOrderPath,
	getDelegatedIndexLinkBudget,
	getDelegatedIndexes,
	getLlmsSidebarOrderComparator,
	isDelegatingIndexNavigationAlias,
	isInDelegatingLlmsTree,
	isCoveredByDelegatedIndex,
	type LlmsIndex,
} from "./llms-delegation";

const indexes: LlmsIndex[] = [
	{
		title: "Cloudflare One",
		url: "/cloudflare-one/",
	},
	{
		title: "Access controls",
		url: "/cloudflare-one/access-controls/",
	},
	{
		title: "Access policies",
		url: "/cloudflare-one/access-controls/policies/",
	},
	{
		title: "Traffic policies",
		url: "/cloudflare-one/traffic-policies/",
	},
	{
		title: "DNS filtering",
		url: "/cloudflare-one/traffic-policies/get-started/dns/",
	},
	{
		title: "Workers",
		url: "/workers/",
	},
];

describe("getDelegatedIndexes", () => {
	test("returns only the shallowest child index on each branch", () => {
		expect(getDelegatedIndexes("/cloudflare-one/", indexes)).toEqual([
			indexes[1],
			indexes[3],
		]);
	});

	test("delegates recursively within the Cloudflare One tree", () => {
		expect(
			getDelegatedIndexes("/cloudflare-one/access-controls/", indexes),
		).toEqual([indexes[2]]);
	});

	test("does not change indexes outside Cloudflare One", () => {
		expect(getDelegatedIndexes("/workers/", indexes)).toEqual([]);
	});

	test("partitions a recursive tree without gaps or duplicate ownership", () => {
		const pages = [
			"cloudflare-one",
			"cloudflare-one/setup",
			"cloudflare-one/access-controls",
			"cloudflare-one/access-controls/policies",
			"cloudflare-one/access-controls/policies/common-policies",
			"cloudflare-one/traffic-policies",
			"cloudflare-one/traffic-policies/get-started/dns",
			"cloudflare-one/traffic-policies/get-started/dns/dns-filtering",
		];
		const ownership = new Map<string, number>();

		function walk(index: LlmsIndex) {
			const delegatedIndexes = getDelegatedIndexes(index.url, indexes);
			const prefix = index.url.slice(1, -1);

			for (const page of pages) {
				if (
					(page === prefix || page.startsWith(`${prefix}/`)) &&
					(page === prefix ||
						!isCoveredByDelegatedIndex(page, delegatedIndexes))
				) {
					ownership.set(page, (ownership.get(page) ?? 0) + 1);
				}
			}

			for (const child of delegatedIndexes) walk(child);
		}

		walk(indexes[0]);

		expect([...ownership.keys()]).toEqual(pages);
		expect([...ownership.values()]).toEqual(pages.map(() => 1));
	});
});

describe("isInDelegatingLlmsTree", () => {
	test("includes configured roots and descendants, but not unrelated indexes", () => {
		expect(isInDelegatingLlmsTree("/cloudflare-one/")).toBe(true);
		expect(isInDelegatingLlmsTree("/cloudflare-one/networks/")).toBe(true);
		expect(isInDelegatingLlmsTree("/workers/")).toBe(false);
	});
});

describe("getDelegatedIndexLinkBudget", () => {
	test("limits the Cloudflare One root without limiting child indexes", () => {
		expect(getDelegatedIndexLinkBudget("/cloudflare-one/")).toBe(150);
		expect(getDelegatedIndexLinkBudget("/cloudflare-one/networks/")).toBe(
			undefined,
		);
	});
});

describe("assertLlmsIndexLinkBudget", () => {
	test("allows the configured limit and rejects the next link", () => {
		const links = Array.from(
			{ length: 151 },
			(_, index) => `- [Page ${index}](/page-${index}/index.md)`,
		);

		expect(() =>
			assertLlmsIndexLinkBudget(
				"/cloudflare-one/",
				links.slice(0, 150).join("\n"),
			),
		).not.toThrow();
		expect(() =>
			assertLlmsIndexLinkBudget("/cloudflare-one/", links.join("\n")),
		).toThrow("exceeding its 150-link budget");
	});
});

describe("isDelegatingIndexNavigationAlias", () => {
	const documentIds = new Set([
		"cloudflare-one/cloud-and-saas-findings/casb-dlp",
	]);

	test("identifies Cloudflare One aliases to canonical documents", () => {
		expect(
			isDelegatingIndexNavigationAlias(
				"/cloudflare-one/data-loss-prevention/",
				"/cloudflare-one/cloud-and-saas-findings/casb-dlp/#findings",
				documentIds,
			),
		).toBe(true);
	});

	test("retains aliases outside the delegated tree or without a target", () => {
		expect(
			isDelegatingIndexNavigationAlias(
				"/workers/",
				"/cloudflare-one/cloud-and-saas-findings/casb-dlp/",
				documentIds,
			),
		).toBe(false);
		expect(
			isDelegatingIndexNavigationAlias(
				"/cloudflare-one/",
				"/missing/",
				documentIds,
			),
		).toBe(false);
	});

	test("retains cross-product aliases in the Cloudflare One index", () => {
		expect(
			isDelegatingIndexNavigationAlias(
				"/cloudflare-one/networks/",
				"/cloudflare-network-firewall/packet-captures/",
				new Set(["cloudflare-network-firewall/packet-captures"]),
			),
		).toBe(false);
	});
});

describe("compareLlmsSidebarOrder", () => {
	test("uses labels to break equal numeric section orders", () => {
		const sections = [
			{ id: "analytics", label: "Dashboards", order: 1 },
			{
				id: "analytics-overview",
				label: "Analytics overview",
				order: 1,
			},
		];

		expect(
			sections.sort(compareLlmsSidebarOrder).map(({ label }) => label),
		).toEqual(["Analytics overview", "Dashboards"]);
	});

	test("retains legacy tie order for indexes without delegation", () => {
		const sections = [
			{ id: "analytics", label: "Dashboards", order: 1 },
			{
				id: "analytics-overview",
				label: "Analytics overview",
				order: 1,
			},
		];

		expect(
			sections
				.sort(getLlmsSidebarOrderComparator(false))
				.map(({ label }) => label),
		).toEqual(["Dashboards", "Analytics overview"]);
		expect(
			sections
				.sort(getLlmsSidebarOrderComparator(true))
				.map(({ label }) => label),
		).toEqual(["Analytics overview", "Dashboards"]);
	});
});

describe("compareLlmsSidebarOrderPath", () => {
	test("keeps sibling subtrees together when their numeric orders match", () => {
		const wan = { order: 3, label: "Cloudflare WAN", id: "wan" };
		const analytics = { order: 10, label: "Analytics", id: "analytics" };
		const troubleshooting = {
			order: 10,
			label: "Troubleshooting",
			id: "troubleshooting",
		};
		const items = [
			{
				label: "Troubleshoot routing",
				orderPath: [
					wan,
					troubleshooting,
					{ order: 2, label: "Routing", id: "routing" },
				],
			},
			{
				label: "Network analytics",
				orderPath: [
					wan,
					analytics,
					{ order: 2, label: "Network", id: "network" },
				],
			},
			{
				label: "NetFlow statistics",
				orderPath: [
					wan,
					analytics,
					{ order: 3, label: "NetFlow", id: "netflow" },
				],
			},
			{
				label: "Troubleshoot IPsec",
				orderPath: [
					wan,
					troubleshooting,
					{ order: 1, label: "IPsec", id: "ipsec" },
				],
			},
		];

		expect(
			items.sort(compareLlmsSidebarOrderPath).map((item) => item.label),
		).toEqual([
			"Network analytics",
			"NetFlow statistics",
			"Troubleshoot IPsec",
			"Troubleshoot routing",
		]);
	});
});

describe("isCoveredByDelegatedIndex", () => {
	test("identifies pages owned by a delegated child index", () => {
		expect(
			isCoveredByDelegatedIndex(
				"cloudflare-one/access-controls/policies/common-policies",
				[indexes[2]],
			),
		).toBe(true);
	});

	test("keeps pages outside delegated child indexes", () => {
		expect(
			isCoveredByDelegatedIndex(
				"cloudflare-one/access-controls/troubleshooting",
				[indexes[2]],
			),
		).toBe(false);
	});
});
