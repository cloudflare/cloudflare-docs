import type { PullRequestFile } from "../../github";
import type { FileStatus, PatchFile } from "../types";
import { parsePatch } from "./patch";

const IGNORED_PATH =
	/(^|\/)(pnpm-lock\.yaml|bun\.lock|package-lock\.json|yarn\.lock)$|\.lock$|^(dist|skills|node_modules)\/|(^|\/)\.wrangler\/|^src\/assets\/|\.(png|jpe?g|gif|svg|webp|ico|avif|woff2?|ttf|eot|mp4|webm|mov|pdf|zip|gz|tar|wasm|lockb)$/i;
const MINIFIED_OR_MAP = /\.min\.[^/]+$|\.map$/i;
const GENERATED = /@generated|do not edit|auto-generated/i;
const COMMENT = /^\s*(?:\/\/|#|\/\*|\*|<!--)/;

function hasGeneratedHeader(patch: string): boolean {
	return parsePatch(patch).some(
		(hunk) =>
			hunk.newStart === 1 &&
			hunk.lines.some(
				(line) =>
					line.newLine !== undefined &&
					line.newLine <= 10 &&
					line.kind !== "del" &&
					COMMENT.test(line.text) &&
					GENERATED.test(line.text),
			),
	);
}

function status(value: string): FileStatus {
	return [
		"added",
		"modified",
		"removed",
		"renamed",
		"copied",
		"changed",
		"unchanged",
	].includes(value)
		? (value as FileStatus)
		: "changed";
}

/** Classify a GitHub PR file before any specialist sees its patch. */
export function classifyFile(file: PullRequestFile): PatchFile {
	const base = {
		path: file.filename,
		previousPath: file.previous_filename,
		status: status(file.status),
		additions: file.additions,
		deletions: file.deletions,
		hunks: file.patch ? parsePatch(file.patch) : [],
	};
	if (file.status === "removed")
		return { ...base, disposition: "collapsed", reason: "deleted file" };
	if (file.status === "renamed" && file.changes === 0)
		return { ...base, disposition: "collapsed", reason: "rename only" };
	if (!file.patch)
		return {
			...base,
			disposition: "no-patch",
			reason: "patch omitted by GitHub (file too large)",
		};
	if (IGNORED_PATH.test(file.filename))
		return {
			...base,
			disposition: "excluded",
			reason: "excluded path or binary file",
		};
	if (MINIFIED_OR_MAP.test(file.filename))
		return {
			...base,
			disposition: "excluded",
			reason: "minified or source map file",
		};
	if (hasGeneratedHeader(file.patch))
		return { ...base, disposition: "excluded", reason: "generated file" };
	return { ...base, disposition: "reviewable" };
}
