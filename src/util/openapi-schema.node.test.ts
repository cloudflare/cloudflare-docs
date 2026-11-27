import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	test,
	vi,
} from "vitest";
import fs from "fs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";

const TEST_ROOT = await mkdtemp(join(tmpdir(), "openapi-schema-root-"));
const TEST_TMP = await mkdtemp(join(tmpdir(), "openapi-schema-tmp-"));
const TEST_SCHEMA_ROOT = join(
	TEST_TMP,
	"middlecache",
	"v1",
	"cloudflare-api-schemas",
);
const TEST_VERSIONS_DIR = join(TEST_SCHEMA_ROOT, "versions");
const TEST_ARCHIVES_DIR = join(TEST_SCHEMA_ROOT, "archives");
const TEST_LATEST_SOURCE = join(TEST_SCHEMA_ROOT, "latest-source.json");

// Hermetic overrides: the real getRepoRoot/getDotTmpPath resolve to the repo
// (and .tmp would collide with real dev caches), and the real download helper
// joins its destination with the real .tmp. Point both at temp dirs and stand
// in a minimal download helper with the same "skip if present, else fetch and
// validate" contract.
vi.mock("./custom-loaders", async (importOriginal) => {
	const actual = await importOriginal<typeof import("./custom-loaders")>();
	return {
		...actual,
		getRepoRoot: () => TEST_ROOT,
		getDotTmpPath: () => TEST_TMP,
		downloadToDotTempIfNotPresent: async (
			url: string,
			destinationPath: string,
			options: {
				validate?: (filePath: string) => Promise<void>;
			} = {},
		) => {
			const destination = join(TEST_TMP, destinationPath);
			if (fs.existsSync(destination)) {
				await options.validate?.(destination);
				return;
			}
			fs.mkdirSync(dirname(destination), { recursive: true });
			const response = await fetch(url);
			if (!response.ok) {
				throw new actual.HttpError(
					`Failed to download ${url}: HTTP ${response.status} ${response.statusText}`,
					response.status,
				);
			}
			fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
			await options.validate?.(destination);
		},
	};
});

const {
	fetchOpenApiSchema,
	getEffectiveSchemaId,
	getLockPath,
	getOpenApiJsonPath,
	getSchemaMode,
	readLock,
} = await import("./openapi-schema");

const SHA = "a".repeat(40);
const OTHER_SHA = "b".repeat(40);

const lockFixture = {
	sha: SHA,
	committed_at: "2026-09-25T19:12:28Z",
};

const writeLock = (lock: Record<string, unknown>) => {
	fs.writeFileSync(join(TEST_ROOT, "openapi.lock.json"), JSON.stringify(lock));
};

const buildSchemaArchive = (dir: string): { path: string; sha256: string } => {
	fs.rmSync(dir, { recursive: true, force: true });
	fs.mkdirSync(join(dir, "src"), { recursive: true });
	fs.writeFileSync(
		join(dir, "src", "openapi.json"),
		JSON.stringify({
			openapi: "3.0.3",
			info: { version: "4.0.0" },
			paths: {},
		}),
	);
	fs.writeFileSync(
		join(dir, "src", "openapi.yaml"),
		"openapi: 3.0.3\ninfo:\n  version: 4.0.0\n",
	);
	const result = spawnSync(
		"tar",
		[
			"-czf",
			join(dir, "openapi.tar.gz"),
			"-C",
			join(dir, "src"),
			"openapi.json",
			"openapi.yaml",
		],
		{ stdio: ["ignore", "ignore", "pipe"] },
	);
	if (result.status !== 0 || result.error) {
		throw new Error(
			`Failed to build fixture archive: ${result.stderr?.toString()}`,
		);
	}
	return {
		path: join(dir, "openapi.tar.gz"),
		sha256: createHash("sha256")
			.update(fs.readFileSync(join(dir, "openapi.tar.gz")))
			.digest("hex"),
	};
};

const COMMITTED_AT = "2026-09-25T19:12:28Z";

const versionManifest = (sha: string, archiveSha256: string) => ({
	openapi_version: "3.0.3",
	api_version: "4.0.0",
	path_count: 1,
	source_sha: sha,
	source_committed_at: COMMITTED_AT,
	files: {
		"openapi.tar.gz": { size_bytes: 1, sha256: archiveSha256 },
	},
});

/**
 * Stubbed middlecache. Serves the top-level manifest (pointing at `latestSha`),
 * `versions/{sha}/manifest.json` for each entry in `versions`, and the fixture
 * archive for any known version. Everything else 404s.
 */
const serveMiddlecache = ({
	versions,
	latestSha,
}: {
	versions: Record<string, { manifestSha?: string; sha256: string }>;
	latestSha?: string;
}) =>
	vi.fn(async (input: RequestInfo | URL) => {
		const href = String(input instanceof Request ? input.url : input);
		const path = new URL(href).pathname.replace(
			"/v1/cloudflare-api-schemas/",
			"",
		);
		if (path === "manifest.json" && latestSha) {
			return Response.json({
				source_sha: latestSha,
				source_committed_at: COMMITTED_AT,
			});
		}
		const match = path.match(/^versions\/([0-9a-f]{40})\/(.+)$/);
		const version = match && versions[match[1]];
		if (match && version) {
			if (match[2] === "manifest.json") {
				return Response.json(
					versionManifest(version.manifestSha ?? match[1], version.sha256),
				);
			}
			if (match[2] === "openapi.tar.gz") {
				return new Response(fs.readFileSync(fixtureArchive.path));
			}
		}
		return new Response("not found", { status: 404, statusText: "Not Found" });
	});

const fetchedPaths = (fetchMock: ReturnType<typeof serveMiddlecache>) =>
	fetchMock.mock.calls.map((call) =>
		new URL(String(call[0])).pathname.replace(
			"/v1/cloudflare-api-schemas/",
			"",
		),
	);

const fixtureArchive = { path: "", sha256: "" };

beforeAll(() => {
	const built = buildSchemaArchive(join(TEST_TMP, "__archive-fixture__"));
	fixtureArchive.path = built.path;
	fixtureArchive.sha256 = built.sha256;
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.unstubAllEnvs();
	fs.rmSync(TEST_SCHEMA_ROOT, { recursive: true, force: true });
});

afterAll(() => {
	fs.rmSync(TEST_ROOT, { recursive: true, force: true });
	fs.rmSync(TEST_TMP, { recursive: true, force: true });
});

describe("getSchemaMode", () => {
	test("defaults to pinned", () => {
		expect(getSchemaMode()).toBe("pinned");
	});

	test("follows OPENAPI_SCHEMA=latest", () => {
		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		expect(getSchemaMode()).toBe("latest");
	});

	test("any other value still pins", () => {
		vi.stubEnv("OPENAPI_SCHEMA", "pinned");
		expect(getSchemaMode()).toBe("pinned");
	});
});

describe("readLock", () => {
	test("reads a valid lock file", async () => {
		writeLock({ ...lockFixture, sha256: "c".repeat(64) });
		const lock = await readLock();
		expect(lock.sha).toBe(SHA);
		expect(lock.sha256).toBe("c".repeat(64));
	});

	test("exposes the lock path at the repo root", () => {
		expect(getLockPath()).toBe(join(TEST_ROOT, "openapi.lock.json"));
	});

	test("throws when the lock file is missing", async () => {
		fs.rmSync(join(TEST_ROOT, "openapi.lock.json"), { force: true });
		await expect(readLock()).rejects.toThrow(/lock file not found/);
	});

	test("throws on a malformed SHA", async () => {
		writeLock({ ...lockFixture, sha: "not-a-sha" });
		await expect(readLock()).rejects.toThrow(/invalid/);
	});

	test("throws on a malformed sha256", async () => {
		writeLock({ ...lockFixture, sha256: "xyz" });
		await expect(readLock()).rejects.toThrow(/invalid/);
	});

	test("throws on a malformed committed_at", async () => {
		writeLock({ ...lockFixture, committed_at: "last tuesday" });
		await expect(readLock()).rejects.toThrow(/invalid/);
	});
});

describe("getOpenApiJsonPath", () => {
	test("points at the pinned version's extraction directory", async () => {
		writeLock(lockFixture);
		expect(await getOpenApiJsonPath()).toBe(
			join(TEST_VERSIONS_DIR, SHA, "openapi.json"),
		);
	});

	test("points at the resolved latest version in latest mode", async () => {
		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		fs.mkdirSync(TEST_SCHEMA_ROOT, { recursive: true });
		fs.writeFileSync(
			TEST_LATEST_SOURCE,
			JSON.stringify({
				source_sha: OTHER_SHA,
				source_committed_at: COMMITTED_AT,
			}),
		);
		expect(await getOpenApiJsonPath()).toBe(
			join(TEST_VERSIONS_DIR, OTHER_SHA, "openapi.json"),
		);
	});

	test("throws in latest mode when nothing has been fetched", async () => {
		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		await expect(getOpenApiJsonPath()).rejects.toThrow(
			/no latest schema has been fetched/,
		);
	});
});

describe("getEffectiveSchemaId", () => {
	test("returns the pinned SHA", async () => {
		writeLock(lockFixture);
		expect(await getEffectiveSchemaId()).toBe(SHA);
	});

	test("returns the resolved latest SHA in latest mode", async () => {
		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		fs.mkdirSync(TEST_SCHEMA_ROOT, { recursive: true });
		fs.writeFileSync(
			TEST_LATEST_SOURCE,
			JSON.stringify({
				source_sha: OTHER_SHA,
				source_committed_at: COMMITTED_AT,
			}),
		);
		expect(await getEffectiveSchemaId()).toBe(OTHER_SHA);
	});

	test("falls back to a stable id when the latest source is unknown", async () => {
		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		expect(await getEffectiveSchemaId()).toBe("unknown");
	});
});

describe("fetchOpenApiSchema (pinned)", () => {
	test("downloads, verifies, and extracts without a manifest lookup when the lock has sha256", async () => {
		writeLock({ ...lockFixture, sha256: fixtureArchive.sha256 });
		const fetchMock = serveMiddlecache({
			versions: { [SHA]: { sha256: fixtureArchive.sha256 } },
		});
		vi.stubGlobal("fetch", fetchMock);

		const jsonPath = await fetchOpenApiSchema();

		expect(jsonPath).toBe(join(TEST_VERSIONS_DIR, SHA, "openapi.json"));
		expect(JSON.parse(fs.readFileSync(jsonPath, "utf8"))).toMatchObject({
			openapi: "3.0.3",
		});
		expect(fetchedPaths(fetchMock)).toEqual([`versions/${SHA}/openapi.tar.gz`]);
	});

	test("re-verifies a cached archive with no network access", async () => {
		writeLock({ ...lockFixture, sha256: fixtureArchive.sha256 });
		const fetchMock = serveMiddlecache({
			versions: { [SHA]: { sha256: fixtureArchive.sha256 } },
		});
		vi.stubGlobal("fetch", fetchMock);

		await fetchOpenApiSchema();
		fetchMock.mockClear();
		await fetchOpenApiSchema();

		expect(fetchMock).not.toHaveBeenCalled();
	});

	test("fails loudly when the archive does not match the lock's sha256", async () => {
		writeLock({ ...lockFixture, sha256: "d".repeat(64) });
		vi.stubGlobal(
			"fetch",
			serveMiddlecache({ versions: { [SHA]: { sha256: "d".repeat(64) } } }),
		);

		await expect(fetchOpenApiSchema()).rejects.toThrow(/sha256 mismatch/);
	});

	test("fails loudly when a cached archive was tampered with", async () => {
		writeLock({ ...lockFixture, sha256: fixtureArchive.sha256 });
		vi.stubGlobal(
			"fetch",
			serveMiddlecache({
				versions: { [SHA]: { sha256: fixtureArchive.sha256 } },
			}),
		);
		await fetchOpenApiSchema();

		fs.appendFileSync(join(TEST_ARCHIVES_DIR, `${SHA}.openapi.tar.gz`), "x");
		// The test download helper does not retry, so the corrupt cache must
		// surface as a sha256 failure rather than be silently re-used.
		await expect(fetchOpenApiSchema()).rejects.toThrow(/sha256 mismatch/);
	});

	test("verifies against the version manifest when the lock has no sha256", async () => {
		writeLock(lockFixture);
		const fetchMock = serveMiddlecache({
			versions: { [SHA]: { sha256: fixtureArchive.sha256 } },
		});
		vi.stubGlobal("fetch", fetchMock);

		const jsonPath = await fetchOpenApiSchema();

		expect(JSON.parse(fs.readFileSync(jsonPath, "utf8"))).toMatchObject({
			info: { version: "4.0.0" },
		});
		expect(fetchedPaths(fetchMock)).toEqual([
			`versions/${SHA}/manifest.json`,
			`versions/${SHA}/openapi.tar.gz`,
		]);
	});

	test("fails when the version manifest is mislabeled", async () => {
		writeLock(lockFixture);
		vi.stubGlobal(
			"fetch",
			serveMiddlecache({
				versions: {
					[SHA]: { manifestSha: OTHER_SHA, sha256: fixtureArchive.sha256 },
				},
			}),
		);

		await expect(fetchOpenApiSchema()).rejects.toThrow(/mislabeled/);
	});

	test("explains retention when the pinned snapshot is gone", async () => {
		writeLock({ ...lockFixture, sha256: fixtureArchive.sha256 });
		vi.stubGlobal("fetch", serveMiddlecache({ versions: {} }));

		const error = await fetchOpenApiSchema().catch((err: Error) => err);
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).message).toMatch(/expire after 365 days/);
		expect((error as Error).message).toMatch(/rebase onto production/);
		expect(String((error as Error).cause)).toMatch(/HTTP 404/);
	});

	test("explains retention when the lock has no sha256 and the manifest is gone", async () => {
		writeLock(lockFixture);
		vi.stubGlobal("fetch", serveMiddlecache({ versions: {} }));

		await expect(fetchOpenApiSchema()).rejects.toThrow(/expire after 365 days/);
	});
});

describe("fetchOpenApiSchema (latest)", () => {
	test("resolves the newest SHA, fetches that versioned snapshot, and records it", async () => {
		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		const fetchMock = serveMiddlecache({
			latestSha: OTHER_SHA,
			versions: { [OTHER_SHA]: { sha256: fixtureArchive.sha256 } },
		});
		vi.stubGlobal("fetch", fetchMock);

		const jsonPath = await fetchOpenApiSchema();

		expect(jsonPath).toBe(join(TEST_VERSIONS_DIR, OTHER_SHA, "openapi.json"));
		expect(fs.existsSync(jsonPath)).toBe(true);
		expect(fetchedPaths(fetchMock)).toEqual([
			"manifest.json",
			`versions/${OTHER_SHA}/manifest.json`,
			`versions/${OTHER_SHA}/openapi.tar.gz`,
		]);
		expect(JSON.parse(fs.readFileSync(TEST_LATEST_SOURCE, "utf8"))).toEqual({
			source_sha: OTHER_SHA,
			source_committed_at: COMMITTED_AT,
		});
		expect(await getOpenApiJsonPath()).toBe(jsonPath);
		expect(await getEffectiveSchemaId()).toBe(OTHER_SHA);
	});

	test("leaves pinned snapshots and cached archives intact", async () => {
		writeLock({ ...lockFixture, sha256: fixtureArchive.sha256 });
		vi.stubGlobal(
			"fetch",
			serveMiddlecache({
				latestSha: OTHER_SHA,
				versions: {
					[SHA]: { sha256: fixtureArchive.sha256 },
					[OTHER_SHA]: { sha256: fixtureArchive.sha256 },
				},
			}),
		);
		await fetchOpenApiSchema();

		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		await fetchOpenApiSchema();

		expect(fs.existsSync(join(TEST_VERSIONS_DIR, SHA, "openapi.json"))).toBe(
			true,
		);
		expect(
			fs.existsSync(join(TEST_ARCHIVES_DIR, `${SHA}.openapi.tar.gz`)),
		).toBe(true);
		expect(
			fs.existsSync(join(TEST_VERSIONS_DIR, OTHER_SHA, "openapi.json")),
		).toBe(true);
	});

	test("does not record a latest SHA when the snapshot fetch fails", async () => {
		vi.stubEnv("OPENAPI_SCHEMA", "latest");
		vi.stubGlobal(
			"fetch",
			serveMiddlecache({
				latestSha: OTHER_SHA,
				versions: { [OTHER_SHA]: { sha256: "d".repeat(64) } },
			}),
		);

		await expect(fetchOpenApiSchema()).rejects.toThrow(/sha256 mismatch/);
		expect(fs.existsSync(TEST_LATEST_SOURCE)).toBe(false);
	});
});
