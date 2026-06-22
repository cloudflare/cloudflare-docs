/**
 * Non-blocking terminal-state probe for a workflow run.
 *
 * Performs a single Durable Streams *catch-up* read of `/runs/:runId`
 * (`offset=-1`, no `live`) and reports whether the run has reached a terminal
 * state — either a `run_end` event is present in the stream history, or the
 * stream is closed (`Stream-Closed: true`). Unlike `pollRun`, this never waits:
 * it answers "is this run done right now?" in one request, which is what the
 * scheduled watchdog needs.
 *
 * A `404` means the run record is gone/unknown (`found: false`); callers treat
 * that as indeterminate and fall back to age-based recovery.
 */

export interface RunTerminalState {
	/** True when a run_end event was seen or the stream is closed. */
	terminal: boolean;
	/** Whether the terminal run_end (if any) reported an error. */
	isError?: boolean;
	/** False when the run stream returned 404 (gone / never existed). */
	found: boolean;
}

export interface ReadRunTerminalStateOptions {
	runId: string;
	/** Origin only, e.g. https://example.com */
	baseUrl: string;
	headers: HeadersInit;
}

export async function readRunTerminalState(
	opts: ReadRunTerminalStateOptions,
): Promise<RunTerminalState> {
	const url = new URL(`/runs/${encodeURIComponent(opts.runId)}`, opts.baseUrl);
	url.searchParams.set("offset", "-1"); // catch-up read, full history, no live

	let res: Response;
	try {
		res = await fetch(url, { headers: opts.headers });
	} catch {
		// Transient network error — treat as not-yet-terminal; the next tick retries.
		return { terminal: false, found: true };
	}

	if (res.status === 404) return { terminal: false, found: false };
	if (!res.ok) return { terminal: false, found: true };

	const closed = res.headers.get("Stream-Closed") === "true";

	let sawRunEnd = false;
	let isError: boolean | undefined;
	try {
		const events = (await res.json()) as Array<{
			type?: string;
			isError?: boolean;
		}>;
		for (const event of events) {
			if (event.type === "run_end") {
				sawRunEnd = true;
				isError = event.isError;
			}
		}
	} catch {
		// Body parse failure — rely on the Stream-Closed header alone.
	}

	return { terminal: sawRunEnd || closed, isError, found: true };
}
