import type { LineFingerprint, PatchFile } from "../types";
import { hash } from "../hash";

export function normalizeLine(value: string): string {
	return value.trim().replace(/\s+/g, " ");
}

/** Fingerprint each added line using its nearby post-change lines in the same hunk. */
export function addedLineFingerprints(
	file: PatchFile,
): Array<{ newLine: number; fingerprint: LineFingerprint }> {
	const result: Array<{ newLine: number; fingerprint: LineFingerprint }> = [];
	for (const hunk of file.hunks) {
		const newFileLines = hunk.lines.filter((line) => line.kind !== "del");
		for (let index = 0; index < newFileLines.length; index++) {
			const line = newFileLines[index];
			if (line.kind !== "add") continue;
			result.push({
				newLine: line.newLine!,
				fingerprint: hash(
					[
						file.path,
						normalizeLine(line.text),
						normalizeLine(newFileLines[index - 1]?.text ?? ""),
						normalizeLine(newFileLines[index + 1]?.text ?? ""),
					].join("\n"),
				),
			});
		}
	}
	return result;
}
