import { describe, expect, test, vi } from "vitest";

import type { SidebarItem } from "nimbus-docs/types";

// Mirrors the production sidebar config (src/nimbus/astro-config.ts): no
// framework `isolate`, so getSidebar exercises `isolateLearningPath`.
vi.mock("virtual:nimbus/config", async () => {
	const { defineConfig } = await import("nimbus-docs");
	const { readdir } = await import("node:fs/promises");
	const dirs = await readdir("./src/content/docs/", { withFileTypes: true });
	const items = dirs
		.filter((e) => e.isDirectory() && e.name !== "agent-setup")
		.map((e) => ({
			label: e.name,
			items: [{ autogenerate: { directory: e.name, collapsed: true } }],
		}));
	const config = defineConfig({
		site: "https://developers.cloudflare.com",
		title: "Cloudflare Docs",
		description: "Cloudflare's documentation.",
		locale: "en",
		github: "https://github.com/cloudflare/cloudflare-docs",
		editPattern:
			"https://github.com/cloudflare/cloudflare-docs/edit/production/{path}",
		search: { provider: "custom" },
		sidebar: {
			items,
			overviewLabel: "Overview",
			indexDisplay: "overview-leaf",
			scope: "section",
			defaultCollapsed: true,
		},
	});
	return { config, indexedCollections: [], versionAlternates: {} };
});

const groupLabels = (tree: SidebarItem[]): string[] =>
	tree.filter((i) => i.type === "group").map((i) => i.label);

async function rail(slug: string) {
	const { getSidebar } = await import("nimbus-docs");
	const { docsSidebarTransform } = await import("./sidebar");
	return getSidebar(slug, {
		collection: "docs",
		transform: docsSidebarTransform,
	});
}

describe("learning-paths module isolation", () => {
	test("production config does not re-enable framework sidebar.isolate", async () => {
		const { readFile } = await import("node:fs/promises");
		const src = await readFile("./src/nimbus/astro-config.ts", "utf8");
		expect(src).not.toMatch(/\bisolate\s*:/);
	});

	test("application-security rail lists every module", async () => {
		const tree = await rail(
			"learning-paths/application-security/account-security",
		);
		const labels = groupLabels(tree);
		expect(labels).toEqual(
			expect.arrayContaining([
				"Account security",
				"Default traffic security",
				"Web Application Firewall",
				"Rate Limiting",
				"Lists",
				"Security Center",
			]),
		);
		const topLinks = tree
			.filter((i) => i.type === "link")
			.map((i) => (i as { label: string }).label);
		expect(topLinks).not.toContain("DNSSEC");
	}, 60000);

	test("unaffected multi-module path (load-balancing) still lists its modules", async () => {
		const tree = await rail("learning-paths/load-balancing/concepts");
		expect(groupLabels(tree)).toEqual(
			expect.arrayContaining([
				"Concepts",
				"Planning your load balancer",
				"Setup",
			]),
		);
	}, 60000);
});
