import {
	allReferences,
	buildCategoryLines,
	CATEGORY_LABELS,
	categoryCount,
	escapeHtml,
	type Category,
	type ConfigReference,
	type ReferenceProperty,
} from "./config-examples";

export interface AnnotatedOption {
	name: string;
	signature: string;
	descriptionHtml: string;
}

export interface AnnotatedReference {
	id: string;
	name: string;
	kind: "Builder" | "Context value" | "Function" | "Optional" | "Required";
	signature: string;
	descriptionHtml: string;
	defaultValue?: string;
	links: { label: string; url: string }[];
	options: AnnotatedOption[];
}

export interface AnnotatedLine {
	id?: string;
	indent: number;
	html: string;
	references: AnnotatedReference[];
}

export interface AnnotatedCategory {
	id: Category;
	label: string;
	count: number;
	code: string;
	lines: AnnotatedLine[];
}

export const KEYWORDS = new Set([
	"as",
	"default",
	"export",
	"from",
	"import",
	"with",
]);
const SITE_ORIGIN = "https://developers.cloudflare.com";

function siteRelative(url: string) {
	return url.startsWith(`${SITE_ORIGIN}/`)
		? url.slice(SITE_ORIGIN.length)
		: url;
}

function linkHtml(url: string, label: string) {
	return `<a href="${escapeHtml(siteRelative(url))}">${label}</a>`;
}

export function formatDescription(text = "") {
	return escapeHtml(text)
		.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, label, url) =>
			linkHtml(url, label),
		)
		.replace(/`([^`]+)`/g, "<code>$1</code>")
		.replace(
			/(^|[\s(])(https?:\/\/[^\s<)]*[^\s<).,;:])/g,
			(_, lead, url) => `${lead}${linkHtml(url, url)}`,
		);
}

export function highlightCode(text: string) {
	return text
		.split(/("(?:[^"\\]|\\.)*"|\b[a-z]+\b)/)
		.map((part) => {
			if (part.startsWith('"') && part.length > 1) {
				return `<span class="ace-string">${escapeHtml(part)}</span>`;
			}
			if (KEYWORDS.has(part)) {
				return `<span class="ace-keyword">${part}</span>`;
			}
			return escapeHtml(part);
		})
		.join("");
}

function referenceKind(ref: ConfigReference): AnnotatedReference["kind"] {
	if (ref.signature) {
		return "Builder";
	}
	if (ref.id.startsWith("ConfigContext.")) {
		return "Context value";
	}
	return ref.required ? "Required" : "Optional";
}

function uniqueOptions(children: ReferenceProperty[]): AnnotatedOption[] {
	const seen = new Set<string>();
	return children.flatMap((child) => {
		const key = `${child.name}:${child.type}`;
		if (seen.has(key)) {
			return [];
		}
		seen.add(key);
		return [
			{
				name: child.name,
				signature: `${child.name}${child.required ? "" : "?"}: ${child.type}`,
				descriptionHtml: formatDescription(child.description),
			},
		];
	});
}

export function annotateReference(ref: ConfigReference): AnnotatedReference {
	return {
		id: ref.id,
		name: ref.name,
		kind: referenceKind(ref),
		signature:
			ref.signature ??
			`${ref.name}${ref.required ? "" : "?"}: ${ref.type ?? "unknown"}`,
		descriptionHtml: formatDescription(
			ref.description || "The type definition does not include a description.",
		),
		defaultValue: ref.default,
		links: (ref.links ?? []).map((link) => ({
			...link,
			url: siteRelative(link.url),
		})),
		options: ref.signature ? uniqueOptions(ref.children) : [],
	};
}

export function slug(value: string) {
	return value.replace(/[^A-Za-z0-9_-]+/g, "-").toLowerCase();
}

export function buildAnnotatedCategories(idPrefix: string) {
	const references = new Map(allReferences().map((ref) => [ref.id, ref]));
	const categories = Object.keys(CATEGORY_LABELS) as Category[];

	return categories.map((category): AnnotatedCategory => {
		const usedIds = new Set<string>();
		const codeLines = buildCategoryLines(category);
		const lines = codeLines.map((line): AnnotatedLine => {
			const indent = line.text.length - line.text.trimStart().length;
			let remainingIndent = indent;
			const html = line.segments
				.map((segment) => {
					let text = segment.text;
					if (remainingIndent > 0) {
						const trimmed = text.trimStart();
						remainingIndent -= text.length - trimmed.length;
						text = trimmed;
					}
					if (!text) {
						return "";
					}
					return segment.ref
						? `<span class="ace-token">${escapeHtml(text)}</span>`
						: highlightCode(text);
				})
				.join("");
			const referenceIds = [
				...new Set(
					line.segments.flatMap((segment) =>
						segment.ref ? [segment.ref] : [],
					),
				),
			];
			const lineReferences = referenceIds.flatMap((id) => {
				const ref = references.get(id);
				return ref ? [annotateReference(ref)] : [];
			});
			if (!lineReferences.length) {
				return { indent, html, references: [] };
			}
			const baseId = `${idPrefix}-${category}-${slug(referenceIds[0])}`;
			let id = baseId;
			for (let index = 2; usedIds.has(id); index++) {
				id = `${baseId}-${index}`;
			}
			usedIds.add(id);
			return { id, indent, html, references: lineReferences };
		});

		return {
			id: category,
			label: CATEGORY_LABELS[category],
			count: categoryCount(category),
			code: codeLines.map((line) => line.text).join("\n"),
			lines,
		};
	});
}
