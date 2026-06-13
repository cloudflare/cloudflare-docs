/**
 * Durable Streams run polling utility.
 *
 * Invokes a workflow in accepted mode, receives a runId,
 * then polls /runs/:runId via long-poll until run_end is observed or the
 * deadline is reached.
 *
 * This avoids holding a single long-lived synchronous subrequest open to a
 * child workflow DO. If the HTTP response path drops after the child completes,
 * the result is still readable from the durable stream.
 */

export interface RunEndEvent {
	type: "run_end";
	isError: boolean;
	result?: unknown;
	error?: { name?: string; message?: string };
	durationMs?: number;
}

export interface AdmitOptions {
	/** Base URL (origin only, e.g. https://example.com). */
	baseUrl: string;
	/** Path to POST, e.g. /workflows/spam-and-off-topic-filter */
	pathname: string;
	/** Headers to include (e.g. internal auth). */
	headers: HeadersInit;
	/** JSON-serialisable request body. */
	body: unknown;
}

export interface PollRunOptions {
	runId: string;
	baseUrl: string;
	headers: HeadersInit;
	/** Maximum ms to wait for run_end. Default: 5 minutes. */
	timeoutMs?: number;
	/** Optional label used in error messages. */
	label?: string;
}

export interface PollRunResult<T = unknown> {
	result: T | undefined;
	isError: boolean;
	error?: { name?: string; message?: string };
	durationMs?: number;
	timedOut?: boolean;
}

/**
 * Admit a workflow (fire-and-forget, accepted mode) and return the runId.
 * Throws if the admission request fails.
 */
export async function admitWorkflow(opts: AdmitOptions): Promise<string> {
	const url = new URL(opts.pathname, opts.baseUrl);
	const response = await fetch(url, {
		method: "POST",
		headers: opts.headers,
		body: JSON.stringify(opts.body),
	});

	if (!response.ok) {
		const body = await response.text().catch(() => "");
		throw new Error(
			`Workflow admission failed (${opts.pathname}): HTTP ${response.status} ${body}`,
		);
	}

	const admitted = (await response.json()) as { runId?: string };
	if (!admitted.runId) {
		throw new Error(`Workflow admission returned no runId (${opts.pathname})`);
	}

	return admitted.runId;
}

/**
 * Poll /runs/:runId via Durable Streams long-poll until run_end or timeout.
 * Each long-poll subrequest blocks for at most 30 s (Flue platform limit).
 * Returns a PollRunResult; never throws on run errors or timeouts — callers
 * decide how to handle them.
 */
export async function pollRun<T = unknown>(
	opts: PollRunOptions,
): Promise<PollRunResult<T>> {
	const timeoutMs = opts.timeoutMs ?? 5 * 60 * 1000;
	const deadline = Date.now() + timeoutMs;
	let offset = "-1";
	let isClosed = false;

	while (Date.now() < deadline && !isClosed) {
		const runsUrl = new URL(
			`/runs/${encodeURIComponent(opts.runId)}`,
			opts.baseUrl,
		);
		runsUrl.searchParams.set("offset", offset);
		if (offset !== "-1") {
			runsUrl.searchParams.set("live", "long-poll");
		}

		let res: Response;
		try {
			res = await fetch(runsUrl, { headers: opts.headers });
		} catch {
			// Transient network error — retry from same offset
			continue;
		}

		// 204 = long-poll timed out with no new events
		if (res.status === 204) {
			continue;
		}

		if (!res.ok) {
			// Non-retryable stream error
			break;
		}

		const nextOffset = res.headers.get("Stream-Next-Offset");
		if (nextOffset) offset = nextOffset;
		isClosed = res.headers.get("Stream-Closed") === "true";

		const events = (await res.json()) as unknown[];
		for (const raw of events) {
			const event = raw as { type?: string };
			if (event.type === "run_end") {
				const terminal = event as RunEndEvent;
				return {
					result: terminal.result as T | undefined,
					isError: terminal.isError,
					error: terminal.error,
					durationMs: terminal.durationMs,
				};
			}
		}
	}

	// Timed out or stream error without seeing run_end
	return {
		result: undefined,
		isError: false,
		timedOut: true,
	};
}
