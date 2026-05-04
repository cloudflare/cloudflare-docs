import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Parses the `Disallow` directives from `public/robots.txt` for the wildcard
 * user-agent (`*`) and returns them as an array of path prefixes.
 *
 * Only `User-agent: *` blocks are considered. Blank `Disallow` entries
 * (which re-allow everything) are ignored.
 */
function parseDisallowedPaths(): string[] {
	const robotsTxt = readFileSync(
		join(process.cwd(), "public", "robots.txt"),
		"utf-8",
	);

	const disallowed: string[] = [];
	let inWildcardBlock = false;

	for (const rawLine of robotsTxt.split("\n")) {
		const line = rawLine.trim();

		if (line.startsWith("#") || line === "") continue;

		if (line.toLowerCase().startsWith("user-agent:")) {
			const agent = line.slice("user-agent:".length).trim();
			inWildcardBlock = agent === "*";
			continue;
		}

		if (!inWildcardBlock) continue;

		if (line.toLowerCase().startsWith("disallow:")) {
			const path = line.slice("disallow:".length).split("#")[0].trim();
			if (path) disallowed.push(path);
		}
	}

	return disallowed;
}

// Evaluated once at build time.
const DISALLOWED_PATHS = parseDisallowedPaths();

/**
 * Returns `true` if the given URL path is disallowed by `robots.txt`.
 *
 * Matching follows the standard robots.txt prefix rule: a disallow entry
 * matches any path that starts with the entry's value.
 *
 * @param urlPath - An absolute URL path starting with `/`, e.g. `/plans/`.
 */
export function isDisallowedByRobots(urlPath: string): boolean {
	return DISALLOWED_PATHS.some((disallowed) => urlPath.startsWith(disallowed));
}
