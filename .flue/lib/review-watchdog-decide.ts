/**
 * Pure decision logic for the code-review watchdog.
 *
 * Given a snapshot of an in-flight review (its age, the prior orchestrator
 * run's terminal state, whether the specialists finished, whether the review
 * was already delivered, and PR state), decide what the watchdog should do.
 *
 * This module has no I/O and only type imports, so it can be unit-tested in
 * isolation. All time, network, and storage access lives in review-watchdog.ts.
 *
 * Why three "dead" signals:
 *   - terminalDead: the orchestrator run reached a terminal state but never
 *     delivered the review — a cleanly errored/interrupted-then-terminalized run.
 *     Fast and unambiguous.
 *   - stalled: both specialists finished but the orchestrator made no further
 *     progress past a short grace. This catches the common failure where an
 *     interrupted orchestrator is never terminalized at all (so terminalDead
 *     never fires) — it recovers in minutes instead of waiting out the safety net.
 *   - aged: a final safety net for anything the first two miss (e.g. the run
 *     record is unreadable, or specialist IDs were never recorded).
 */

export interface WatchdogInputs {
	/** Current time (epoch ms). */
	now: number;
	/** When the in-flight run posted its placeholder (epoch ms). */
	startedAt: number;
	/** Retry attempt of the current (possibly dead) run; 0 = original. */
	attempt: number;
	/** True when the final review for this head SHA was already delivered. */
	delivered: boolean;
	/** True when the PR is closed or merged. */
	prClosed: boolean;
	/** Terminal state of the prior orchestrator run. */
	run: { terminal: boolean; found: boolean };
	/**
	 * Whether both specialists have reached a terminal state. `null` when their
	 * run IDs were never recorded (e.g. the orchestrator died before dispatch).
	 */
	specialistsTerminal: boolean | null;
	/** Grace period before the "specialists done but parent stalled" signal fires. */
	graceMs: number;
	/** Final safety-net age after which a still-undelivered review is retried. */
	maxAgeMs: number;
	/** Max retry attempts before giving up and surfacing a failure comment. */
	maxAttempts: number;
}

export type WatchdogAction =
	| { kind: "skip"; reason: string }
	| { kind: "clear"; reason: string }
	| { kind: "retry"; reason: string }
	| { kind: "giveup"; reason: string };

export function decideWatchdogAction(input: WatchdogInputs): WatchdogAction {
	// Already finished — drop a marker the success path failed to clear.
	if (input.delivered) {
		return { kind: "clear", reason: "review already delivered" };
	}
	// Don't auto-review closed/merged PRs; just drop the marker.
	if (input.prClosed) {
		return { kind: "clear", reason: "PR closed or merged" };
	}

	const age = input.now - input.startedAt;

	const terminalDead = input.run.found && input.run.terminal;
	const stalled = input.specialistsTerminal === true && age > input.graceMs;
	const aged = age > input.maxAgeMs;
	const dead = terminalDead || stalled || aged;

	if (!dead) {
		return { kind: "skip", reason: "prior run still in progress" };
	}

	const deadReason = terminalDead
		? "prior run terminated without delivering"
		: stalled
			? "specialists finished but orchestrator stalled"
			: "exceeded max age without delivery";

	if (input.attempt >= input.maxAttempts) {
		return { kind: "giveup", reason: `${deadReason}; retries exhausted` };
	}
	return { kind: "retry", reason: deadReason };
}
