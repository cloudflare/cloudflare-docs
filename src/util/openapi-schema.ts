/**
 * Download and extract the Cloudflare API OpenAPI schema from middlecache.
 *
 * Builds render `<APIRequest>` against a schema pinned by the repo-root
 * `openapi.lock.json` (an upstream `cloudflare/api-schemas` commit SHA plus
 * the snapshot's sha256), so schema changes land through a reviewed bump PR
 * instead of breaking every build at once. `bin/fetch-openapi.ts` — run from
 * the prebuild, `prebuild:incremental`, and predev hooks — downloads the
 * pinned snapshot and verifies its sha256.
 *
 * Set `OPENAPI_SCHEMA=latest` to render against the newest published snapshot
 * instead (escape hatch, not used in CI). Latest mode resolves the newest
 * snapshot's SHA from middlecache's top-level manifest and then fetches that
 * versioned snapshot exactly like a pin, so both modes share one verified
 * on-disk layout:
 *
 *   .tmp/middlecache/v1/cloudflare-api-schemas/
 *     archives/{sha}.openapi.tar.gz   downloaded archive (cache)
 *     versions/{sha}/openapi.json     extracted schema
 *     latest-source.json              SHA resolved by the last latest-mode fetch
 *
 * The effective schema id (pinned SHA, or the resolved latest SHA) feeds
 * Astro's incremental-build cacheKey in `src/pages/[...slug].astro` so a
 * schema bump invalidates cached pages whose curl examples are derived from it.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import * as z from "zod";

import {
	HttpError,
	downloadToDotTempIfNotPresent,
	extractTarGz,
	getDotTmpPath,
	getRepoRoot,
} from "./custom-loaders";

const MIDDLECACHE_BASE_URL = "https://middlecache.ced.cloudflare.com/";
const SCHEMA_BASE = "v1/cloudflare-api-schemas";

/** Snapshots older than this are expired by an R2 lifecycle rule. */
const SNAPSHOT_RETENTION_DAYS = 365;

const SHA_PATTERN = /^[0-9a-f]{40}$/;
const gitSha = z.string().regex(SHA_PATTERN);
const sha256Hex = z.string().regex(/^[0-9a-f]{64}$/);
const timestamp = z.iso.datetime({ offset: true });

const lockSchema = z.object({
	/** Upstream cloudflare/api-schemas commit SHA the build pins to. */
	sha: gitSha,
	/**
	 * sha256 of the pinned snapshot's openapi.tar.gz, set by
	 * `bin/bump-openapi-lock.ts` after verifying the archive. When present it
	 * is authoritative and the build needs no manifest lookup; when absent
	 * (a hand-edited pin) the version manifest supplies it.
	 */
	sha256: sha256Hex.optional(),
	/** Upstream commit time of the pinned SHA (RFC 3339). */
	committed_at: timestamp,
});

export type OpenApiLock = z.infer<typeof lockSchema>;

const versionManifestSchema = z.object({
	source_sha: gitSha,
	source_committed_at: timestamp,
	files: z.object({
		"openapi.tar.gz": z.object({
			size_bytes: z.number(),
			sha256: sha256Hex,
		}),
	}),
});

const latestSourceSchema = z.object({
	source_sha: gitSha,
	source_committed_at: timestamp,
});

type LatestSource = z.infer<typeof latestSourceSchema>;

export type SchemaMode = "pinned" | "latest";

export const getSchemaMode = (): SchemaMode =>
	process.env.OPENAPI_SCHEMA === "latest" ? "latest" : "pinned";

export const getLockPath = (): string =>
	join(getRepoRoot(), "openapi.lock.json");

/**
 * Read and validate the schema pin. Fails loudly in pinned mode (the default)
 * so a build never silently renders against an unintended schema.
 */
export const readLock = async (): Promise<OpenApiLock> => {
	const lockPath = getLockPath();

	let raw: string;
	try {
		raw = await readFile(lockPath, "utf8");
	} catch (cause) {
		throw new Error(`OpenAPI schema lock file not found at ${lockPath}.`, {
			cause,
		});
	}

	let json: unknown;
	try {
		json = JSON.parse(raw);
	} catch (cause) {
		throw new Error(`openapi.lock.json is not valid JSON (${lockPath}).`, {
			cause,
		});
	}

	const parsed = lockSchema.safeParse(json);
	if (!parsed.success) {
		throw new Error(`openapi.lock.json is invalid: ${parsed.error.message}`);
	}
	return parsed.data;
};

const schemaRoot = () => join(getDotTmpPath(), "middlecache", SCHEMA_BASE);
const versionDir = (sha: string) => join(schemaRoot(), "versions", sha);
// Outside versions/ so a leftover staging dir never looks like a snapshot.
const stagingDir = (sha: string) => join(schemaRoot(), ".staging", sha);
const latestSourcePath = () => join(schemaRoot(), "latest-source.json");

/** Relative to `.tmp/`, as `downloadToDotTempIfNotPresent` expects. */
const archiveDestination = (sha: string) =>
	`middlecache/${SCHEMA_BASE}/archives/${sha}.openapi.tar.gz`;

const readLatestSource = async (): Promise<LatestSource | undefined> => {
	try {
		return latestSourceSchema.parse(
			JSON.parse(await readFile(latestSourcePath(), "utf8")),
		);
	} catch {
		return undefined;
	}
};

/** Path of the extracted openapi.json for the active schema mode. */
export const getOpenApiJsonPath = async (): Promise<string> => {
	if (getSchemaMode() === "pinned") {
		return join(versionDir((await readLock()).sha), "openapi.json");
	}
	const latest = await readLatestSource();
	if (!latest) {
		throw new Error(
			`OPENAPI_SCHEMA=latest is set but no latest schema has been fetched (${latestSourcePath()} is missing). Run \`OPENAPI_SCHEMA=latest pnpm run fetch:assets\` first.`,
		);
	}
	return join(versionDir(latest.source_sha), "openapi.json");
};

/**
 * Stable identifier for the schema the build renders against: the pinned SHA,
 * or the SHA resolved by the last latest-mode fetch. "unknown" (only possible
 * in latest mode before `bin/fetch-openapi.ts` has ever succeeded) keeps the
 * cache key stable until the schema is fetched.
 */
export const getEffectiveSchemaId = async (): Promise<string> => {
	if (getSchemaMode() === "pinned") {
		return (await readLock()).sha;
	}
	return (await readLatestSource())?.source_sha ?? "unknown";
};

const sha256File = async (filePath: string): Promise<string> =>
	createHash("sha256")
		.update(await readFile(filePath))
		.digest("hex");

/** Fetch a middlecache JSON document and validate it against `schema`. */
const fetchManifest = async <T>(
	path: string,
	schema: z.ZodType<T>,
): Promise<T> => {
	const url = `${MIDDLECACHE_BASE_URL}${SCHEMA_BASE}/${path}`;
	// Request the identity encoding so middlecache serves the bytes as-is
	// rather than on-the-fly brotli (see downloadToDotTempIfNotPresent).
	const response = await fetch(url, {
		headers: { "Accept-Encoding": "identity" },
	});
	if (!response.ok) {
		throw new HttpError(
			`Failed to fetch ${url}: HTTP ${response.status} ${response.statusText}`,
			response.status,
		);
	}

	let json: unknown;
	try {
		json = await response.json();
	} catch (cause) {
		throw new Error(`${url} is not valid JSON.`, { cause });
	}

	const parsed = schema.safeParse(json);
	if (!parsed.success) {
		throw new Error(`${url} is invalid: ${parsed.error.message}`);
	}
	return parsed.data;
};

/** Resolve the archive sha256 for `sha` from its write-once version manifest. */
const fetchVersionSha256 = async (sha: string): Promise<string> => {
	const manifest = await fetchManifest(
		`versions/${sha}/manifest.json`,
		versionManifestSchema,
	);
	if (manifest.source_sha !== sha) {
		throw new Error(
			`middlecache manifest for ${sha} reports source_sha ${manifest.source_sha}; the snapshot is mislabeled.`,
		);
	}
	return manifest.files["openapi.tar.gz"].sha256;
};

/**
 * Extract an already-verified archive into a per-SHA staging directory and
 * promote it on success, so a failed extract or parse never leaves partial
 * files in the destination that could mask a fresh failure.
 */
const extractVerified = async (archivePath: string, sha: string) => {
	const staging = stagingDir(sha);
	const destination = versionDir(sha);

	await rm(staging, { recursive: true, force: true });
	try {
		await mkdir(staging, { recursive: true });
		await extractTarGz(archivePath, staging);
		void JSON.parse(await readFile(join(staging, "openapi.json"), "utf8"));
		await rm(destination, { recursive: true, force: true });
		await mkdir(dirname(destination), { recursive: true });
		await rename(staging, destination);
	} catch (err) {
		await rm(staging, { recursive: true, force: true });
		throw err;
	}
};

/**
 * Download (or re-verify the cached copy of) the snapshot for `sha`, check its
 * sha256, and extract it to `versions/{sha}/`.
 */
const fetchVersion = async (sha: string, expectedSha256: string) => {
	await downloadToDotTempIfNotPresent(
		`${MIDDLECACHE_BASE_URL}${SCHEMA_BASE}/versions/${sha}/openapi.tar.gz`,
		archiveDestination(sha),
		{
			validate: async (archivePath) => {
				const actual = await sha256File(archivePath);
				if (actual !== expectedSha256) {
					throw new Error(
						`sha256 mismatch for schema snapshot ${sha}: expected ${expectedSha256}, got ${actual}`,
					);
				}
				await extractVerified(archivePath, sha);
			},
		},
	);
};

const fetchPinnedSchema = async (): Promise<string> => {
	const lock = await readLock();
	try {
		// The lock's sha256 was verified against the archive by the bump job,
		// so a cached archive can be re-verified without any network access.
		await fetchVersion(
			lock.sha,
			lock.sha256 ?? (await fetchVersionSha256(lock.sha)),
		);
	} catch (err) {
		if (err instanceof HttpError && err.status === 404) {
			throw new Error(
				`Pinned OpenAPI snapshot ${lock.sha} (committed ${lock.committed_at}) is not on middlecache. Snapshots expire after ${SNAPSHOT_RETENTION_DAYS} days; if this branch is old, rebase onto production to pick up the current pin.`,
				{ cause: err },
			);
		}
		throw err;
	}
	return join(versionDir(lock.sha), "openapi.json");
};

const fetchLatestSchema = async (): Promise<string> => {
	const latest = await fetchManifest("manifest.json", latestSourceSchema);
	await fetchVersion(
		latest.source_sha,
		await fetchVersionSha256(latest.source_sha),
	);

	// Written last, and atomically, so getOpenApiJsonPath only ever points at
	// a fully extracted snapshot.
	const record: LatestSource = {
		source_sha: latest.source_sha,
		source_committed_at: latest.source_committed_at,
	};
	const tmpPath = `${latestSourcePath()}.tmp`;
	await writeFile(tmpPath, `${JSON.stringify(record, null, "\t")}\n`, "utf8");
	await rename(tmpPath, latestSourcePath());

	return join(versionDir(latest.source_sha), "openapi.json");
};

/**
 * Fetch (or re-verify) the schema for the active mode and return the path of
 * the extracted openapi.json. Downloads are cached in `.tmp` and verified on
 * every call, so a corrupted cache fails the build instead of rendering.
 */
export const fetchOpenApiSchema = async (): Promise<string> => {
	if (getSchemaMode() === "pinned") {
		return await fetchPinnedSchema();
	}
	return await fetchLatestSchema();
};
