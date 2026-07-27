import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { HTMLElement } from "node-html-parser";
import type { RawSection, Section } from "./types";

export function sha256(input: string) {
	return createHash("sha256").update(input).digest("hex");
}

export function normalizeText(input: string) {
	return input.replace(/\s+/g, " ").trim();
}

export const MAX_SECTION_TEXT_LENGTH = 60_000;

export function truncateText(input: string, maxLength: number) {
	if (input.length <= maxLength) return input;
	return `${input.slice(0, maxLength).trim()}\n\n[Content truncated]`;
}

export function meta(root: HTMLElement, name: string) {
	return (
		root.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ??
		root.querySelector(`meta[property="${name}"]`)?.getAttribute("content") ??
		undefined
	);
}

export function htmlPathToDocsPath(dist: string, htmlFile: string) {
	const rel = relative(dist, htmlFile).split(sep).join("/");
	if (rel === "index.html") return "/";
	if (rel.endsWith("/index.html"))
		return `/${rel.slice(0, -"index.html".length)}`;
	if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}/`;
	return `/${rel}`;
}

export function docsPathToMarkdownPath(pathname: string) {
	if (pathname.endsWith("/")) return `${pathname}index.md`;
	return `${pathname}/index.md`;
}

export function docsPathToItemKey(pathname: string) {
	const normalized = pathname === "/" ? "/index/" : pathname;
	return `docs${docsPathToMarkdownPath(normalized)}`;
}

export function sectionItemKey(
	baseKey: string,
	section: Pick<RawSection, "anchor" | "heading">,
	index: number,
) {
	const anchor =
		section.anchor || slugifyHeading(section.heading) || `section-${index + 1}`;
	const prefix = baseKey.endsWith(".md")
		? baseKey.slice(0, -".md".length)
		: baseKey;
	return `${prefix}.${anchor}.md`;
}

export function uniqueAnchor(anchor: string, usedAnchors: Set<string>) {
	if (!anchor) return anchor;

	let candidate = anchor;
	let suffix = 1;
	while (usedAnchors.has(candidate)) candidate = `${anchor}-${suffix++}`;
	usedAnchors.add(candidate);
	return candidate;
}

export function addSectionRecordFields(
	path: string,
	sections: RawSection[],
): Section[] {
	const baseKey = docsPathToItemKey(path);
	const usedAnchors = new Set<string>();
	const usedKeyAnchors = new Set<string>();

	return sections.map((section, index) => {
		const anchor = uniqueAnchor(section.anchor, usedAnchors);
		const keyAnchor = uniqueAnchor(
			anchor || slugifyHeading(section.heading) || `section-${index + 1}`,
			usedKeyAnchors,
		);
		const sectionWithAnchor = { ...section, anchor };
		return {
			...sectionWithAnchor,
			key: sectionItemKey(
				baseKey,
				{ ...sectionWithAnchor, anchor: keyAnchor },
				index,
			),
		};
	});
}

export function slugifyHeading(value: string) {
	return value
		.toLowerCase()
		.replace(/`([^`]+)`/g, "$1")
		.replace(/<[^>]+>/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

export function shouldIndexHtmlPath(path: string) {
	const pathWithoutTrailingSlash = path.replace(/\/$/, "");

	if (path.startsWith("/changelog/") && !path.startsWith("/changelog/post/")) {
		return false;
	}

	if (/\.(?:json|xml|rss|txt)$/i.test(pathWithoutTrailingSlash)) {
		return false;
	}

	if (/^\/changelog\/(?:rss|feed|atom)(?:\/|$)/i.test(path)) {
		return false;
	}

	if (/(?:^|\/)(?:rss|feed|atom)(?:\/|$)/i.test(path)) {
		return false;
	}

	return true;
}

export function sourceCandidatesForPath(sourceDocsDir: string, path: string) {
	const rel = path.replace(/^\//, "").replace(/\/$/, "");
	const bases = rel ? [rel, `${rel}/index`] : ["index"];
	return bases.flatMap((base) => [
		join(sourceDocsDir, `${base}.mdx`),
		join(sourceDocsDir, `${base}.md`),
	]);
}

export async function sourceMarkdownForPath(
	sourceDocsDir: string,
	path: string,
): Promise<{ file: string; content: string } | undefined> {
	for (const candidate of sourceCandidatesForPath(sourceDocsDir, path)) {
		try {
			return { file: candidate, content: await readFile(candidate, "utf8") };
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
		}
	}
	return undefined;
}
