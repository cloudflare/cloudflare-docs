import { appendFile, mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { Args, DiffPayload, PageChangeEvent } from "./types";

// HTTP responses worth retrying the whole batch POST for: transient network /
// backend errors that clear on retry. Matched against the status code (or the
// thrown error message for network failures).
const TRANSIENT_STATUS = new Set([429, 500, 502, 503, 504]);

function buildHeaders(args: Args): Headers {
	const tokenEnv = args.sendTokenEnv ?? "AI_SEARCH_REINDEX_TOKEN";
	const token = process.env[tokenEnv];
	const accessClientId = process.env.CF_ACCESS_CLIENT_ID;
	const accessClientSecret = process.env.CF_ACCESS_CLIENT_SECRET;
	const accessToken = process.env.CF_ACCESS_TOKEN;

	const headers = new Headers({ "Content-Type": "application/json" });
	if (token) headers.set("Authorization", `Bearer ${token}`);
	if (accessClientId && accessClientSecret) {
		headers.set("CF-Access-Client-Id", accessClientId);
		headers.set("CF-Access-Client-Secret", accessClientSecret);
	}
	if (accessToken) headers.set("cf-access-token", accessToken);
	return headers;
}

function payloadForBatch(
	payload: DiffPayload,
	events: PageChangeEvent[],
): DiffPayload {
	return { ...payload, events };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function readResumeCompleted(resumeFile?: string): Promise<Set<string>> {
	if (!resumeFile) return new Set();
	try {
		const contents = await readFile(resumeFile, "utf8");
		const done = new Set<string>();
		for (const line of contents.split("\n")) {
			const trimmed = line.trim();
			if (trimmed) done.add(JSON.parse(trimmed).path as string);
		}
		return done;
	} catch {
		return new Set();
	}
}

/** Run `worker` over `items` with at most `concurrency` in flight. */
async function runPool<T>(
	items: T[],
	concurrency: number,
	worker: (item: T) => Promise<void>,
): Promise<void> {
	let cursor = 0;
	const runners = Array.from(
		{ length: Math.min(concurrency, items.length) },
		async () => {
			while (cursor < items.length) {
				const index = cursor++;
				await worker(items[index]);
			}
		},
	);
	await Promise.all(runners);
}

/**
 * POST the diff payload to the reindex endpoint.
 *
 * The endpoint is an enqueue-only front door: it validates the payload,
 * pushes every event onto a Cloudflare Queue, and returns 202 Accepted without
 * waiting for the AI Search uploads. A queue consumer indexes the pages in the
 * background, with retries + a dead-letter queue handled natively by Queues.
 *
 * So this client only needs to guarantee delivery of the batch POST itself:
 * a 2xx (typically 202) means every event in the batch was enqueued, which we
 * treat as done. Transient HTTP/network failures retry the whole batch with
 * exponential backoff; with `--resume-file` we record enqueued pages so an
 * interrupted run resumes without re-enqueuing.
 */
export async function sendPayload(args: Args, payload: DiffPayload) {
	if (!args.sendUrl) return false;
	if (
		!Number.isInteger(args.batchSize) ||
		args.batchSize < 1 ||
		args.batchSize > 100
	) {
		throw new Error("batchSize must be an integer from 1 to 100");
	}

	const headers = buildHeaders(args);

	let events = payload.events;
	const completed = await readResumeCompleted(args.resumeFile);
	if (completed.size > 0) {
		events = events.filter((event) => !completed.has(event.path));
		console.log(
			`resume: skipping ${completed.size} already-enqueued pages, ${events.length} remaining`,
		);
	}
	if (events.length === 0) return true;

	if (args.resumeFile) {
		await mkdir(dirname(args.resumeFile), { recursive: true });
	}

	const url = args.sendUrl;
	const batches: PageChangeEvent[][] = [];
	for (let i = 0; i < events.length; i += args.batchSize) {
		batches.push(events.slice(i, i + args.batchSize));
	}

	const post = (batchEvents: PageChangeEvent[]) =>
		fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify(payloadForBatch(payload, batchEvents)),
			// Never follow redirects: a 3xx to an auth/login page (Cloudflare
			// Access) would otherwise resolve to 200 and look like success.
			redirect: "manual",
		});

	let ok = 0;
	let failedPages = 0;
	let done = 0;
	let batchesDone = 0;
	const total = events.length;
	const totalBatches = batches.length;
	const startedAt = Date.now();

	const pct = (n: number) =>
		total === 0 ? "100" : ((n / total) * 100).toFixed(1);

	console.log(
		`reindex enqueue: ${total} pages in ${totalBatches} batches ` +
			`(batch-size ${args.batchSize}, concurrency ${args.concurrency}) → ${url}`,
	);

	const markCompleted = async (batchEvents: PageChangeEvent[]) => {
		if (!args.resumeFile) return;
		const lines = batchEvents
			.map((event) => `${JSON.stringify({ path: event.path })}\n`)
			.join("");
		await appendFile(args.resumeFile, lines);
	};

	await runPool(batches, args.concurrency, async (batchEvents) => {
		for (let attempt = 0; attempt <= args.maxRetries; attempt++) {
			let status = 0;
			try {
				const response = await post(batchEvents);
				status = response.status;
				if (response.ok) {
					await markCompleted(batchEvents);
					ok += batchEvents.length;
					done += batchEvents.length;
					break;
				}
				throw new Error(`HTTP ${status}`);
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				const retriable = status === 0 || TRANSIENT_STATUS.has(status);
				if (attempt < args.maxRetries && retriable) {
					await sleep(Math.min(2 ** attempt * 1000, 30_000));
					continue;
				}
				for (const event of batchEvents) {
					console.error(`reindex enqueue failed (${event.path}): ${message}`);
					failedPages++;
					done++;
				}
				break;
			}
		}

		batchesDone++;
		const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
		const rate = done > 0 ? done / ((Date.now() - startedAt) / 1000) : 0;
		const remaining = rate > 0 ? Math.round((total - done) / rate) : 0;
		console.log(
			`reindex enqueue: batch ${batchesDone}/${totalBatches} | ` +
				`${done}/${total} pages (${pct(done)}%) | ` +
				`ok=${ok} failed=${failedPages} | ` +
				`${elapsed}s elapsed, ~${remaining}s left`,
		);
	});

	console.log(
		`reindex enqueue complete: ${ok}/${total} enqueued, ${failedPages} failed ` +
			`in ${((Date.now() - startedAt) / 1000).toFixed(0)}s`,
	);
	return failedPages === 0;
}
