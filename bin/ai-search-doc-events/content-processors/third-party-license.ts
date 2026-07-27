import type { ContentTransformer, RawSection } from "../types";
import { MAX_SECTION_TEXT_LENGTH, sha256, truncateText } from "../shared";
import { documentHeadings } from "./mdast";

function thirdPartyLicenseSections(
	pageTitle: string,
	description?: string,
	markdown?: string,
	isMdx = false,
): RawSection[] {
	const licenseListing = markdown
		? documentHeadings(markdown, isMdx)
		: undefined;
	const text = truncateText(
		[pageTitle, description, licenseListing].filter(Boolean).join("\n\n"),
		MAX_SECTION_TEXT_LENGTH,
	);

	return [
		{
			anchor: "",
			heading: pageTitle,
			text,
			hash: sha256(text),
		},
	];
}

export const thirdPartyLicenseProcessor: ContentTransformer = {
	name: "third-party-license",
	transform: ({ title, description, sourceMarkdown, sourceMarkdownPath }) =>
		thirdPartyLicenseSections(
			title,
			description,
			sourceMarkdown,
			sourceMarkdownPath?.endsWith(".mdx") ?? false,
		),
};
