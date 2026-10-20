import { resolveRedirect } from "./redirects";

/**
 * Minimal page shape needed to render a single `llms.txt` hub line.
 * Structurally compatible with the docs collection entries used by the
 * product hub endpoint.
 */
export interface LlmsTxtPage {
	id: string;
	data: {
		title: string;
		description?: string;
		external_link?: string;
	};
}

/** Minimal model shape needed to render a model page link. */
export interface ModelPage {
	/** Link text. */
	title: string;
	/** URL segment(s) after the models base path, e.g. `openai/tts-1`. */
	slug: string;
	description: string;
}

/**
 * Normalizes a resolved URL path so that `index.md` can be appended safely:
 * strips any `#fragment` (to be re-attached after `index.md`) and ensures a
 * trailing slash.
 *
 * `/analytics/analytics-engine` -> `/analytics/analytics-engine/`
 * `/workers-ai/x/#2-connect` -> `/workers-ai/x/` + `#2-connect`
 */
export function normalizeForIndexMd(path: string): {
	path: string;
	fragment: string;
} {
	let fragment = "";
	const hashIndex = path.indexOf("#");
	if (hashIndex !== -1) {
		fragment = path.slice(hashIndex);
		path = path.slice(0, hashIndex);
	}
	if (!path.endsWith("/")) path += "/";
	return { path, fragment };
}

/**
 * Renders one `- [title](url): description` line for a product hub's
 * llms.txt output.
 *
 * External links are not always slash-terminated and may carry a
 * `#fragment`; gluing `index.md` onto such paths produces dead URLs like
 * `.../analytics-engineindex.md` or `...#anchorindex.md`. The path is
 * normalized first so the Markdown link always points at the page's
 * `index.md` with the anchor preserved at the end.
 */
export function formatPage(
	base: string,
	e: LlmsTxtPage,
	resolve: (urlPath: string) => string = resolveRedirect,
): string {
	const resolved = resolve(
		e.data.external_link?.startsWith("/") ? e.data.external_link : `/${e.id}/`,
	);
	const { path, fragment } = normalizeForIndexMd(resolved);
	const line = `- [${e.data.title}](${base}${path}index.md${fragment})`;
	return e.data.description ? line.concat(`: ${e.data.description}`) : line;
}

/**
 * Renders one generated model page line in a product llms.txt.
 * `modelsPath` is the models index URL path, e.g. `/ai/models`.
 */
export function formatModel(
	base: string,
	modelsPath: string,
	model: ModelPage,
): string {
	const description = model.description.replace(/\s+/g, " ").trim();
	const line = `- [${model.title}](${base}${modelsPath}/${model.slug}/index.md)`;
	return description ? line.concat(`: ${description}`) : line;
}
