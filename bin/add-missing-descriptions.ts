#!/usr/bin/env tsx

/**
 * Adds SEO description to docs that are missing one.
 * Derives description from page title and first paragraph of content (no external API).
 *
 * Usage: npx tsx bin/add-missing-descriptions.ts [--dry-run] [--product workers]
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import globby from "fast-glob";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");
const MAX_DESCRIPTION_LENGTH = 160; // SEO meta description length

function looksLikeCode(s: string): boolean {
	const t = s.trim();
	return (
		/^\s*import\s/.test(t) ||
		/\s+from\s+["']/.test(t) ||
		/^[{}[\]<>]/.test(t) ||
		/^<\/?[A-Z]/.test(t) ||
		/^export\s/.test(t)
	);
}

function extractFirstParagraph(content: string): string {
	if (!content || !content.trim()) return "";

	// Remove import statements (whole lines, including multiline)
	let text = content.replace(/^import\s+[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "");

	// Remove JSX/component blocks for simplicity - take text between
	text = text
		.replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, " ")
		.replace(/<[A-Za-z][^/>]*\/>/g, " ")
		.replace(/<Render[^>]*\/>/g, " ")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // links -> link text

	// Get first block of prose (split by double newline or heading)
	const blocks = text.split(/\n\n+/);
	for (const block of blocks) {
		const line = block
			.replace(/^#+\s*/m, "")
			.replace(/^[-*]\s*/gm, "")
			.trim();
		if (line.length > 20 && /[a-zA-Z]/.test(line) && !looksLikeCode(line)) {
			const oneLine = line.replace(/\s+/g, " ").trim();
			if (oneLine.length > 0) return oneLine;
		}
	}

	// Fallback: first line with letters that is not code
	const firstLine = text
		.split("\n")
		.find((l) => l.trim().length > 20 && /[a-zA-Z]/.test(l) && !looksLikeCode(l));
	return firstLine ? firstLine.replace(/^#+\s*/, "").replace(/\s+/g, " ").trim() : "";
}

function truncateToLength(s: string, max: number): string {
	s = s.trim();
	if (s.length <= max) return s;
	const cut = s.slice(0, max + 1);
	const lastSpace = cut.lastIndexOf(" ");
	return lastSpace > max - 20 ? cut.slice(0, lastSpace).trim() : cut.slice(0, max).trim();
}

function generateDescription(title: string, content: string): string {
	const first = extractFirstParagraph(content);
	if (first.length >= 30) {
		return truncateToLength(first, MAX_DESCRIPTION_LENGTH);
	}
	// Fallback from title
	const fallback = `Learn about ${title} in Cloudflare documentation.`;
	return truncateToLength(fallback, MAX_DESCRIPTION_LENGTH);
}

async function updateFrontmatter(
	filePath: string,
	description: string,
): Promise<boolean> {
	const originalContent = await fs.readFile(filePath, "utf-8");
	const { data: frontmatter } = matter(originalContent);
	if (frontmatter.description) return false;

	const frontmatterMatch = originalContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!frontmatterMatch) return false;

	const originalFrontmatter = frontmatterMatch[1];
	// YAML: quote and escape so colons/quotes don't break
	const escaped = description.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
	const newFrontmatter = `${originalFrontmatter.trim()}\ndescription: "${escaped}"`;
	const updatedContent = originalContent.replace(
		/^---\r?\n[\s\S]*?\r?\n---/,
		`---\n${newFrontmatter}\n---`,
	);
	await fs.writeFile(filePath, updatedContent, "utf-8");
	return true;
}

async function main() {
	const args = process.argv.slice(2);
	const dryRun = args.includes("--dry-run");
	const productArg = args.find((a) => a.startsWith("--product="));
	const productFilter = productArg?.split("=")[1];

	const pattern = productFilter
		? path.join(DOCS_DIR, productFilter, "**/*.mdx")
		: path.join(DOCS_DIR, "**/*.mdx");

	const files = await globby(pattern, { absolute: true });
	let updated = 0;
	let skipped = 0;
	let errors = 0;

	for (const filePath of files) {
		try {
			const content = await fs.readFile(filePath, "utf-8");
			const { data: frontmatter, content: body } = matter(content);
			if (frontmatter.description) {
				skipped++;
				continue;
			}
			const title = (frontmatter.title as string) || path.basename(filePath, ".mdx");
			const description = generateDescription(title, body);
			if (dryRun) {
				console.log(`[dry-run] ${path.relative(process.cwd(), filePath)} -> ${description.slice(0, 60)}...`);
				updated++;
				continue;
			}
			const done = await updateFrontmatter(filePath, description);
			if (done) {
				updated++;
				if (updated % 100 === 0) console.log(`Updated ${updated} files...`);
			}
		} catch (err) {
			errors++;
			console.error(`Error ${filePath}:`, err);
		}
	}

	console.log("\nDone. Updated:", updated, "Skipped (had description):", skipped, "Errors:", errors);
}

main();
