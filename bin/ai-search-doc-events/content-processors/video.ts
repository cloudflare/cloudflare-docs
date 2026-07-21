import { readFile } from "node:fs/promises";
import fg from "fast-glob";
import { parse as parseYaml } from "yaml";
import type { ContentTransformer, RawSection } from "../types";
import { normalizeText } from "../shared";
import { asRecord, asString, compactLine } from "./data";
import { makeSections } from "./utils";

function cleanVideoTranscript(transcript: string) {
	return transcript
		.replace(/WEBVTT/g, "")
		.replace(/\d{2}:\d{2}:\d{2}\.\d+\s+-->\s+\d{2}:\d{2}:\d{2}\.\d+/g, "")
		.replace(/^\s*\d+\s*$/gm, "")
		.replace(/<\/c>|<.+?>/g, "")
		.replace(/&nbsp;/g, " ")
		.split(/\n{2,}/)
		.map((part) => normalizeText(part.replace(/\n/g, " ")))
		.filter((part, index, parts) => part && part !== parts[index - 1])
		.join("\n");
}

async function videoSectionsForPath(
	path: string,
): Promise<RawSection[] | undefined> {
	const slug = path.match(/^\/videos\/([^/]+)\/$/)?.[1];
	if (!slug) throw new Error(`Invalid video path: ${path}`);

	const candidates = await fg(`**/${slug}/index.{yaml,yml,json}`, {
		cwd: "src/content/stream",
		absolute: true,
	});
	const sourceFile = candidates.sort()[0];
	if (!sourceFile) return undefined;

	const raw = await readFile(sourceFile, "utf8");
	const data =
		(asRecord(
			sourceFile.endsWith(".json") ? JSON.parse(raw) : parseYaml(raw),
		) as Record<string, unknown> | undefined) ?? {};
	const chapters = Object.entries(asRecord(data.chapters) ?? {}).map(
		([heading, time]) => `${String(time)} ${heading}`,
	);
	const transcript = asString(data.transcript);
	const title = asString(data.title) ?? slug;
	const text = [
		compactLine("Title", title),
		compactLine("Video ID", data.id),
		compactLine("Products", data.products),
		compactLine("Tags", data.tags),
		asString(data.description),
		chapters.length
			? ["Chapters", ...chapters.map((chapter) => `- ${chapter}`)].join("\n")
			: undefined,
		transcript ? `Transcript:\n${cleanVideoTranscript(transcript)}` : undefined,
	]
		.filter(Boolean)
		.join("\n\n");

	return makeSections([{ anchor: "", heading: title, text }]);
}

export const videoProcessor: ContentTransformer = {
	name: "video",
	transform: ({ path }) => videoSectionsForPath(path),
};
