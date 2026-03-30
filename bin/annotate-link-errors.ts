/**
 * Parses build.log for starlight-links-validator errors and emits GitHub Actions
 * annotations pointing to the source MDX file and line number of each broken link.
 *
 * Usage: npx tsx bin/annotate-link-errors.ts [path/to/build.log]
 * Defaults to build.log in the current working directory.
 */

import * as fs from "node:fs";
import * as path from "node:path";

const DOCS_DIR = "src/content/docs";
const LOG_PATH = process.argv[2] ?? "build.log";

// Strip ANSI escape codes.
function stripAnsi(str: string): string {
	// eslint-disable-next-line no-control-regex
	return str.replace(/\x1B\[[0-9;]*[mGKHF]/g, "");
}

// Find the source MDX file for a given slug (e.g. "workers/get-started/").
// Checks <slug>/index.mdx first, then <slug>.mdx (without trailing slash).
function findSourceFile(slug: string): string | null {
	const bare = slug.replace(/\/$/, "");
	const candidates = [
		path.join(DOCS_DIR, bare, "index.mdx"),
		path.join(DOCS_DIR, `${bare}.mdx`),
	];
	for (const candidate of candidates) {
		if (fs.existsSync(candidate)) return candidate;
	}
	return null;
}

// Search for the first occurrence of a link URL in a file and return its 1-based line number.
// Returns null if not found or if the file cannot be read.
// Tries progressively looser matches to handle trailing slashes and hash fragments.
function findLinkLine(filePath: string, link: string): number | null {
	let lines: string[];
	try {
		lines = fs.readFileSync(filePath, "utf8").split("\n");
	} catch {
		return null;
	}

	// Build a list of candidate strings to search for, from most to least specific.
	const candidates = new Set<string>([link]);
	// Strip hash fragment: "/path/#anchor" → "/path/"
	const withoutHash = link.replace(/#.*$/, "");
	if (withoutHash !== link) candidates.add(withoutHash);
	// Strip trailing slash: "/path/" → "/path"
	const withoutTrailingSlash = link.replace(/\/$/, "");
	if (withoutTrailingSlash !== link) candidates.add(withoutTrailingSlash);
	// Strip both hash and trailing slash
	const withoutHashOrSlash = withoutHash.replace(/\/$/, "");
	if (withoutHashOrSlash !== withoutHash) candidates.add(withoutHashOrSlash);

	for (const candidate of candidates) {
		if (!candidate) continue;
		for (let i = 0; i < lines.length; i++) {
			if (lines[i].includes(candidate)) return i + 1;
		}
	}
	return null;
}

function emitAnnotation(
	file: string,
	line: number | null,
	link: string,
	errorType: string,
): void {
	const location = line !== null ? `file=${file},line=${line}` : `file=${file}`;
	// GHA annotation format: ::error file=<path>,line=<n>::<message>
	console.log(`::error ${location}::${link} — ${errorType}`);
}

function run(): void {
	if (!fs.existsSync(LOG_PATH)) {
		console.error(`build.log not found at ${LOG_PATH}`);
		process.exit(1);
	}

	const raw = fs.readFileSync(LOG_PATH, "utf8");
	const lines = raw.split("\n").map(stripAnsi);

	// Find the "validating links" section.
	const startIdx = lines.findIndex((l) => l.includes("validating links"));
	if (startIdx === -1) {
		// No link validation ran — nothing to annotate.
		process.exit(0);
	}

	// Parse (slug → broken links) from the validator output.
	// Format after stripping ANSI and timestamps:
	//   ▶ <slug>/
	//     ├─ <link> - <error type>
	//     └─ <link> - <error type>
	let currentSlug: string | null = null;
	let annotationCount = 0;

	for (let i = startIdx; i < lines.length; i++) {
		const line = lines[i];

		// Strip leading timestamp like "22:12:36 " produced by Astro's logger.
		const content = line.replace(/^\d{2}:\d{2}:\d{2}\s+/, "").trimEnd();

		const slugMatch = content.match(/^▶\s+(.+)$/);
		if (slugMatch) {
			// Strip both leading and trailing slashes — the validator may emit a leading slash.
			currentSlug = slugMatch[1].trim().replace(/^\//, "");
			continue;
		}

		// ├─ or └─ line: a broken link under the current slug.
		// Leading spaces may be consumed by the timestamp strip, so match with optional spaces.
		const linkMatch = content.match(/^\s*[├└]─\s+(\S+)\s+-\s+(.+)$/);
		if (linkMatch && currentSlug) {
			const link = linkMatch[1];
			const errorType = linkMatch[2].trim();

			const sourceFile = findSourceFile(currentSlug);
			if (!sourceFile) {
				// Can't map to a file — emit a generic annotation on the run.
				console.log(
					`::error::${link} — ${errorType} (in ${currentSlug}, source file not found)`,
				);
				annotationCount++;
				continue;
			}

			const lineNumber = findLinkLine(sourceFile, link);
			emitAnnotation(sourceFile, lineNumber, link, errorType);
			annotationCount++;
		}
	}

	if (annotationCount === 0) {
		// Validator ran but produced no parseable errors — fall back to a generic annotation.
		console.log(
			"::error::starlight-links-validator found broken internal links. See the Build job logs for details.",
		);
	}

	// Always exit non-zero so the step fails the job.
	process.exit(1);
}

run();
