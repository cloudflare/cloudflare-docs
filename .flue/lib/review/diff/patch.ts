import type { PatchHunk, PatchLine } from "../types";

const HUNK_HEADER = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;

/** Parse GitHub's unified patch representation into numbered hunks. */
export function parsePatch(patch: string): PatchHunk[] {
	const hunks: PatchHunk[] = [];
	let hunk: PatchHunk | undefined;
	let oldLine = 0;
	let newLine = 0;

	const rows = patch.replaceAll("\r\n", "\n").split("\n");
	for (const [rowIndex, raw] of rows.entries()) {
		if (rowIndex === rows.length - 1 && raw === "") continue;
		const header = raw.match(HUNK_HEADER);
		if (header) {
			oldLine = Number(header[1]);
			newLine = Number(header[2]);
			hunk = { header: raw, oldStart: oldLine, newStart: newLine, lines: [] };
			hunks.push(hunk);
			continue;
		}
		if (!hunk || raw === "\\ No newline at end of file") continue;

		let line: PatchLine;
		if (raw.startsWith("+")) {
			line = { kind: "add", newLine, text: raw.slice(1) };
			newLine++;
		} else if (raw.startsWith("-")) {
			line = { kind: "del", oldLine, text: raw.slice(1) };
			oldLine++;
		} else {
			line = {
				kind: "ctx",
				oldLine,
				newLine,
				text: raw.startsWith(" ") ? raw.slice(1) : raw,
			};
			oldLine++;
			newLine++;
		}
		hunk.lines.push(line);
	}

	return hunks;
}
