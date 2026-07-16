#!/usr/bin/env tsx

/**
 * Bidirectional sync check between style guide component pages and the agent
 * reference file `.agents/references/components.md`.
 *
 * The `styleGuide.component` frontmatter field is the authoritative signal that
 * a component is documented and author-facing. This script enforces that:
 *
 * 1. Every style guide page with `styleGuide.component` is mentioned in components.md.
 * 2. Every component name mentioned in components.md import lines exists as a
 *    `styleGuide.component` value in some style guide page.
 *
 * Run automatically as a CI pre-build step. Exits non-zero on any violation.
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
const AGENT_REFERENCE = path.join(".agents", "references", "components.md");

// Extract the value of `styleGuide.component` from a frontmatter block.
// Returns undefined if the field is not present.
function extractComponentName(content: string): string | undefined {
	const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (!fmMatch) return undefined;
	const componentMatch = fmMatch[1].match(/^\s*component:\s*(\S+)\s*$/m);
	return componentMatch?.[1];
}

// Extract primary component names from H2 section headings in the reference.
// Only the first PascalCase word of each heading is used as the component name,
// since headings like "## Tabs / TabItem" document Tabs as primary.
// Strips fenced code blocks first to avoid matching headings inside examples.
function extractSectionComponents(content: string): string[] {
	// Remove fenced code blocks (``` ... ```) before scanning for headings
	const stripped = content.replace(/```[\s\S]*?```/g, "");
	const names: string[] = [];
	const headingRe = /^## ([A-Z][A-Za-z]+)/gm;
	let match: RegExpExecArray | null;
	while ((match = headingRe.exec(stripped)) !== null) {
		names.push(match[1]);
	}
	return names;
}

// --- Build the known set from style guide pages ---

const styleGuideFiles = fs
	.readdirSync(STYLE_GUIDE_COMPONENTS_DIR)
	.filter((f) => f.endsWith(".mdx") && f !== "index.mdx");

const knownComponents = new Map<string, string>(); // componentName -> filename

for (const file of styleGuideFiles) {
	const filePath = path.join(STYLE_GUIDE_COMPONENTS_DIR, file);
	const content = fs.readFileSync(filePath, "utf-8");
	const componentName = extractComponentName(content);
	if (componentName) {
		knownComponents.set(componentName, file);
	}
}

const referenceContent = fs.readFileSync(AGENT_REFERENCE, "utf-8");

let failed = false;

// --- Check 1: style guide page → components.md ---

const missingFromReference: string[] = [];

for (const [componentName, file] of knownComponents) {
	if (!referenceContent.includes(componentName)) {
		missingFromReference.push(`${componentName} (${file})`);
	}
}

if (missingFromReference.length > 0) {
	console.error(
		"\nError: The following components have style guide pages but are missing from .agents/references/components.md:\n",
	);
	for (const m of missingFromReference) {
		console.error(`  - ${m}`);
	}
	console.error(
		"\nAdd entries for these components to .agents/references/components.md.\n",
	);
	failed = true;
}

// --- Check 2: components.md → style guide pages ---

const sectionsInReference = extractSectionComponents(referenceContent);
const unknownInReference: string[] = [];

for (const name of sectionsInReference) {
	if (!knownComponents.has(name)) {
		unknownInReference.push(name);
	}
}

if (unknownInReference.length > 0) {
	console.error(
		"\nError: The following components are imported in .agents/references/components.md but have no style guide page with a matching `styleGuide.component` field:\n",
	);
	for (const name of unknownInReference) {
		console.error(`  - ${name}`);
	}
	console.error(
		"\nEither add a style guide page with a matching `styleGuide.component` field, or rename the ## heading in components.md to match an existing style guide component name.\n",
	);
	failed = true;
}

if (failed) {
	process.exit(1);
}

console.log(
	`✓ All ${knownComponents.size} documented components are in sync between style guide pages and .agents/references/components.md`,
);
