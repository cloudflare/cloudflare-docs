/**
 * Redirect specialist workflow — no model
 *
 * A pure-TypeScript specialist dispatched by the code-review orchestrator. It
 * checks whether renamed or deleted docs pages have entries in
 * public/__redirects, and emits a warning for each old URL that is not covered.
 *
 * No model is called. Findings have stable, deterministic IDs (SHA-256 of the
 * old URL) so the finalize-review reconciler can resolve them automatically
 * when a redirect is added in a subsequent push.
 *
 * Redirect reconciliation is also deterministic — finalize does NOT send these
 * findings through the LLM reconciler. Resolved = previous IDs no longer in
 * the current active set. Acknowledged-by-author = not supported (an author
 * suppresses a redirect warning by adding the redirect, which auto-resolves
 * on the next run).
 *
 * Known limitation: pages with a frontmatter `slug:` override will have their
 * old URL derived from the file path, which may not match the actual URL if the
 * slug was customized. Custom slugs are rare in this repo; the trade-off of
 * fetching old frontmatter at the base ref is not worth the latency cost.
 *
 * POST /workflows/redirect-specialist  (internal — admitted by the orchestrator)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import {
	getInstallationToken,
	getPullRequestFiles,
	getRepoFileContent,
} from "../lib/github";
import type {
	CodeReviewResult,
	CodeReviewFinding,
} from "../lib/code-review-results";
import {
	type ReviewSpecialistPayload,
	parseReviewSpecialistPayload,
} from "../lib/review-specialist";
import {
	EXPECTED_STREAMS,
	degradedRedirectsResult,
	reportSpecialistResult,
} from "../lib/finalize-rendezvous";

export const route: WorkflowRouteHandler = async (_c, next) => next();

/** Derive a safe origin string from an optional request, returning "" on failure. */
function safeOrigin(req: Request | undefined): string {
	if (!req) return "";
	try {
		return new URL(req.url).origin;
	} catch {
		return "";
	}
}

// ── URL derivation ─────────────────────────────────────────────────────────────

/**
 * Convert a repo-relative file path under src/content/docs/ to its public URL
 * path (always has a leading and trailing slash).
 *
 * Examples:
 *   src/content/docs/workers/get-started.mdx        → /workers/get-started/
 *   src/content/docs/workers/get-started/index.mdx  → /workers/get-started/
 *   src/content/docs/index.mdx                      → /
 *
 * Known limitation: pages with a frontmatter `slug:` override will get a URL
 * derived from the file path rather than the actual slug. Custom slugs are
 * rare in this repo; fetching old frontmatter at the base ref is not worth
 * the added latency. See file-level comment.
 */
function pathToUrl(repoPath: string): string {
	// Strip the docs prefix. Guard: non-docs paths return "".
	const prefix = "src/content/docs/";
	if (!repoPath.startsWith(prefix)) return "";

	let rel = repoPath.slice(prefix.length);

	// index.mdx → directory URL
	if (rel === "index.mdx") return "/";
	if (rel.endsWith("/index.mdx")) {
		rel = rel.slice(0, -"/index.mdx".length);
		return `/${rel}/`;
	}

	// Regular page → strip extension and add trailing slash
	if (rel.endsWith(".mdx")) {
		rel = rel.slice(0, -".mdx".length);
	}
	return `/${rel}/`;
}

// ── Stable finding IDs ─────────────────────────────────────────────────────────

async function makeRedirectFindingId(oldUrl: string): Promise<string> {
	const encoder = new TextEncoder();
	const buf = await crypto.subtle.digest("SHA-256", encoder.encode(oldUrl));
	const hex = Array.from(new Uint8Array(buf))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return `RD-${hex.slice(0, 6)}`;
}

// ── Splat-aware redirect coverage ─────────────────────────────────────────────

/**
 * Parse the __redirects file into a list of source patterns.
 * Each non-comment, non-empty line has its first whitespace-delimited token
 * extracted as the source (the rest is destination and optional status code).
 */
function parseRedirectSources(content: string): string[] {
	return content
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !l.startsWith("#"))
		.map((l) => l.split(/\s+/)[0])
		.filter((s): s is string => typeof s === "string" && s.length > 0);
}

/**
 * Check whether an oldUrl is covered by the set of redirect source patterns.
 *
 * Coverage rules (bias: a shape we can't confidently parse is treated as
 * potentially covering so we never produce false positives):
 *
 *  1. Exact match: pattern === oldUrl
 *  2. Bare wildcard: pattern === "*"
 *  3. Trailing-splat: pattern ends with "/*" and the oldUrl starts with the
 *     pattern prefix (pattern without the "*"). E.g. "/workers/*" covers
 *     "/workers/get-started/".
 *  4. Ambiguous (contains ":" placeholders or other shapes we don't model):
 *     treat as potentially covering → do not flag.
 */
function isCovered(oldUrl: string, sources: string[]): boolean {
	for (const pattern of sources) {
		// 1. Exact
		if (pattern === oldUrl) return true;

		// 2. Bare wildcard
		if (pattern === "*") return true;

		// 3. Trailing splat: /foo/* covers /foo/ and /foo/bar/
		if (pattern.endsWith("/*")) {
			const prefix = pattern.slice(0, -1); // strip the "*", keep the "/"
			if (oldUrl.startsWith(prefix)) return true;
		}

		// 4. Ambiguous patterns (containing ":" path parameters or "?" query
		//    wildcards) — treat as potentially covering, skip.
		if (pattern.includes(":") || pattern.includes("?")) return true;
	}
	return false;
}

// ── Workflow entry point ───────────────────────────────────────────────────────

export async function run({
	id: runId,
	payload,
	env,
	req,
}: FlueContext): Promise<CodeReviewResult> {
	const input: ReviewSpecialistPayload = parseReviewSpecialistPayload(
		payload,
		"redirect-specialist",
	);
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	const baseUrl = input.baseUrl ?? safeOrigin(req);

	let result: CodeReviewResult = degradedRedirectsResult();
	let reviewOk = false;

	try {
		const token = await getInstallationToken(
			typedEnv as Record<string, string>,
		);

		// ── 1. Get PR file list ────────────────────────────────────────────────
		const files = await getPullRequestFiles(token, input.number);

		// ── 2. Find renamed / deleted docs pages ──────────────────────────────
		// For renames: previous_filename is the old path; filename is the new path.
		// For removals: filename is the old path (there is no new path).
		type Candidate = { oldPath: string; newPath: string | null };
		const candidates: Candidate[] = files
			.filter((f) => f.status === "renamed" || f.status === "removed")
			.filter((f) => {
				const oldPath =
					f.status === "renamed"
						? (f.previous_filename ?? f.filename)
						: f.filename;
				return /^src\/content\/docs\/.+\.mdx$/.test(oldPath);
			})
			.map((f) => ({
				oldPath:
					f.status === "renamed"
						? (f.previous_filename ?? f.filename)
						: f.filename,
				newPath: f.status === "renamed" ? f.filename : null,
			}));

		// ── 3. Compute old and new URLs, skip no-op moves ─────────────────────
		// A "rename" that changes only the file structure but not the URL
		// (e.g. foo.mdx → foo/index.mdx) does not need a redirect.
		const needsRedirectCheck = candidates.filter(({ oldPath, newPath }) => {
			const oldUrl = pathToUrl(oldPath);
			if (!oldUrl) return false; // non-docs path — skip
			if (newPath === null) return true; // removal always needs redirect
			const newUrl = pathToUrl(newPath);
			return newUrl !== oldUrl; // URL actually changed
		});

		const checkedOldPaths = needsRedirectCheck.map((c) => c.oldPath);

		console.log({
			message: `Redirect specialist started: PR #${input.number} — ${candidates.length} candidate(s), ${needsRedirectCheck.length} requiring redirect check`,
			event: "redirect_specialist",
			number: input.number,
			candidates: candidates.length,
			toCheck: needsRedirectCheck.length,
			runId,
			action: "started",
		});

		if (needsRedirectCheck.length === 0) {
			// No redirects needed — trivially ok.
			result = {
				findings: [],
				summary: "No renamed or deleted docs pages require redirect entries.",
				reviewedFiles: [],
			};
			reviewOk = true;
		} else {
			// ── 4. Fetch __redirects at the current head SHA ───────────────────
			const redirectsContent = await getRepoFileContent(
				token,
				"public/__redirects",
				input.headSha,
			);

			if (!redirectsContent) {
				// File missing or unreadable — degrade so finalize carries forward
				// prior findings rather than flooding with false positives.
				console.log({
					message: `Redirect specialist: public/__redirects not readable at ${input.headSha.slice(0, 7)} — degrading PR #${input.number}`,
					event: "redirect_specialist",
					number: input.number,
					headSha: input.headSha,
					runId,
					action: "redirects_file_unreadable",
				});
				// result and reviewOk remain at degraded defaults → ok:false persists.
			} else {
				// ── 5. Parse redirect sources ──────────────────────────────────
				const sources = parseRedirectSources(redirectsContent);

				// ── 6. Check each candidate ────────────────────────────────────
				const findings: CodeReviewFinding[] = [];
				for (const { oldPath, newPath } of needsRedirectCheck) {
					const oldUrl = pathToUrl(oldPath);
					if (!oldUrl) continue;

					if (!isCovered(oldUrl, sources)) {
						const id = await makeRedirectFindingId(oldUrl);
						const suggestion =
							newPath !== null
								? `Add \`${oldUrl} ${pathToUrl(newPath)} 301\` to \`public/__redirects\`.`
								: `Add \`${oldUrl} /new-destination/ 301\` to \`public/__redirects\`.`;
						findings.push({
							id,
							severity: "warning",
							path: oldPath,
							rule: "Missing redirect",
							evidence: `File moved or deleted but \`${oldUrl}\` has no entry in \`public/__redirects\`.`,
							suggestion,
						});
					}
				}

				result = {
					findings,
					summary:
						findings.length === 0
							? "All renamed/deleted docs pages have redirect entries."
							: `${findings.length} renamed/deleted docs page${findings.length === 1 ? " is" : "s are"} missing redirect entries in \`public/__redirects\`.`,
					reviewedFiles: checkedOldPaths,
				};
				reviewOk = true;

				console.log({
					message: `Redirect specialist complete: PR #${input.number} — ${findings.length} missing redirect(s)`,
					event: "redirect_specialist",
					number: input.number,
					findings: findings.length,
					checkedPaths: checkedOldPaths.length,
					runId,
					action: "complete",
				});
			}
		}
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Redirect specialist error (degraded): PR #${input.number} — ${errMsg}`,
			event: "redirect_specialist",
			number: input.number,
			error: errMsg,
			runId,
			action: "specialist_error_degraded",
		});
		// result and reviewOk keep their degraded defaults.
	}

	// ── Rendezvous: write final result, try to claim finalize lock ─────────────
	await reportSpecialistResult({
		bucket,
		env: typedEnv,
		baseUrl,
		dispatchId: input.dispatchId ?? "",
		prNumber: input.number,
		headSha: input.headSha,
		stream: "redirects",
		expectedStreams: input.expectedStreams ?? [...EXPECTED_STREAMS],
		ok: reviewOk,
		result,
		runId,
		eventName: "redirect_specialist",
	});

	return result;
}
