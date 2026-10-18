import {
	SPECIALISTS,
	type ActiveRun,
	type ReviewStateV2,
	type Specialist,
	type TrackedFinding,
} from "./types";

const PREFIX = "reviews/v2";
const FINGERPRINT_LIMIT = 200_000;

export function stateKey(pr: number): string {
	return `${PREFIX}/pr-${pr}/state.json`;
}

export function runArtifactKey(
	pr: number,
	runId: string,
	name: string,
): string {
	return `${PREFIX}/pr-${pr}/runs/${runId}/${name}`;
}

function legacyDisabledKey(pr: number): string {
	return `diffs/pr-${pr}/auto-review-disabled.json`;
}

export function emptyState(pr: number): ReviewStateV2 {
	return {
		version: 2,
		pr,
		reviewed: { code: [], style: [], conventions: [] },
		findings: [],
	};
}

function isState(value: unknown, pr: number): value is ReviewStateV2 {
	if (!value || typeof value !== "object") return false;
	const state = value as Partial<ReviewStateV2>;
	return (
		state.version === 2 &&
		state.pr === pr &&
		!!state.reviewed &&
		Array.isArray(state.findings) &&
		SPECIALISTS.every((specialist) =>
			Array.isArray(state.reviewed?.[specialist]),
		)
	);
}

export async function loadState(
	bucket: R2Bucket,
	pr: number,
): Promise<{ state: ReviewStateV2; etag: string | null }> {
	const object = await bucket.get(stateKey(pr));
	if (!object) return { state: emptyState(pr), etag: null };
	try {
		const value = await object.json();
		if (isState(value, pr)) return { state: value, etag: object.etag };
		console.warn(`Ignoring corrupt review state for PR #${pr}`);
	} catch {
		console.warn(`Ignoring unreadable review state for PR #${pr}`);
	}
	return { state: emptyState(pr), etag: object.etag };
}

export async function saveState(
	bucket: R2Bucket,
	pr: number,
	state: ReviewStateV2,
	expectedEtag: string | null,
): Promise<boolean> {
	const result = await bucket.put(stateKey(pr), JSON.stringify(state), {
		onlyIf: expectedEtag
			? { etagMatches: expectedEtag }
			: { etagDoesNotMatch: "*" },
	});
	return result !== null;
}

export async function updateState(
	bucket: R2Bucket,
	pr: number,
	fn: (state: ReviewStateV2) => ReviewStateV2 | Promise<ReviewStateV2>,
	maxAttempts = 3,
): Promise<ReviewStateV2 | null> {
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const { state, etag } = await loadState(bucket, pr);
		const next = await fn(state);
		if (await saveState(bucket, pr, next, etag)) return next;
	}
	return null;
}

export function claimActiveRun(
	state: ReviewStateV2,
	run: ActiveRun,
): { state: ReviewStateV2; superseded?: ActiveRun } {
	return {
		state: { ...state, activeRun: run },
		...(state.activeRun ? { superseded: state.activeRun } : {}),
	};
}

export function isActiveRun(state: ReviewStateV2, runId: string): boolean {
	return state.activeRun?.runId === runId;
}

export interface CommitRunInput {
	runId: string;
	headSha: string;
	completedAt: string;
	successfulSpecialists: Specialist[];
	reviewedFingerprints: Partial<Record<Specialist, string[]>>;
	findings: TrackedFinding[];
	conventionsInputHash?: string;
	commentsSeenThrough?: string;
	commentId?: number;
}

export function commitRun(
	state: ReviewStateV2,
	input: CommitRunInput,
): { state: ReviewStateV2; committed: boolean } {
	if (!isActiveRun(state, input.runId)) return { state, committed: false };
	const reviewed = { ...state.reviewed };
	for (const specialist of input.successfulSpecialists) {
		reviewed[specialist] = [
			...new Set([
				...reviewed[specialist],
				...(input.reviewedFingerprints[specialist] ?? []),
			]),
		].slice(-FINGERPRINT_LIMIT);
	}
	// Resolved findings are shown once (in this run's comment) and never
	// persisted; state only carries what a later run must reconcile.
	const findings = input.findings.filter(
		(finding) => finding.status !== "resolved",
	);
	return {
		committed: true,
		state: {
			...state,
			reviewed,
			findings,
			activeRun: undefined,
			lastCompleted: {
				runId: input.runId,
				headSha: input.headSha,
				completedAt: input.completedAt,
			},
			...(input.conventionsInputHash !== undefined
				? { conventionsInputHash: input.conventionsInputHash }
				: {}),
			...(input.commentsSeenThrough !== undefined
				? { commentsSeenThrough: input.commentsSeenThrough }
				: {}),
			...(input.commentId !== undefined ? { commentId: input.commentId } : {}),
		},
	};
}

export function releaseActiveRun(
	state: ReviewStateV2,
	runId: string,
): ReviewStateV2 {
	return isActiveRun(state, runId) ? { ...state, activeRun: undefined } : state;
}

export function resetForFullReview(state: ReviewStateV2): ReviewStateV2 {
	return {
		...state,
		reviewed: { code: [], style: [], conventions: [] },
		conventionsInputHash: undefined,
	};
}

export async function putRunArtifact(
	bucket: R2Bucket,
	pr: number,
	runId: string,
	name: string,
	value: unknown,
): Promise<void> {
	await bucket.put(runArtifactKey(pr, runId, name), JSON.stringify(value));
}

export async function getRunArtifact<T>(
	bucket: R2Bucket,
	pr: number,
	runId: string,
	name: string,
): Promise<T | null> {
	const object = await bucket.get(runArtifactKey(pr, runId, name));
	return object ? object.json<T>() : null;
}

export async function deleteRunArtifacts(
	bucket: R2Bucket,
	pr: number,
	runId: string,
): Promise<void> {
	const prefix = `${PREFIX}/pr-${pr}/runs/${runId}/`;
	let cursor: string | undefined;
	const keys: string[] = [];
	do {
		const page = await bucket.list({ prefix, cursor });
		keys.push(...page.objects.map((object) => object.key));
		cursor = page.truncated ? page.cursor : undefined;
	} while (cursor);
	await Promise.all(keys.map((key) => bucket.delete(key)));
}

export async function isAutoReviewDisabled(
	bucket: R2Bucket,
	pr: number,
): Promise<boolean> {
	return Boolean(await bucket.get(legacyDisabledKey(pr)));
}

export async function setAutoReviewDisabled(
	bucket: R2Bucket,
	pr: number,
	disabled: boolean,
): Promise<void> {
	if (disabled)
		await bucket.put(legacyDisabledKey(pr), JSON.stringify({ disabled: true }));
	else await bucket.delete(legacyDisabledKey(pr));
}
