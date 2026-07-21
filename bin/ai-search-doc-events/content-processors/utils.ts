import type { RawSection } from "../types";
import {
	MAX_SECTION_TEXT_LENGTH,
	normalizeText,
	sha256,
	truncateText,
} from "../shared";

export function makeSections(
	sections: Array<{ anchor: string; heading: string; text?: string }>,
): RawSection[] {
	return sections
		.filter(
			(section): section is { anchor: string; heading: string; text: string } =>
				Boolean(section.text && normalizeText(section.text)),
		)
		.map((section) => {
			const text = truncateText(
				normalizeText(section.text),
				MAX_SECTION_TEXT_LENGTH,
			);
			return { ...section, text, hash: sha256(text) };
		});
}

export function makeChunkedSections(
	heading: string,
	lines: string[],
	anchorPrefix: string,
	chunkSize: number,
): RawSection[] {
	const sections = [];
	for (let index = 0; index < lines.length; index += chunkSize) {
		const chunk = lines.slice(index, index + chunkSize);
		sections.push({
			anchor:
				index === 0 ? anchorPrefix : `${anchorPrefix}-${index / chunkSize + 1}`,
			heading: index === 0 ? heading : `${heading} ${index / chunkSize + 1}`,
			text: [heading, ...chunk.map((line) => `- ${line}`)].join("\n"),
		});
	}
	return makeSections(sections);
}
