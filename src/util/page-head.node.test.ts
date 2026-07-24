import { describe, expect, test } from "vitest";

import {
	buildStructuredData,
	classifyContentType,
	inferContentType,
	resolveFavicon,
	resolvePageTitle,
	resolveSocialImagePath,
} from "./page-head";

const existing =
	(...present: string[]) =>
	(file: string) =>
		present.includes(file);

describe("resolveFavicon", () => {
	test("prefers svg > ico > png among those that exist", () => {
		expect(resolveFavicon(existing("favicon.svg", "favicon.png")).file).toBe(
			"favicon.svg",
		);
		expect(resolveFavicon(existing("favicon.ico", "favicon.png")).file).toBe(
			"favicon.ico",
		);
		expect(resolveFavicon(existing("favicon.png")).type).toBe("image/png");
	});

	test("falls back to the svg candidate when none exist", () => {
		expect(resolveFavicon(existing())).toEqual({
			file: "favicon.svg",
			type: "image/svg+xml",
		});
	});
});

describe("resolveSocialImagePath", () => {
	const none = existing();
	test("precedence: prop > config > opengraph > logo > card", () => {
		expect(
			resolveSocialImagePath({
				socialImage: "/page.png",
				configImage: "/cfg.png",
				exists: existing("opengraph.png"),
			}),
		).toBe("/page.png");
		expect(
			resolveSocialImagePath({ configImage: "/cfg.png", exists: none }),
		).toBe("/cfg.png");
		expect(resolveSocialImagePath({ exists: existing("opengraph.png") })).toBe(
			"/opengraph.png",
		);
		expect(resolveSocialImagePath({ exists: existing("logo.png") })).toBe(
			"/logo.png",
		);
		expect(resolveSocialImagePath({ exists: none })).toBe("/og-docs.png");
	});

	test("changelog card beats config/files, loses to explicit prop", () => {
		expect(
			resolveSocialImagePath({
				isChangelog: true,
				configImage: "/cfg.png",
				exists: existing("opengraph.png"),
			}),
		).toBe("/og-changelog.png");
		expect(
			resolveSocialImagePath({
				socialImage: "/page.png",
				isChangelog: true,
				exists: none,
			}),
		).toBe("/page.png");
		expect(resolveSocialImagePath({ isChangelog: false, exists: none })).toBe(
			"/og-docs.png",
		);
	});
});

describe("inferContentType", () => {
	test("model pages → reference", () => {
		expect(inferContentType("/ai/models/foo", "ai")).toBe("reference");
		expect(inferContentType("/workers-ai/models/bar/", "workers-ai")).toBe(
			"reference",
		);
	});
	test("changelog section → changelog-entry", () => {
		expect(inferContentType("/changelog/post/x/", "changelog")).toBe(
			"changelog-entry",
		);
	});
	test("otherwise undefined", () => {
		expect(
			inferContentType("/workers/get-started/", "workers"),
		).toBeUndefined();
		expect(inferContentType("/ai/models/", "ai")).toBeUndefined();
	});
});

describe("resolvePageTitle", () => {
	test("no suffix, no override → `Title | Site` (unconditional, no dedup)", () => {
		expect(
			resolvePageTitle({ title: "Workers", siteTitle: "Cloudflare Docs" }),
		).toBe("Workers | Cloudflare Docs");
		// No dedup even when title equals the site title.
		expect(
			resolvePageTitle({
				title: "Cloudflare Docs",
				siteTitle: "Cloudflare Docs",
			}),
		).toBe("Cloudflare Docs | Cloudflare Docs");
	});

	test("suffix present → `base · suffix`, base from raw title", () => {
		expect(
			resolvePageTitle({
				title: "Get started",
				titleSuffix: "Workers",
				siteTitle: "Cloudflare Docs",
			}),
		).toBe("Get started · Workers");
	});

	test("suffix present with head-title override → base is override split on ' | '", () => {
		expect(
			resolvePageTitle({
				title: "raw",
				titleOverride: "Model X (Author) | ignored",
				titleSuffix: "Workers AI",
				siteTitle: "Cloudflare Docs",
			}),
		).toBe("Model X (Author) · Workers AI");
	});

	test("no suffix, head-title override present → raw override wins", () => {
		expect(
			resolvePageTitle({
				title: "raw",
				titleOverride: "Custom Head Title",
				siteTitle: "Cloudflare Docs",
			}),
		).toBe("Custom Head Title");
	});
});

describe("classifyContentType", () => {
	test("empty → (null, not changelog, TechArticle)", () => {
		expect(classifyContentType("")).toEqual({
			contentType: null,
			isChangelog: false,
			schemaType: "TechArticle",
		});
	});

	test("changelog and changelog-entry → BlogPosting + isChangelog", () => {
		for (const raw of ["changelog", "changelog-entry"]) {
			const c = classifyContentType(raw);
			expect(c.isChangelog).toBe(true);
			expect(c.schemaType).toBe("BlogPosting");
		}
	});

	test("navigation / overview / reference-architecture-diagram → WebPage", () => {
		for (const raw of [
			"navigation",
			"overview",
			"reference-architecture-diagram",
		]) {
			expect(classifyContentType(raw).schemaType).toBe("WebPage");
			expect(classifyContentType(raw).isChangelog).toBe(false);
		}
	});

	test("other types → TechArticle and formatted contentType", () => {
		expect(classifyContentType("reference").schemaType).toBe("TechArticle");
		// formatting: capitalize first letter, hyphens → spaces
		expect(classifyContentType("how-to").contentType).toBe("How to");
	});
});

describe("buildStructuredData", () => {
	const base = {
		schemaType: "TechArticle" as const,
		canonical: "https://developers.cloudflare.com/workers/",
		fullTitle: "Get started · Workers",
		lang: "en",
		isChangelog: false,
	};

	test("returns null when there is no canonical", () => {
		expect(buildStructuredData({ ...base, canonical: null })).toBeNull();
	});

	test("@type reflects schemaType", () => {
		const json = JSON.parse(
			buildStructuredData({ ...base, schemaType: "WebPage" })!,
		);
		expect(json["@type"]).toBe("WebPage");
		expect(json["@id"]).toBe(`${base.canonical}#page`);
	});

	test("description included only when truthy", () => {
		expect(JSON.parse(buildStructuredData(base)!).description).toBeUndefined();
		expect(
			JSON.parse(buildStructuredData({ ...base, description: "d" })!)
				.description,
		).toBe("d");
	});

	test("image spread present only when ogImage is set", () => {
		expect(JSON.parse(buildStructuredData(base)!).image).toBeUndefined();
		expect(
			JSON.parse(buildStructuredData({ ...base, ogImage: "/og.png" })!).image,
		).toBe("/og.png");
	});

	test("datePublished only when isChangelog && present", () => {
		// present but not changelog → omitted
		expect(
			JSON.parse(buildStructuredData({ ...base, datePublished: "2025-01-01" })!)
				.datePublished,
		).toBeUndefined();
		// changelog + present → included
		expect(
			JSON.parse(
				buildStructuredData({
					...base,
					schemaType: "BlogPosting",
					isChangelog: true,
					datePublished: "2025-01-01",
				})!,
			).datePublished,
		).toBe("2025-01-01");
	});

	test("keywords omitted when tags absent/empty, present when populated", () => {
		expect(JSON.parse(buildStructuredData(base)!).keywords).toBeUndefined();
		expect(
			JSON.parse(buildStructuredData({ ...base, tags: [] })!).keywords,
		).toBeUndefined();
		expect(
			JSON.parse(buildStructuredData({ ...base, tags: ["a", "b"] })!).keywords,
		).toEqual(["a", "b"]);
	});

	test("escapes `<` to prevent breaking out of the script tag", () => {
		const out = buildStructuredData({
			...base,
			fullTitle: "a </script> b",
		})!;
		expect(out).not.toContain("</script>");
		expect(out).toContain("\\u003c/script>");
	});

	test("exact key order + full string (locks byte-for-byte parity)", () => {
		const out = buildStructuredData({
			schemaType: "BlogPosting",
			canonical: "https://developers.cloudflare.com/changelog/x/",
			fullTitle: "X · Changelog",
			description: "desc",
			lang: "en",
			ogImage: "https://developers.cloudflare.com/og.png",
			dateModified: "2025-02-02",
			isChangelog: true,
			datePublished: "2025-01-01",
			tags: ["t1"],
		});
		expect(out).toBe(
			'{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/changelog/x/#page","headline":"X · Changelog","description":"desc","url":"https://developers.cloudflare.com/changelog/x/","inLanguage":"en","image":"https://developers.cloudflare.com/og.png","dateModified":"2025-02-02","datePublished":"2025-01-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["t1"]}',
		);
	});
});
