import type { PatchFile } from "../types";

/** MDX components whose props or children are code. */
const CODE_COMPONENT =
	/<(TypeScriptExample|WranglerConfig|Code|PackageManagers|CURL|APIRequest)\b/;
/** Components that wrap a fenced block and end with a closing tag. */
const WRAPPER_COMPONENTS = new Set(["TypeScriptExample", "WranglerConfig"]);
const FENCE = /^\s*(`{3,}|~{3,})/;
const INLINE_CODE = /`[^`\n]*`/g;

interface SourceLine {
	line: number;
	text: string;
}

/**
 * Return the numbers of lines that belong to fenced code blocks or code
 * components, including their opening and closing lines.
 */
export function codeLineNumbers(lines: SourceLine[]): Set<number> {
	const code = new Set<number>();
	let fence: { char: string; length: number } | undefined;
	let componentEnd: RegExp | undefined;
	for (const { line, text } of lines) {
		if (fence) {
			code.add(line);
			const close = FENCE.exec(text);
			if (
				close &&
				close[1][0] === fence.char &&
				close[1].length >= fence.length &&
				text.trim() === close[1]
			)
				fence = undefined;
			continue;
		}
		const open = FENCE.exec(text);
		if (open) {
			code.add(line);
			fence = { char: open[1][0], length: open[1].length };
			continue;
		}
		if (componentEnd) {
			code.add(line);
			if (componentEnd.test(text)) componentEnd = undefined;
			continue;
		}
		// Component names inside inline code are prose, not usage.
		const prose = text.replace(INLINE_CODE, "");
		const component = CODE_COMPONENT.exec(prose);
		if (!component) continue;
		code.add(line);
		const name = component[1];
		const end = WRAPPER_COMPONENTS.has(name)
			? new RegExp(`</${name}>`)
			: new RegExp(`/>|</${name}>`);
		if (!end.test(prose.slice(component.index + component[0].length)))
			componentEnd = end;
	}
	return code;
}

/** Code line numbers of a whole MDX file. */
export function mdxCodeLines(text: string): number[] {
	return [
		...codeLineNumbers(
			text.split("\n").map((line, index) => ({ line: index + 1, text: line })),
		),
	];
}

/**
 * Code line numbers visible in a file's hunks. Each hunk is scanned on its
 * own, so a hunk that starts inside a code block is misread; use this only
 * when the head file is unavailable.
 */
export function hunkCodeLines(file: PatchFile): number[] {
	return file.hunks.flatMap((hunk) => [
		...codeLineNumbers(
			hunk.lines
				.filter((line) => line.kind !== "del")
				.map((line) => ({ line: line.newLine!, text: line.text })),
		),
	]);
}
