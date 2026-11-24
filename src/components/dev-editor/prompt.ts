import type { EditableMode } from "./adapters";

export interface DevEditRecord {
	id: string;
	kind: string;
	mode?: EditableMode;
	codeLang?: string;
	sourcePath: string | null;
	isPartial: boolean;
	nearestHeading: string | null;
	componentContext?: readonly string[];
	original: string;
	current: string;
	note?: string;
}

export interface BuildEditPromptInput {
	pagePath: string;
	pageSourcePath: string | null;
	edits: readonly DevEditRecord[];
}

function formatCodeFence(value: string, lang = ""): string {
	const matches = value.match(/`{3,}/g);
	const maxRun = matches ? Math.max(...matches.map((r) => r.length)) : 2;
	const fence = "`".repeat(maxRun + 1);
	const body = value
		.split("\n")
		.map((line) => (line.length > 0 ? `     ${line}` : ""))
		.join("\n");
	return `     ${fence}${lang}\n${body}\n     ${fence}`;
}

function formatField(
	label: string,
	value: string,
	options: { isCode?: boolean; codeLang?: string } = {},
): string {
	if (options.isCode) {
		return `   - ${label}:\n${formatCodeFence(value, options.codeLang)}`;
	}
	if (!value.includes("\n")) {
		return `   - ${label}: ${value}`;
	}
	const indented = value
		.split("\n")
		.map((line) => (line.length > 0 ? `     ${line}` : ""))
		.join("\n");
	return `   - ${label}:\n${indented}`;
}

/**
 * Format pending in-browser text and code edits into a concise, unambiguous
 * prompt that an AI coding agent can apply to the underlying MDX source files.
 */
export function buildEditPrompt({
	pagePath,
	pageSourcePath,
	edits,
}: BuildEditPromptInput): string {
	if (edits.length === 0) return "";

	const headerLines = [
		`Apply the following copy edits made in the local docs preview for \`${pagePath}\`.`,
	];

	if (pageSourcePath) {
		headerLines.push(`Source file: \`${pageSourcePath}\``);
	}

	headerLines.push(
		"",
		"Preserve existing MDX syntax, components, links, frontmatter structure, and formatting conventions while applying these text changes.",
	);

	const items = edits.map((edit, index) => {
		const locationParts: string[] = [];
		if (edit.isPartial && edit.sourcePath) {
			locationParts.push(`in partial \`${edit.sourcePath}\``);
		}
		if (edit.nearestHeading) {
			locationParts.push(`under \`${edit.nearestHeading}\``);
		}
		if (edit.componentContext && edit.componentContext.length > 0) {
			const formattedComponents = edit.componentContext
				.map((c) => `\`${c}\``)
				.join(" > ");
			locationParts.push(`inside ${formattedComponents}`);
		}

		const locationSuffix =
			locationParts.length > 0 ? ` (${locationParts.join(", ")})` : "";

		const lines = [`${index + 1}. **${edit.kind}**${locationSuffix}`];
		const textChanged = edit.current !== edit.original;
		const note = edit.note?.trim() ?? "";
		const isCode = edit.mode === "code";

		if (textChanged) {
			lines.push(
				formatField("Before", edit.original, {
					isCode,
					codeLang: edit.codeLang,
				}),
			);
			lines.push(
				formatField("After", edit.current, {
					isCode,
					codeLang: edit.codeLang,
				}),
			);
		} else {
			lines.push(
				formatField("Current text", edit.original, {
					isCode,
					codeLang: edit.codeLang,
				}),
			);
		}

		if (note) {
			lines.push(formatField("Context", note));
		}

		return lines.join("\n");
	});

	return `${headerLines.join("\n")}\n\n${items.join("\n\n")}\n`;
}
