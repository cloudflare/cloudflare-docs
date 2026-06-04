/**
 * Syncs everything under .flue/.agents/ to R2, preserving directory structure.
 *
 * This uploads skills, reference files, and any other agent content — not
 * just SKILL.md files.
 *
 * Usage:
 *   pnpm flue:sync-agents:local   (--local flag, uses wrangler dev state)
 *   pnpm flue:sync-agents         (no --local flag, uploads to production R2)
 */
import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const isLocal = process.argv.includes("--local");
const bucket = "docs-flue-bucket";
const agentsDir = new URL("../.agents", import.meta.url).pathname;

function findFiles(dir: string): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			files.push(...findFiles(full));
		} else {
			files.push(full);
		}
	}
	return files;
}

const files = findFiles(agentsDir);

if (files.length === 0) {
	console.error(`No files found in ${agentsDir}`);
	process.exit(1);
}

const localFlag = isLocal
	? "--local --persist-to .flue/.wrangler/state"
	: "--remote";

// Stale R2 keys to delete — files that have been removed from the repo
// but may still exist in R2 from previous syncs.
const staleKeys = [
	// Old flat style-guide reference files replaced by always/+conditional/+components/ structure
	".agents/reference/style-guide/code-blocks.md",
	".agents/reference/style-guide/components.md",
	".agents/reference/style-guide/formatting.md",
	".agents/reference/style-guide/headings.md",
	".agents/reference/style-guide/links.md",
	".agents/reference/style-guide/mdx-syntax.md",
	".agents/reference/style-guide/terminology.md",
	".agents/reference/style-guide/writing.md",
	// Component reference files removed — import-only rules are handled by CI build
	".agents/reference/style-guide/components/available-notifications.md",
	".agents/reference/style-guide/components/badge.md",
	".agents/reference/style-guide/components/card-grid.md",
	".agents/reference/style-guide/components/card.md",
	".agents/reference/style-guide/components/description.md",
	".agents/reference/style-guide/components/directory-listing.md",
	".agents/reference/style-guide/components/external-resources.md",
	".agents/reference/style-guide/components/feature-table.md",
	".agents/reference/style-guide/components/feature.md",
	".agents/reference/style-guide/components/glossary-definition.md",
	".agents/reference/style-guide/components/glossary-tooltip.md",
	".agents/reference/style-guide/components/glossary.md",
	".agents/reference/style-guide/components/inline-badge.md",
	".agents/reference/style-guide/components/link-button.md",
	".agents/reference/style-guide/components/link-card.md",
	".agents/reference/style-guide/components/link-title-card.md",
	".agents/reference/style-guide/components/list-card.md",
	".agents/reference/style-guide/components/list-tutorials.md",
	".agents/reference/style-guide/components/pages-build-preset.md",
	".agents/reference/style-guide/components/plan.md",
	".agents/reference/style-guide/components/product-availability-text.md",
	".agents/reference/style-guide/components/product-changelog.md",
	".agents/reference/style-guide/components/product-features.md",
	".agents/reference/style-guide/components/public-stats.md",
	".agents/reference/style-guide/components/related-product.md",
	".agents/reference/style-guide/components/resources-by-selector.md",
	".agents/reference/style-guide/components/rule-id.md",
	".agents/reference/style-guide/components/tab-item.md",
	".agents/reference/style-guide/components/width.md",
	".agents/reference/style-guide/components/wrangler-namespace.md",
	".agents/reference/style-guide/components/youtube.md",
];

for (const key of staleKeys) {
	const r2Key = `${bucket}/${key}`;
	const cmd = `wrangler r2 object delete ${r2Key} ${localFlag}`;
	try {
		execSync(cmd, { stdio: "pipe" });
		console.log(`Deleted stale: ${key}`);
	} catch {
		// Non-fatal — object may not exist
	}
}

let failed = false;
for (const filePath of files) {
	// Key in R2: .agents/...
	const relativeToFlue = filePath.slice(filePath.indexOf("/.agents/") + 1);
	const r2Key = `${bucket}/${relativeToFlue}`;

	const cmd = `wrangler r2 object put ${r2Key} --file ${filePath} ${localFlag}`;

	console.log(`Uploading: ${relativeToFlue}`);
	try {
		execSync(cmd, { stdio: "inherit" });
	} catch {
		console.error(`Failed to upload ${relativeToFlue}`);
		failed = true;
	}
}

if (failed) {
	process.exit(1);
}

console.log(
	`\nSynced ${files.length} file(s) to R2 (${isLocal ? "local" : "remote"}).`,
);
