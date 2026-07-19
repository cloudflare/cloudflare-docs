import { describe, expect, test } from "vitest";

import type {
	SidebarGroupItem,
	SidebarItem,
	SidebarLinkItem,
} from "nimbus-docs/types";

import { isolateLearningPath } from "./sidebar";

const groupLabels = (tree: SidebarItem[]): string[] =>
	tree.filter((i) => i.type === "group").map((i) => i.label);

let order = 0;
const link = (
	label: string,
	href: string,
	extra: Partial<SidebarLinkItem> = {},
): SidebarLinkItem => ({ type: "link", label, href, order: order++, ...extra });
const mod = (path: string, slug: string, label: string): SidebarGroupItem => ({
	type: "group",
	label,
	order: order++,
	indexHref: `/learning-paths/${path}/${slug}/`,
	children: [link(label, `/learning-paths/${path}/${slug}/`)],
});

// Section-scoped rail (config uses `scope: "section"`): a flat list of
// learning-path groups whose children are the module groups.
const rail = (): SidebarItem[] => {
	order = 0;
	const appsec: SidebarItem = {
		type: "group",
		label: "Application Security",
		order: order++,
		children: [
			// account-security owns a cross-section external_link (audit-logs →
			// /fundamentals/…). The framework's built-in isolate dropped this
			// module on that shape; isolateLearningPath must keep it.
			{
				type: "group",
				label: "Account security",
				order: order++,
				indexHref: "/learning-paths/application-security/account-security/",
				children: [
					link(
						"Overview",
						"/learning-paths/application-security/account-security/",
					),
					link("Audit logs", "/fundamentals/account/audit-logs/", {
						_neverActive: true,
					}),
				],
			},
			mod("application-security", "firewall", "Web Application Firewall"),
		],
	};
	const lb: SidebarItem = {
		type: "group",
		label: "Load balancing",
		order: order++,
		children: [
			mod("load-balancing", "concepts", "Concepts"),
			mod("load-balancing", "setup", "Setup"),
		],
	};
	return [appsec, lb];
};

describe("isolateLearningPath", () => {
	test("isolates the rail to the current path's modules", () => {
		expect(
			groupLabels(
				isolateLearningPath(
					rail(),
					"learning-paths/application-security/firewall",
				),
			),
		).toEqual(["Account security", "Web Application Firewall"]);
	});

	test("keeps a module owning a cross-section external_link", () => {
		expect(
			groupLabels(
				isolateLearningPath(
					rail(),
					"learning-paths/application-security/firewall",
				),
			),
		).toContain("Account security");
	});

	test("does not leak other learning paths", () => {
		expect(
			groupLabels(
				isolateLearningPath(rail(), "learning-paths/load-balancing/concepts"),
			),
		).toEqual(["Concepts", "Setup"]);
	});

	test("a _neverActive link cannot claim ownership", () => {
		order = 0;
		const decoy: SidebarItem = {
			type: "group",
			label: "Decoy",
			order: order++,
			children: [
				link("Redirect", "/learning-paths/load-balancing/concepts/", {
					_neverActive: true,
				}),
			],
		};
		expect(
			groupLabels(
				isolateLearningPath(
					[decoy, ...rail()],
					"learning-paths/load-balancing/concepts",
				),
			),
		).toEqual(["Concepts", "Setup"]);
	});

	test("passes non-learning-path rails through unchanged", () => {
		const original = rail();
		expect(isolateLearningPath(original, "workers/get-started")).toBe(original);
	});
});
