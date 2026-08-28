import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import fs from "fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

import {
	downloadToDotTempIfNotPresent,
	extractTarGz,
	getDotTmpPath,
} from "./custom-loaders";

const dotTmpPath = getDotTmpPath();
const TEST_DIR = join(dotTmpPath, "middlecache", "__custom-loaders-test__");
const TEST_DEST = "middlecache/__custom-loaders-test__/file.txt";

const okResponse = (body: string) => new Response(body);
const errResponse = (status: number) => new Response("error", { status });

describe("downloadToDotTempIfNotPresent", () => {
	beforeEach(() => {
		fs.rmSync(TEST_DIR, { recursive: true, force: true });
	});

	afterEach(() => {
		fs.rmSync(TEST_DIR, { recursive: true, force: true });
		vi.unstubAllGlobals();
	});

	test("downloads and writes the file when fetch succeeds", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(okResponse("hello world")),
		);

		await downloadToDotTempIfNotPresent(
			"https://example.com/file.txt",
			TEST_DEST,
		);

		expect(fs.readFileSync(join(TEST_DIR, "file.txt"), "utf8")).toBe(
			"hello world",
		);
	});

	test("retries on HTTP error then succeeds", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(errResponse(500))
			.mockResolvedValueOnce(errResponse(500))
			.mockResolvedValueOnce(okResponse("ok"));
		vi.stubGlobal("fetch", fetchMock);

		await downloadToDotTempIfNotPresent(
			"https://example.com/file.txt",
			TEST_DEST,
		);

		expect(fetchMock).toHaveBeenCalledTimes(3);
		expect(fs.readFileSync(join(TEST_DIR, "file.txt"), "utf8")).toBe("ok");
	});

	test("throws after exhausting retries", async () => {
		const fetchMock = vi.fn().mockResolvedValue(errResponse(500));
		vi.stubGlobal("fetch", fetchMock);

		await expect(
			downloadToDotTempIfNotPresent("https://example.com/file.txt", TEST_DEST),
		).rejects.toThrow(/HTTP 500/);
		expect(fetchMock).toHaveBeenCalledTimes(3);
	});

	test("re-downloads when the validate callback rejects", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(okResponse("corrupt"))
			.mockResolvedValueOnce(okResponse("valid"));
		vi.stubGlobal("fetch", fetchMock);
		const validate = vi
			.fn()
			.mockRejectedValueOnce(new Error("corrupt file"))
			.mockResolvedValueOnce(undefined);

		await downloadToDotTempIfNotPresent(
			"https://example.com/file.txt",
			TEST_DEST,
			{
				validate,
			},
		);

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(fs.readFileSync(join(TEST_DIR, "file.txt"), "utf8")).toBe("valid");
	});

	test("retries when downloaded size mismatches content-length", async () => {
		const lengthMismatch = () => {
			// Real body ("abc", 3 bytes) but a fake content-length header (10).
			const res = new Response("abc");
			return {
				ok: true,
				status: 200,
				statusText: "OK",
				body: res.body,
				headers: { get: () => "10" },
			};
		};
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(lengthMismatch())
			.mockResolvedValueOnce(okResponse("ok"));
		vi.stubGlobal("fetch", fetchMock);

		await downloadToDotTempIfNotPresent(
			"https://example.com/file.txt",
			TEST_DEST,
		);

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(fs.readFileSync(join(TEST_DIR, "file.txt"), "utf8")).toBe("ok");
	});

	test("skips download when the file already exists and validates", async () => {
		fs.mkdirSync(TEST_DIR, { recursive: true });
		fs.writeFileSync(join(TEST_DIR, "file.txt"), "existing");
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		await downloadToDotTempIfNotPresent(
			"https://example.com/file.txt",
			TEST_DEST,
		);

		expect(fetchMock).not.toHaveBeenCalled();
	});

	test("re-downloads when an existing file fails validation", async () => {
		fs.mkdirSync(TEST_DIR, { recursive: true });
		fs.writeFileSync(join(TEST_DIR, "file.txt"), "stale");
		const fetchMock = vi.fn().mockResolvedValue(okResponse("fresh"));
		vi.stubGlobal("fetch", fetchMock);
		const validate = vi
			.fn()
			.mockRejectedValueOnce(new Error("bad file"))
			.mockResolvedValueOnce(undefined);

		await downloadToDotTempIfNotPresent(
			"https://example.com/file.txt",
			TEST_DEST,
			{
				validate,
			},
		);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fs.readFileSync(join(TEST_DIR, "file.txt"), "utf8")).toBe("fresh");
	});
});

describe("extractTarGz", () => {
	const FIXTURE = join(dotTmpPath, "middlecache", "__extract-test__");

	const buildFixture = () => {
		fs.mkdirSync(join(FIXTURE, "src", "skills", "skill-name"), {
			recursive: true,
		});
		fs.writeFileSync(
			join(FIXTURE, "src", "skills", "skill-name", "file.txt"),
			"content",
		);
		spawnSync(
			"tar",
			[
				"-czf",
				join(FIXTURE, "fixture.tar.gz"),
				"-C",
				join(FIXTURE, "src"),
				"skills",
			],
			{ stdio: "ignore" },
		);
	};

	beforeEach(() => {
		fs.rmSync(FIXTURE, { recursive: true, force: true });
	});

	afterEach(() => {
		fs.rmSync(FIXTURE, { recursive: true, force: true });
	});

	test("extracts without stripping components", async () => {
		buildFixture();
		const dest = join(FIXTURE, "out");

		await extractTarGz(join(FIXTURE, "fixture.tar.gz"), dest);

		expect(
			fs.readFileSync(join(dest, "skills", "skill-name", "file.txt"), "utf8"),
		).toBe("content");
	});

	test("strips leading components when stripComponents is set", async () => {
		buildFixture();
		const dest = join(FIXTURE, "out");

		await extractTarGz(join(FIXTURE, "fixture.tar.gz"), dest, {
			stripComponents: 1,
		});

		expect(fs.readFileSync(join(dest, "skill-name", "file.txt"), "utf8")).toBe(
			"content",
		);
	});

	test("throws on a corrupt archive", async () => {
		fs.mkdirSync(FIXTURE, { recursive: true });
		fs.writeFileSync(join(FIXTURE, "bad.tar.gz"), "not a gzip archive");

		await expect(
			extractTarGz(join(FIXTURE, "bad.tar.gz"), join(FIXTURE, "out")),
		).rejects.toThrow(/tar extraction failed/);
	});
});
