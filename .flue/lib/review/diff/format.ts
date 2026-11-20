import type { PatchFile, ReviewPlan, SpecialistTarget } from "../types";

function ranges(lines: number[]): string {
	return lines
		.reduce<string[]>((result, line) => {
			const previous = result.at(-1);
			if (previous && Number(previous.split("-").at(-1)) === line - 1)
				result[result.length - 1] = `${previous.split("-")[0]}-${line}`;
			else result.push(String(line));
			return result;
		}, [])
		.join(",");
}

function renderHunk(
	file: PatchFile,
	target: SpecialistTarget,
	hunkIndex: number,
): string {
	const targetLines = new Set(target.lines[file.path] ?? []);
	const hunk = file.hunks[hunkIndex];
	return [
		hunk.header,
		...hunk.lines.map((line) => {
			if (line.kind === "add")
				return `${targetLines.has(line.newLine!) ? "+" : "="} ${line.newLine} │ ${line.text}`;
			if (line.kind === "del") return `- (old ${line.oldLine}) │ ${line.text}`;
			return `  ${line.newLine} │ ${line.text}`;
		}),
	].join("\n");
}

/** Render the smallest useful diff for one specialist's targeted lines. */
export function formatTargetDiff(
	files: PatchFile[],
	target: SpecialistTarget,
): string {
	return files
		.filter((file) => target.files.includes(file.path))
		.map((file) => {
			const targetLines = new Set(target.lines[file.path]);
			const hunks = file.hunks
				.map((_, index) => index)
				.filter((index) =>
					file.hunks[index].lines.some(
						(line) => line.kind === "add" && targetLines.has(line.newLine!),
					),
				)
				.map((index) => renderHunk(file, target, index));
			return `### ${file.path} (${file.status}, +${file.additions} -${file.deletions})\n${hunks.join("\n\n")}`;
		})
		.join("\n\n");
}

export function formatFileIndex(files: PatchFile[], plan: ReviewPlan): string {
	return files
		.map((file) => {
			const targetLines = Object.values(plan.targets)
				.flatMap((target) => target?.lines[file.path] ?? [])
				.sort((a, b) => a - b);
			const suffix = targetLines.length
				? ` target: ${ranges(targetLines)}`
				: "";
			return `${file.path} (${file.status}, +${file.additions} -${file.deletions}; ${file.disposition}${suffix})`;
		})
		.join("\n");
}

/** Return a bounded page of a file patch for the read_patch tool. */
const CURSOR_FACTOR = 1_000_000;
const TRUNCATION = " ... [truncated]";

function clipLine(line: string, available: number): string {
	if (line.length <= available) return line;
	if (available <= TRUNCATION.length) return TRUNCATION.slice(0, available);
	return `${line.slice(0, available - TRUNCATION.length)}${TRUNCATION}`;
}

function encodeCursor(hunkIndex: number, lineOffset: number): number {
	return hunkIndex * CURSOR_FACTOR + lineOffset;
}

export function formatFilePatch(
	file: PatchFile,
	target: SpecialistTarget,
	cursor = 0,
	maxChars = 20_000,
): { content: string; nextCursor?: number } {
	const targetLines = new Set(target.lines[file.path] ?? []);
	let hunkIndex = Math.floor(cursor / CURSOR_FACTOR);
	let lineOffset = cursor % CURSOR_FACTOR;
	let content = clipLine(
		`### ${file.path} (${file.status}, +${file.additions} -${file.deletions})`,
		maxChars,
	);
	while (hunkIndex < file.hunks.length) {
		const hunk = file.hunks[hunkIndex];
		const header = `${hunk.header}${lineOffset > 0 ? " (continued)" : ""}`;
		if (content.length + 1 + header.length > maxChars) {
			return { content, nextCursor: encodeCursor(hunkIndex, lineOffset) };
		}
		content += `\n${header}`;
		for (; lineOffset < hunk.lines.length; lineOffset++) {
			const line = hunk.lines[lineOffset];
			const rendered =
				line.kind === "add"
					? `${targetLines.has(line.newLine!) ? "+" : "="} ${line.newLine} │ ${line.text}`
					: line.kind === "del"
						? `- (old ${line.oldLine}) │ ${line.text}`
						: `  ${line.newLine} │ ${line.text}`;
			const available = maxChars - content.length - 1;
			if (available <= 0) {
				return { content, nextCursor: encodeCursor(hunkIndex, lineOffset) };
			}
			// Move ordinary lines to the next page intact. Only a line that exceeds
			// the configured page cap itself is truncated.
			if (rendered.length > available && rendered.length <= maxChars) {
				return { content, nextCursor: encodeCursor(hunkIndex, lineOffset) };
			}
			content += `\n${clipLine(rendered, available)}`;
			if (rendered.length > available) {
				lineOffset++;
				return lineOffset < hunk.lines.length
					? { content, nextCursor: encodeCursor(hunkIndex, lineOffset) }
					: hunkIndex + 1 < file.hunks.length
						? { content, nextCursor: encodeCursor(hunkIndex + 1, 0) }
						: { content };
			}
		}
		hunkIndex++;
		lineOffset = 0;
	}
	return { content };
}
