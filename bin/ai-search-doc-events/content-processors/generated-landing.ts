import { readFile } from "node:fs/promises";
import fg from "fast-glob";
import { parse as parseYaml } from "yaml";
import { AGENTS } from "../../../src/components/agent-setup/agents";
import type { ContentTransformer, RawSection } from "../types";
import { slugifyHeading } from "../shared";
import { asArray, asRecord, asString, readJsonFile } from "./data";
import { makeChunkedSections, makeSections } from "./utils";

async function directoryLandingSections(): Promise<RawSection[]> {
	const files = await fg("*.{yaml,yml,json}", {
		cwd: "src/content/directory",
		absolute: true,
	});
	const lines = await Promise.all(
		files.sort().map(async (file) => {
			const raw = await readFile(file, "utf8");
			const id = file.match(/([^/]+)\.(?:ya?ml|json)$/)?.[1] ?? "";
			const data =
				asRecord(file.endsWith(".json") ? JSON.parse(raw) : parseYaml(raw)) ??
				{};
			const entry = asRecord(data.entry) ?? {};
			const title = asString(entry.title);
			const url = asString(entry.url);
			const group = asString(entry.group);
			const description =
				asString(entry.description) ??
				asString(asRecord(data.meta)?.description);
			return [title ?? asString(data.name) ?? id, url, group, description]
				.filter(Boolean)
				.join(" — ");
		}),
	);

	return makeChunkedSections("Docs directory", lines, "directory", 60);
}

async function glossaryLandingSections(): Promise<RawSection[]> {
	const files = await fg("*.{yaml,yml,json}", {
		cwd: "src/content/glossary",
		absolute: true,
	});
	const lines: string[] = [];
	for (const file of files.sort()) {
		const raw = await readFile(file, "utf8");
		const data = asRecord(parseYaml(raw)) ?? {};
		const product = asString(data.productName);
		for (const item of asArray(data.entries)) {
			const entry = asRecord(item) ?? {};
			const term = asString(entry.term);
			const definition = asString(entry.general_definition);
			if (term) {
				lines.push([term, product, definition].filter(Boolean).join(" — "));
			}
		}
	}
	return makeChunkedSections("Glossary", lines, "glossary", 80);
}

function collectPlanLines(value: unknown, path: string[] = []): string[] {
	const record = asRecord(value);
	if (!record) return [];
	const title = asString(record.title);
	const link = asString(record.link);
	const availability = asRecord(asRecord(record.properties)?.availability);
	const summary = asString(availability?.summary);
	const lines =
		title && path.length > 0
			? [[title, link, summary].filter(Boolean).join(" — ")]
			: [];
	return [
		...lines,
		...Object.entries(record).flatMap(([key, nested]) =>
			key === "properties" ? [] : collectPlanLines(nested, [...path, key]),
		),
	];
}

async function plansLandingSections(): Promise<RawSection[]> {
	const data = (await readJsonFile("src/content/plans/index.json")) ?? {};
	const sections = Object.entries(asRecord(data) ?? {}).map(
		([key, category]) => {
			const record = asRecord(category) ?? {};
			const title = asString(record.title) ?? key;
			const lines = collectPlanLines(category);
			return {
				anchor: slugifyHeading(title),
				heading: title,
				text: [title, ...lines.map((line) => `- ${line}`)].join("\n"),
			};
		},
	);
	return makeSections(sections);
}

async function resourcesLandingSections(): Promise<RawSection[]> {
	const streamFiles = await fg("**/index.{yaml,yml,json}", {
		cwd: "src/content/stream",
		absolute: true,
	});
	const videoLines = await Promise.all(
		streamFiles.sort().map(async (file) => {
			const raw = await readFile(file, "utf8");
			const data =
				asRecord(file.endsWith(".json") ? JSON.parse(raw) : parseYaml(raw)) ??
				{};
			return [
				asString(data.title),
				`/videos/${asString(data.url)}/`,
				asString(data.description),
			]
				.filter(Boolean)
				.join(" — ");
		}),
	);
	return makeChunkedSections("Resources", videoLines, "resources", 40);
}

async function agentSetupSections(): Promise<RawSection[] | undefined> {
	const prompt = await readFile(
		"src/content/agent-setup/prompt.md",
		"utf8",
	).catch((error: NodeJS.ErrnoException) => {
		if (error.code === "ENOENT") return undefined;
		throw error;
	});
	const agentLines = AGENTS.map(
		({ name, vendor, description }) => `${name} by ${vendor}: ${description}`,
	);
	return makeSections([
		{
			anchor: "overview",
			heading: "Agent setup",
			text: [
				"Cloudflare provides Skills and MCP servers so coding agents can build on the Cloudflare platform.",
				...agentLines,
			].join("\n"),
		},
		{ anchor: "prompt", heading: "Setup prompt", text: prompt },
	]);
}

async function generatedLandingSectionsForPath(
	path: string,
): Promise<RawSection[] | undefined> {
	if (path === "/directory/") return directoryLandingSections();
	if (path === "/glossary/") return glossaryLandingSections();
	if (path === "/plans/") return plansLandingSections();
	if (path === "/resources/") return resourcesLandingSections();
	if (path === "/agent-setup/") return agentSetupSections();
	return undefined;
}

export const generatedLandingProcessor: ContentTransformer = {
	name: "generated-landing",
	transform: ({ path }) => generatedLandingSectionsForPath(path),
};
