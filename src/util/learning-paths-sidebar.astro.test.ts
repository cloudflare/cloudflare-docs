import { describe, expect, test } from "vitest";

import type {
	SidebarGroupItem,
	SidebarItem,
	SidebarLinkItem,
} from "@cloudflare/nimbus-docs/types";

import { isolateLearningPath } from "./sidebar";

const groupLabels = (tree: SidebarItem[]): string[] =>
	tree.filter((i) => i.type === "group").map((i) => i.label);

const link = (
	label: string,
	href: string,
	extra: Partial<SidebarLinkItem> = {},
): SidebarLinkItem => ({ type: "link", label, href, order: 0, ...extra });
const mod = (path: string, slug: string, label: string): SidebarGroupItem => ({
	type: "group",
	label,
	order: 0,
	indexHref: `/learning-paths/${path}/${slug}/`,
	children: [link(label, `/learning-paths/${path}/${slug}/`)],
});
const section = (label: string, children: SidebarItem[]): SidebarGroupItem => ({
	type: "group",
	label,
	order: 0,
	children,
});

const rail = (): SidebarItem[] => [
	section("Application Security", [
		{
			type: "group",
			label: "Account security",
			order: 0,
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
	]),
	section("Load balancing", [
		mod("load-balancing", "concepts", "Concepts"),
		mod("load-balancing", "setup", "Setup"),
	]),
];

describe("isolateLearningPath", () => {
	test("isolates the rail to the current path's modules, keeping one that owns a cross-section external_link", () => {
		expect(
			groupLabels(
				isolateLearningPath(
					rail(),
					"learning-paths/application-security/firewall",
				),
			),
		).toEqual(["Account security", "Web Application Firewall"]);
	});

	test("does not leak other learning paths", () => {
		expect(
			groupLabels(
				isolateLearningPath(rail(), "learning-paths/load-balancing/concepts"),
			),
		).toEqual(["Concepts", "Setup"]);
	});

	test("a _neverActive link cannot claim ownership", () => {
		const decoy = section("Decoy", [
			link("Redirect", "/learning-paths/load-balancing/concepts/", {
				_neverActive: true,
			}),
		]);
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
