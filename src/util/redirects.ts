import { readFileSync } from "node:fs";
import { join } from "node:path";

interface DynamicRule {
	regex: RegExp;
	dest: string;
}

/**
 * Parses `public/__redirects` and returns static (exact-match) and dynamic
 * (splat/wildcard) redirect rules.
 *
 * Static rules are stored in a Map for O(1) lookup. Dynamic rules are stored
 * as an ordered array of { regex, dest } objects, evaluated in file order.
 */
function parseRedirects(): {
	staticRules: Map<string, string>;
	dynamicRules: DynamicRule[];
} {
	const raw = readFileSync(
		join(process.cwd(), "public", "__redirects"),
		"utf-8",
	);

	const staticRules = new Map<string, string>();
	const dynamicRules: DynamicRule[] = [];

	for (const rawLine of raw.split("\n")) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) continue;

		const parts = line.split(/\s+/);
		if (parts.length < 2) continue;

		const [source, dest] = parts;

		if (source.includes("*")) {
			// Convert splat pattern to regex: /foo/* → ^\/foo\/(?<splat>.*)$
			const escaped = source
				.split("*")
				.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
				.join("(?<splat>.*)");
			dynamicRules.push({ regex: new RegExp("^" + escaped + "$"), dest });
		} else {
			staticRules.set(source, dest);
		}
	}

	return { staticRules, dynamicRules };
}

// Evaluated once at build time.
const { staticRules, dynamicRules } = parseRedirects();

function isExternalUrl(url: string): boolean {
	return url.startsWith("http://") || url.startsWith("https://");
}

/** Maximum number of redirect hops to follow when resolving chains. */
const MAX_HOPS = 10;

/**
 * Resolves a URL path through `__redirects`, following redirect chains up to
 * {@link MAX_HOPS} hops. Returns the final destination path.
 *
 * - Static (exact-match) rules are checked first.
 * - Dynamic (splat) rules are checked in file order if no static match.
 * - External destinations (starting with `http://` or `https://`) are
 *   returned as-is — callers should check for this.
 *
 * @param urlPath - An absolute URL path starting with `/`, e.g. `/learning-paths/`.
 * @returns The resolved path, or the original path if no redirect applies.
 */
export function resolveRedirect(urlPath: string): string {
	let current = urlPath;

	for (let hop = 0; hop < MAX_HOPS; hop++) {
		// Static lookup
		const staticDest = staticRules.get(current);
		if (staticDest) {
			if (isExternalUrl(staticDest)) {
				return staticDest;
			}
			current = staticDest;
			continue;
		}

		// Dynamic lookup
		let matched = false;
		for (const rule of dynamicRules) {
			const m = current.match(rule.regex);
			if (m) {
				const splat = m.groups?.splat ?? "";
				const resolved = rule.dest.replace(":splat", splat);
				if (isExternalUrl(resolved)) {
					return resolved;
				}
				current = resolved;
				matched = true;
				break;
			}
		}

		if (!matched) break;
	}

	return current;
}

/**
 * Returns `true` if the given URL path resolves to an external URL through
 * `__redirects` (i.e. the final destination starts with `http://` or `https://`).
 */
export function isExternalRedirect(urlPath: string): boolean {
	return isExternalUrl(resolveRedirect(urlPath));
}
