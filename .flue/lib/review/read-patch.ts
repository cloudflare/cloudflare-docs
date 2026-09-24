import { defineTool, type ToolDefinition } from "@flue/runtime";
import * as v from "valibot";
import { formatFilePatch } from "./diff/format";
import { readPatchArtifactName, type ReadPatchArtifact } from "./agent-input";
import { getRunArtifact } from "./state";
import type { Specialist, SpecialistTarget } from "./types";

const MAX_CHARS = 40_000;

export interface LoadedPatch {
	file: ReadPatchArtifact["file"];
	target: SpecialistTarget;
}

export interface ReadPatchLoader {
	load(path: string): Promise<LoadedPatch | null>;
}

export function makeReadPatchTool({ load }: ReadPatchLoader): ToolDefinition {
	return defineTool({
		name: "read_patch",
		description:
			"Read the complete patch for one path from the supplied file index. Use the returned cursor to continue until there is no next cursor.",
		timeoutMs: 30_000,
		input: v.object({
			path: v.pipe(v.string(), v.minLength(1)),
			cursor: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
		}),
		async run({ data }) {
			const loaded = await load(data.path);
			if (!loaded)
				return {
					output: `Path ${JSON.stringify(data.path)} is not in the file index. Choose a path listed in <file_index>.`,
				};
			const page = formatFilePatch(
				loaded.file,
				loaded.target,
				data.cursor,
				MAX_CHARS,
			);
			return {
				output: {
					content: page.content,
					...(page.nextCursor === undefined
						? {}
						: { nextCursor: page.nextCursor }),
				},
			};
		},
	});
}

export interface R2ReadPatchLoaderOptions {
	bucket: R2Bucket;
	pr: number;
	runId: string;
	specialist: Specialist | "judge";
	paths?: string[];
	getArtifact?: typeof getRunArtifact;
}

export function makeR2ReadPatchLoader({
	bucket,
	pr,
	runId,
	specialist,
	paths,
	getArtifact = getRunArtifact,
}: R2ReadPatchLoaderOptions): ReadPatchLoader {
	const indexedPaths = paths ? new Set(paths) : undefined;
	return {
		async load(path) {
			if (indexedPaths && !indexedPaths.has(path)) return null;
			const artifact = await getArtifact<ReadPatchArtifact>(
				bucket,
				pr,
				runId,
				readPatchArtifactName(path),
			);
			if (!artifact) return null;
			const targetLines =
				specialist === "judge"
					? [...new Set(Object.values(artifact.targetLines).flat())].sort(
							(a, b) => a - b,
						)
					: (artifact.targetLines[specialist] ?? []);
			return {
				file: artifact.file,
				target: {
					specialist: specialist === "judge" ? "code" : specialist,
					lines: { [path]: targetLines },
					files: [path],
					fingerprints: {},
					estimatedTokens: 0,
				},
			};
		},
	};
}
