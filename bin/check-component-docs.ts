#!/usr/bin/env tsx

/**
 * Checks that every style guide component page with a `styleGuide.component`
 * frontmatter field is mentioned in `.agents/references/components.md`.
 *
 * Run automatically as part of the prebuild step. Exits non-zero if any
 * component is undocumented in the agent reference.
 */

import fs from "fs";
import path from "path";

const STYLE_GUIDE_COMPONENTS_DIR = path.join(
	"src",
	"content",
	"docs",
	"style-guide",
	"components",
);
const AGENT_REFERENCE = path.join(
	".agents",
	"references",
	"components.md",
);

// Components that have style guide pages but are intentionally excluded from
// the agent reference because they are system-level, data-driven, or too
// specialised for general content authoring.
const EXCLUDED_COMPONENTS = new Set([
	"AnchorHeading",        // Internal — heading utility, not authored directly
	"AvailableNotifications", // Data-driven, system component
	"Description",          // Internal style guide component
	"ExternalResources",    // Specialised, rarely hand-authored
	"Feature",              // Product feature cards, data-driven
	"FeatureTable",         // Data-driven
	"FileTree",             // Specialised, low frequency
	"LinkButton",           // Starlight built-in, rarely used in docs prose
	"LinkCard",             // Starlight built-in (LinkCard ≠ LinkTitleCard)
	"ListTutorials",        // Auto-generated listing, not hand-authored
	"PagesBuildPreset",     // Pages-specific, data-driven
	"ProductAvailabilityText", // System component
	"ProductChangelog",     // System component
	"ProductFeatures",      // Data-driven
	"PublicStats",          // Internal stats component
	"RelatedProduct",       // Specialised cross-product links
	"ResourcesBySelector",  // Data-driven
	"RuleID",               // Security rules specific
	"SubtractIPCalculator", // Single-use calculator
	"Width",                // Layout utility
	"WranglerCLI",          // Auto-generated CLI reference, not hand-authored
	"WranglerNamespace",    // Wrangler-specific utility
	"YouTubeVideos",        // Playlist component, distinct from YouTube
]);

// Extract the value of `styleGuide.component` from a frontmatter block.
// Returns undefined if the field is not present.
function extractComponentName(content: string): string | undefined {
	const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (!fmMatch) return undefined;
	const componentMatch = fmMatch[1].match(/^\s*component:\s*(\S+)\s*$/m);
	return componentMatch?.[1];
}

const styleGuideFiles = fs
	.readdirSync(STYLE_GUIDE_COMPONENTS_DIR)
	.filter((f) => f.endsWith(".mdx") && f !== "index.mdx");

const referenceContent = fs.readFileSync(AGENT_REFERENCE, "utf-8");

const missing: string[] = [];

for (const file of styleGuideFiles) {
	const filePath = path.join(STYLE_GUIDE_COMPONENTS_DIR, file);
	const content = fs.readFileSync(filePath, "utf-8");
	const componentName = extractComponentName(content);

	if (!componentName) continue; // No styleGuide.component field — skip
	if (EXCLUDED_COMPONENTS.has(componentName)) continue; // Deliberately excluded

	// Check that the component name appears somewhere in the reference file.
	if (!referenceContent.includes(componentName)) {
		missing.push(`${componentName} (${file})`);
	}
}

if (missing.length > 0) {
	console.error(
		`\nError: The following components have style guide pages but are missing from .agents/references/components.md:\n`,
	);
	for (const m of missing) {
		console.error(`  - ${m}`);
	}
	console.error(
		`\nAdd entries for these components to .agents/references/components.md.\n`,
	);
	process.exit(1);
}

console.log(
	`✓ All ${styleGuideFiles.filter((f) => {
		const content = fs.readFileSync(
			path.join(STYLE_GUIDE_COMPONENTS_DIR, f),
			"utf-8",
		);
		return extractComponentName(content) !== undefined;
	}).length} documented components are referenced in .agents/references/components.md`,
);
