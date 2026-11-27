#!/usr/bin/env tsx

/**
 * Compare the pinned schema in openapi.lock.json against the newest versioned
 * snapshot published by middlecache, verify the new snapshot's archive sha256,
 * and rewrite the lock file.
 *
 * Outputs, for .github/workflows/bump-openapi-schema.yml:
 *   - $SUMMARY_PATH: JSON summary; `status` is "bumped", "up-to-date", or
 *     "skipped" (with a `reason`).
 *   - $PR_BODY_PATH: markdown PR body (only when status is "bumped"), with
 *     the operations added/removed upstream and any `<APIRequest>` in
 *     src/content that no longer resolves.
 * Either falls back to stdout when its env var is unset (local runs).
 *
 * Deliberately dependency-free (node builtins only, no repo imports) so the
 * workflow can run it via `pnpm dlx tsx` without installing the dependency
 * tree.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const SCHEMA_BASE = "v1/cloudflare-api-schemas";
const UPSTREAM_REPO = "https://github.com/cloudflare/api-schemas";
const REPO_ROOT = fileURLToPath(new URL("../", import.meta.url));
const LOCK_PATH = join(REPO_ROOT, "openapi.lock.json");
const CONTENT_DIR = join(REPO_ROOT, "src", "content");

const SHA_PATTERN = /^[0-9a-f]{40}$/;
const SHA256_PATTERN = /^[0-9a-f]{64}$/;
const HTTP_METHODS = ["get", "put", "post", "delete", "patch", "head"];
/** Keeps the PR body well under GitHub's 65,536-character limit. */
const MAX_LISTED_OPERATIONS = 100;

interface Lock {
	sha: string;
	sha256?: string;
	committed_at: string;
}

interface LatestManifest {
	source_sha: string;
	source_committed_at: string;
}

interface VersionManifest extends LatestManifest {
	path_count: number;
	api_version: string;
	files: { "openapi.tar.gz": { size_bytes: number; sha256: string } };
}

interface Snapshot {
	sha: string;
	manifest: VersionManifest;
	operations: Set<string>;
}

interface DocsReference {
	operation: string;
	file: string;
}

const snapshotUrl = (path: string) =>
	`${MIDDLECACHE_BASE_URL}${SCHEMA_BASE}/${path}`;

const shortSha = (sha: string) => sha.slice(0, 8);

const fetchOk = async (url: string): Promise<Response> => {
	// Request the identity encoding so middlecache serves the bytes as-is
	// rather than on-the-fly brotli.
	const response = await fetch(url, {
		headers: { "Accept-Encoding": "identity" },
		signal: AbortSignal.timeout(120_000),
	});
	if (!response.ok) {
		throw new Error(
			`Failed to fetch ${url}: HTTP ${response.status} ${response.statusText}`,
		);
	}
	return response;
};

const fetchLatestManifest = async (): Promise<LatestManifest> => {
	const manifest = await (await fetchOk(snapshotUrl("manifest.json"))).json();
	if (!SHA_PATTERN.test(String(manifest?.source_sha))) {
		throw new Error(
			`middlecache manifest.json reports no usable source_sha (${JSON.stringify(manifest?.source_sha)}) — is the versioned-snapshots pipeline deployed?`,
		);
	}
	if (Number.isNaN(Date.parse(String(manifest.source_committed_at)))) {
		throw new Error(
			`middlecache manifest.json reports no usable source_committed_at (${JSON.stringify(manifest.source_committed_at)}).`,
		);
	}
	return manifest;
};

const fetchVersionManifest = async (sha: string): Promise<VersionManifest> => {
	const manifest: VersionManifest = await (
		await fetchOk(snapshotUrl(`versions/${sha}/manifest.json`))
	).json();
	if (manifest.source_sha !== sha) {
		throw new Error(
			`middlecache manifest for ${sha} reports source_sha ${manifest.source_sha}; the snapshot is mislabeled.`,
		);
	}
	if (
		!SHA256_PATTERN.test(String(manifest.files?.["openapi.tar.gz"]?.sha256))
	) {
		throw new Error(`Version manifest for ${sha} has no usable sha256.`);
	}
	return manifest;
};

/** `METHOD /path` for every operation in an OpenAPI document. */
const listOperations = (openapi: {
	paths?: Record<string, Record<string, unknown>>;
}): Set<string> => {
	const operations = new Set<string>();
	for (const [path, item] of Object.entries(openapi.paths ?? {})) {
		for (const method of HTTP_METHODS) {
			if (item?.[method]) {
				operations.add(`${method.toUpperCase()} ${path}`);
			}
		}
	}
	return operations;
};

/**
 * Download the snapshot for `sha`, verify its archive against
 * `expectedSha256` (or the version manifest's), and list its operations.
 */
const loadSnapshot = async (
	sha: string,
	scratchDir: string,
	expectedSha256?: string,
): Promise<Snapshot> => {
	const manifest = await fetchVersionManifest(sha);
	const manifestSha256 = manifest.files["openapi.tar.gz"].sha256;
	if (expectedSha256 && expectedSha256 !== manifestSha256) {
		throw new Error(
			`Expected sha256 ${expectedSha256} for ${sha}, but its version manifest reports ${manifestSha256}. The snapshot may have been replaced — investigate before bumping.`,
		);
	}

	const dir = join(scratchDir, sha);
	fs.mkdirSync(dir, { recursive: true });
	const archivePath = join(dir, "openapi.tar.gz");
	const response = await fetchOk(snapshotUrl(`versions/${sha}/openapi.tar.gz`));
	await writeFile(archivePath, Buffer.from(await response.arrayBuffer()));

	const actualSha256 = createHash("sha256")
		.update(await readFile(archivePath))
		.digest("hex");
	if (actualSha256 !== manifestSha256) {
		throw new Error(
			`Downloaded archive sha256 for ${sha} (${actualSha256}) does not match its version manifest (${manifestSha256}).`,
		);
	}

	// The archive is verified above, and only the one named member is
	// extracted into a private scratch directory.
	const tar = spawnSync(
		"tar",
		["-xzf", archivePath, "-C", dir, "openapi.json"],
		{
			encoding: "utf8",
		},
	);
	if (tar.status !== 0 || tar.error) {
		throw new Error(
			`Could not extract openapi.json from the ${sha} snapshot: ${tar.stderr?.trim() || tar.error?.message}`,
		);
	}
	const openapi = JSON.parse(await readFile(join(dir, "openapi.json"), "utf8"));
	return { sha, manifest, operations: listOperations(openapi) };
};

const walkMdx = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return walkMdx(path);
		return entry.name.endsWith(".mdx") ? [path] : [];
	});

/**
 * Best-effort scan of `<APIRequest path="..." method="...">` usages. Every
 * current usage passes both as string literals; anything else is skipped and
 * still caught by the CI build.
 */
const scanDocsReferences = (): DocsReference[] => {
	const references: DocsReference[] = [];
	for (const file of walkMdx(CONTENT_DIR)) {
		const blocks = fs.readFileSync(file, "utf8").split("<APIRequest").slice(1);
		for (const block of blocks) {
			const path = block.match(/\spath="([^"]+)"/)?.[1];
			const method = block.match(/\smethod="([A-Z]+)"/)?.[1];
			if (path && method) {
				references.push({
					operation: `${method} ${path}`,
					file: relative(REPO_ROOT, file),
				});
			}
		}
	}
	return references;
};

const readCurrentLock = (): Lock | null => {
	let raw: string;
	try {
		raw = fs.readFileSync(LOCK_PATH, "utf8");
	} catch {
		return null;
	}
	const parsed = JSON.parse(raw) as Partial<Lock>;
	if (!parsed.sha || !SHA_PATTERN.test(parsed.sha)) {
		throw new Error(
			`openapi.lock.json has no usable sha (${JSON.stringify(parsed.sha)}) — fix or delete it before bumping.`,
		);
	}
	return parsed as Lock;
};

const commitLink = (sha: string) =>
	`[\`${shortSha(sha)}\`](${UPSTREAM_REPO}/commit/${sha})`;

const operationList = (title: string, operations: string[]): string[] => {
	if (operations.length === 0) return [];
	const listed = operations.slice(0, MAX_LISTED_OPERATIONS);
	const more = operations.length - listed.length;
	return [
		"<details>",
		`<summary>${title} (${operations.length})</summary>`,
		"",
		...listed.map((op) => `- \`${op}\``),
		...(more > 0 ? [`- …and ${more} more`] : []),
		"",
		"</details>",
		"",
	];
};

const renderBody = ({
	lock,
	next,
	previous,
	brokenReferences,
	referenceCount,
}: {
	lock: Lock | null;
	next: Snapshot;
	previous: Snapshot | null;
	brokenReferences: DocsReference[];
	referenceCount: number;
}): string => {
	const lines: string[] = ["## Summary", ""];

	if (lock?.sha === next.sha) {
		lines.push(
			`- Adds the verified archive sha256 to the existing pin ${commitLink(next.sha)}.`,
			"",
		);
	} else {
		lines.push(
			`- Pins \`openapi.lock.json\` to ${commitLink(next.sha)} (committed ${next.manifest.source_committed_at}).`,
		);
		if (lock) {
			lines.push(
				`- Previous pin: ${commitLink(lock.sha)} (committed ${lock.committed_at}).`,
				`- Upstream diff: ${UPSTREAM_REPO}/compare/${lock.sha}...${next.sha}`,
			);
		}
		lines.push("");

		const before = (value: string | number | undefined) =>
			previous ? String(value) : "n/a";
		lines.push(
			"## Schema changes",
			"",
			"| | Before | After |",
			"| --- | --- | --- |",
			`| API version | ${before(previous?.manifest.api_version)} | ${next.manifest.api_version} |`,
			`| Paths | ${before(previous?.manifest.path_count)} | ${next.manifest.path_count} |`,
			`| Operations | ${before(previous?.operations.size)} | ${next.operations.size} |`,
			"",
		);

		if (previous) {
			const added = [...next.operations]
				.filter((op) => !previous.operations.has(op))
				.sort();
			const removed = [...previous.operations]
				.filter((op) => !next.operations.has(op))
				.sort();
			lines.push(
				`- Operations added: ${added.length}`,
				`- Operations removed: ${removed.length}`,
				"",
				...operationList("Removed operations", removed),
				...operationList("Added operations", added),
			);
		} else if (lock) {
			lines.push(
				"The previous snapshot is no longer on middlecache, so operations added/removed could not be computed.",
				"",
			);
		}
	}

	lines.push("## Docs impact", "");
	if (brokenReferences.length === 0) {
		lines.push(
			`All ${referenceCount} \`<APIRequest>\` usages in \`src/content\` resolve against the new schema (best-effort scan; the CI build is authoritative).`,
			"",
		);
	} else {
		lines.push(
			`${brokenReferences.length} \`<APIRequest>\` usages do not resolve against the new schema. The build on this PR fails until they are updated:`,
			"",
			...brokenReferences
				.slice(0, MAX_LISTED_OPERATIONS)
				.map((ref) => `- \`${ref.operation}\` in \`${ref.file}\``),
			"",
		);
	}

	lines.push(
		"## Review",
		"",
		"- CI on this PR renders every `<APIRequest>` against the new schema.",
		"- If the build fails, fix the affected pages to match the upstream change. Do not revert the pin: snapshots expire after 365 days.",
		"- Needs a `@cloudflare/content-engineering` approval (`.github/CODEOWNERS`).",
		"",
	);
	return lines.join("\n");
};

const writeOutput = async (envVar: string, content: string) => {
	const path = process.env[envVar];
	if (path) {
		await writeFile(path, content, "utf8");
	} else {
		console.log(content);
	}
};

const finish = async (summary: Record<string, unknown>, body?: string) => {
	await writeOutput("SUMMARY_PATH", `${JSON.stringify(summary, null, 2)}\n`);
	if (body !== undefined) {
		await writeOutput("PR_BODY_PATH", body);
	}
};

const main = async (): Promise<void> => {
	const lock = readCurrentLock();
	const latest = await fetchLatestManifest();
	const newSha = latest.source_sha;

	if (lock?.sha === newSha && lock.sha256) {
		// Re-check the pin against middlecache weekly so a replaced snapshot
		// is noticed before a build trips over it.
		const manifest = await fetchVersionManifest(newSha);
		if (manifest.files["openapi.tar.gz"].sha256 !== lock.sha256) {
			throw new Error(
				`openapi.lock.json sha256 (${lock.sha256}) does not match the middlecache manifest for ${newSha} (${manifest.files["openapi.tar.gz"].sha256}). The pinned snapshot may have been replaced — investigate before updating the lock.`,
			);
		}
		console.log(`Lock is up to date (${newSha}).`);
		await finish({ status: "up-to-date", sha: newSha });
		return;
	}

	if (
		lock &&
		lock.sha !== newSha &&
		Date.parse(latest.source_committed_at) < Date.parse(lock.committed_at)
	) {
		console.warn(
			`middlecache's latest snapshot ${newSha} (committed ${latest.source_committed_at}) is older than the pin ${lock.sha} (committed ${lock.committed_at}); not downgrading.`,
		);
		await finish({
			status: "skipped",
			reason: "downgrade",
			sha: lock.sha,
			latest_sha: newSha,
		});
		return;
	}

	const scratchDir = await mkdtemp(join(tmpdir(), "openapi-bump-"));
	try {
		// Verify the new archive before pinning it, so a bad publish can never
		// enter the lock file.
		const next = await loadSnapshot(newSha, scratchDir);

		let previous: Snapshot | null = null;
		if (lock && lock.sha !== newSha) {
			try {
				previous = await loadSnapshot(lock.sha, scratchDir, lock.sha256);
			} catch (err) {
				console.warn(
					`Could not load the previous snapshot ${lock.sha} for the diff: ${(err as Error).message}`,
				);
			}
		}

		const references = scanDocsReferences();
		const brokenReferences = references.filter(
			(ref) => !next.operations.has(ref.operation),
		);

		const newLock: Lock = {
			sha: newSha,
			sha256: next.manifest.files["openapi.tar.gz"].sha256,
			committed_at: next.manifest.source_committed_at,
		};
		fs.writeFileSync(
			LOCK_PATH,
			`${JSON.stringify(newLock, null, "\t")}\n`,
			"utf8",
		);

		console.log(
			`Bumped lock: ${lock?.sha ?? "none"} -> ${newSha} (${brokenReferences.length} broken <APIRequest> usages)`,
		);
		await finish(
			{
				status: "bumped",
				old_sha: lock?.sha ?? null,
				new_sha: newSha,
				committed_at: next.manifest.source_committed_at,
				broken_references: brokenReferences.length,
			},
			renderBody({
				lock,
				next,
				previous,
				brokenReferences,
				referenceCount: references.length,
			}),
		);
	} finally {
		await rm(scratchDir, { recursive: true, force: true });
	}
};

main().catch((err: unknown) => {
	console.error(`Error: ${err instanceof Error ? err.message : err}`);
	process.exit(1);
});
