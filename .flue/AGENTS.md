# AGENTS.md — Flue

This directory contains the Flue-powered docs bot for `cloudflare-docs`, deployed as a Cloudflare Worker.

## Architecture

The bot is a single Cloudflare Worker (`cloudflare-docs-flue`) that reviews pull requests on `cloudflare/cloudflare-docs`. It runs three independent specialist reviews — **code review**, **conventions**, and **style-guide review** — and posts all three as one GitHub comment with `### Code Review`, `### Conventions`, and `### Style Guide Review` sections.

### Entry point and routing (`app.ts`)

- A Hono app mounts `flue()` at `/`. `registerProvider("cloudflare", …)` runs at module scope so the Workers AI binding + AI Gateway are configured in every isolate, including the per-agent Durable Objects that make model calls.
- `GET /health` is public.
- `requireInternalToken` guards `/runs/*` and `/workflows/*`. The one exception is `/workflows/orchestrate`, which GitHub calls directly — it verifies the webhook HMAC signature itself before doing any work.
- The internal auth header and helpers live in `lib/internal-auth.ts`; `getInternalHeaders` mints the header for worker-to-worker admits.

### Workflows (each is a Durable Object)

| Workflow (`workflows/`)        | DO class                             | Role                                                                                          |
| ------------------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------- |
| `orchestrate.ts`               | `FlueOrchestrateWorkflow`            | Webhook entry. Verifies signature, classifies the event, routes.                              |
| `spam-and-off-topic-filter.ts` | `FlueSpamAndOffTopicFilterWorkflow`  | Spam/off-topic gate for issues + PRs.                                                         |
| `code-review-orchestrator.ts`  | `FlueCodeReviewOrchestratorWorkflow` | **Dispatch-only**: limit check, placeholder, context → R2, admits all three specialists F&F.  |
| `code-review-specialist.ts`    | `FlueCodeReviewSpecialistWorkflow`   | Generic code-review fan-out (its own isolate).                                                |
| `style-guide-specialist.ts`    | `FlueStyleGuideSpecialistWorkflow`   | Style-guide fan-out (its own isolate).                                                        |
| `conventions-specialist.ts`    | `FlueConventionsSpecialistWorkflow`  | PR-level conventions check (title, description, scope) via a light AI session; findings use `CV-` ids. |
| `finalize-review.ts`           | `FlueFinalizeReviewWorkflow`         | Reconciles, renders, and posts the review comment (admitted by the last specialist to finish). |
| `dependabot-review.ts`         | `FlueDependabotReviewWorkflow`       | Separate review path for Dependabot PRs.                                                      |

Workflows are invoked in **accepted mode** via `admitWorkflow` (`lib/poll-run.ts`). The orchestrator admits all three specialists **fire-and-forget** (no poll). `pollRun` is only used for the spam filter (fast, needs a `closed` verdict before routing to code review).

### Request flow

1. GitHub → `POST /workflows/orchestrate`. Signature verified, then routed:
   - **Dependabot PR** (opened/reopened/synchronize/ready_for_review) → admit `dependabot-review` (skips the spam filter).
   - **Issue/PR opened/reopened/synchronize** (+ PR `ready_for_review`), non-Dependabot → admit `spam-and-off-topic-filter` and **poll** for its `closed` verdict. Codeowners skip the filter. If it closed the item, stop.
   - **PR** events that survive the filter → admit `code-review-orchestrator` **fire-and-forget** (no poll). Draft PRs are skipped unless the action is `ready_for_review`.
2. `code-review-orchestrator` (**dispatch-only**):
   - Enforces the **auto-review limit** (max 2 automatic reviews per PR, tracked in R2; `/ignore-review-limit` lifts it; codeowner commands bypass it).
   - Posts a "review in progress" placeholder comment (comment mode only).
   - Decides the **diff mode**: `incremental` (from the last reviewed head SHA to the current head) when a prior review exists, else `full`.
   - Writes `context.json` to the **R2 rendezvous namespace** (`diffs/pr-<n>/pending/<headSha>/<dispatchId>/`) containing everything `finalize-review` needs (diffMode, humanComments, previousReviewedSha, reviewMode, etc.) so the orchestrator's DO is not needed again.
    - Writes crash-protection **placeholder results** (`code.json`, `style.json`, `conventions.json` with `final:false`) so each stream key always exists in R2. Placeholders do NOT trigger finalize — `tryClaimFinalize` requires every stream to be `final:true`. Their purpose is to ensure R2 reads in finalize never return null due to a specialist being evicted before it could write anything.
    - Admits all three specialists **fire-and-forget** and returns immediately.
3. Each specialist runs in its **own DO** (own ~128 MB isolate):
   - Self-fetches its diff for the requested mode via `fetchFilesForDiffMode` (`lib/diff-fetch.ts`). Incremental is SHA-pinned via `comparePullRequestHeads` and is trusted **only** when the compare succeeds, its `status` is `ahead`/`identical`, and every file in the delta belongs to the PR's net diff. Otherwise it self-heals to the full PR diff. This covers all the ways `fromSha` stops being a clean ancestor of the head: the base SHA being gone (force-push + GC → 404), a rebase or force-push (`status: diverged`), and a `production` merge / "Update branch" that drags upstream files into the delta (`status: ahead` but the delta contains files outside the PR). Without this, a rebased/updated branch's incremental compare sweeps in every upstream commit it absorbed, and the review flags findings in files the PR never touched.
   - Selects eligible files; the code-review specialist fans out one session per file at bounded concurrency; the style-guide specialist stages the diff into a run-scoped Workspace path (`diffs/pr-<n>/runs/<runId>`) and fans out per-file sessions.
   - On completion (or any error), writes `{ok, result, final:true}` to its R2 rendezvous key (overwriting the placeholder), then calls `tryClaimFinalize`. The **last specialist** to write wins the atomic conditional-PUT lock and admits `finalize-review`.
   - If a specialist DO is hard-evicted before writing `final:true`, the sibling will not claim the lock (it checks `final:true`), leaving the review needing a `/review` retry — the accepted residual case.
4. `finalize-review`:
    - Reads `context.json` + all three stream results from R2.
    - **Head-guards**: skips posting if the PR head has moved on (newer push already owns the comment).
    - **Idempotency-guards** (comment mode only): skips if this headSha is already finalized, unless the existing comment is in a retryable state (`pending` placeholder or `failure`), which allows re-finalization.
    - **Reconciles** each stream separately against previous findings (from R2) and captured human comments. Degraded streams (`ok:false`) carry their previous findings forward as active rather than reconciling.
    - Persists `review-<headSha>.json` (`{ code, style, conventions }`) to R2, renders and posts (or logs) the comment, swaps 👀→👍 on trigger comments, and calls `markAutoReviewCompleted` if code and style both succeeded.
    - Cleans up the pending rendezvous namespace (`cleanupPending`).

### Per-file fan-out (`lib/code-review-inproc.ts`, `lib/style-guide-inproc.ts`)

- One named harness over the shell-sandbox Workspace (`connectors/cloudflare-shell.ts`), then one **detached session per changed file**, run with bounded concurrency (`withConcurrency`).
- **Each session is deleted in a `finally` as soon as its file finishes** (`session.delete()`), so peak heap is bounded to ~concurrency live sessions instead of growing with the file count. This is what fixed the specialist DO OOM.
- **Per-file sessions must be run-scoped and created fresh.** Specialist DOs are reused across workflow runs. If a run is hard-evicted before `finally` runs, its named sessions survive in the DO's SQLite. To prevent a new run from resuming stale session history from a prior run: (1) include `runId` in every session name (e.g. `` `${runId}:sg:${index}` ``), and (2) acquire sessions via `harness.sessions.create(name)` (throws if already exists) rather than `harness.session(name)` (silent get-or-create). The `create()` API makes any unexpected name collision loud rather than silently wrong.
- Caps: both fan-outs review at most **20** files (largest-diff-first) at **concurrency 5**. A single file's failure is caught and degraded to an empty result — it never aborts the pool. Per-file results are merged and deduped by finding id.
- **Code review** reviews _all_ changed text files (excluding lockfiles, `dist`/`skills`/`node_modules`, `.wrangler`, `src/assets`, and binary/image types). It emits `critical`/`warning`/`suggestion` severities with `CR-` ids and gives the model GitHub-API-backed tools (`read_repo_file` pinned to the PR head SHA, `search_repo`) so it can read full post-change file content for context — the diff patch alone is staged, but correctness review needs the surrounding code. The token stays in trusted code; only tool results cross into the sandbox. The repo's root `AGENTS.md` is fetched from the **PR base ref** (trusted, not head) and injected as agent `instructions`.
- **Style guide** reviews only `src/content/(docs|partials|changelog)/**.mdx`, emits `warning`/`suggestion` only, and uses the bundled `style-guide-review` skill and its reference tree.

### State, comment, and rendering

- **R2** (`DOCS_FLUE_BUCKET`) holds cross-run review state under `diffs/pr-<n>/`: `review-<headSha>.json` (`{ code: […], style: […], conventions: […] }`; a legacy bare array means style-only), `auto-review-count.json`, `ignore-review-limit.json`, `auto-review-disabled.json`. The staged diff lives in the specialist DO's Workspace filesystem, not R2. The **rendezvous namespace** `diffs/pr-<n>/pending/<headSha>/<dispatchId>/` is short-lived (context.json, code.json, style.json, conventions.json, finalize.lock) and deleted by `finalize-review` on completion.
- The bot keeps **one** comment per PR, located via the `BOT_COMMENT_MARKER` HTML comment. It embeds `reviewed-head-sha`, `reviewed-at`, and `status` markers used to detect prior state and to partition the human comments posted after it (`lib/code-review-state.ts`).
- `lib/code-review-render.ts` renders the single comment under a `## Review` heading: a status line, then a collapsed "Fix in your agent" prompt block (only when there is at least one active finding), then `### Code Review` (a beta-disclaimer note plus Critical/Warnings/Suggestions tables), `### Conventions`, `### Style Guide Review` (Warnings/Suggestions only), an "Acknowledged by author" block, and a Commands block. Findings are tables only — there are no inline review comments.
- **Models**: all model calls (reviews and reconciliation) use `cloudflare/@cf/moonshotai/kimi-k2.7-code`.
- **Review mode** (`DOCS_FLUE_REVIEW_MODE`): `log` (default) renders and logs the comment without mutating GitHub; `comment` posts/updates the bot comment.

### Slash commands (codeowner-only, commented on a PR)

- `/review` — run now (incremental if a prior review exists, else full); bypasses the auto-review limit.
- `/full-review` — re-review the entire diff from scratch (clears prior review JSONs); bypasses the limit.
- `/ignore-review-limit` — permanently lift the 2-review automatic cap for the PR.
- `/disable-auto-review` — stop push-triggered automatic reviews for the PR. Manual `/review` and `/full-review` still work.
- All commands swap 👀 → 👍 on the trigger comment when done.
- On Dependabot PRs, `/review` and `/full-review` route to `dependabot-review` instead.

### Bindings & migrations (`wrangler.jsonc`)

- Bindings: `AI` (Workers AI), `LOADER` (`worker_loaders`, backs the shell sandbox), `DOCS_FLUE_BUCKET` (R2). The AI Gateway id comes from `DOCS_FLUE_AI_GATEWAY_ID`.
- DO migrations: v1 initial classes; v2 Dependabot; v3 `Flue…`-prefix renames; v4 deleted the standalone style-guide workflow (its fan-out had moved in-process); v5 added the two specialist classes (the fan-outs split back into their own DOs for isolated memory budgets); v6 added `FlueFinalizeReviewWorkflow` (the new finalize-review workflow); v7 added `FlueConventionsSpecialistWorkflow` and `FlueRedirectSpecialistWorkflow`; v8 deleted `FlueRedirectSpecialistWorkflow` (redirect check removed from pipeline).

### Roles, build config, and dev/deploy scripts

- **Roles** (`roles/`): `cloudflare-docs-bot.md` holds the bot's identity and operating guidelines (stay scoped to cloudflare-docs, never leak internal info, be conservative and transparent). Flue auto-discovers the `roles/` directory at build time — it is not imported explicitly the way skills are.
- **Build config** (`flue.config.ts`): a one-line `defineConfig({ target: "cloudflare" })`. This is the Flue CLI build entry (`flue build` / `flue dev`).
- **Maintenance script** (`bin/clear-r2-pr-data.ts`): clears the `diffs/pr-<n>/` R2 state for a PR (or all PRs). Run against local dev state via the `flue:clear-r2-pr-data:local` script.
- **Repo-root scripts** (`package.json` at the repository root, not `.flue/package.json`): `flue:dev` (local dev with an 8 GB heap), `flue:dev:wrangler` (build + `wrangler dev --remote`), `flue:build`, `flue:deploy` (build + `wrangler deploy` with `--secrets-file .env`), `flue:clear-r2-pr-data:local`, and `flue:reset:local` (wipe local Durable Object + R2 dev state). Use these to develop and deploy the worker; the `flue docs` CLI below is only for reading Flue documentation.

## Reading Flue documentation

Use the installed Flue CLI for docs so guidance matches the version in `.flue/package.json`:

```bash
pnpm exec flue docs search "workflow routing"
pnpm exec flue docs read guide/workflows
pnpm exec flue docs read ecosystem/deploy/cloudflare
```

Do not rely on pre-trained Flue knowledge. Flue has changed substantially across the 0.5-0.11 releases.

## Flue Patterns

- Use the Hono `app.ts` pattern from current Flue docs: mount `flue()` explicitly and put auth middleware before `/workflows/*` and `/runs/*`.
- Keep GitHub webhook verification before privileged work. Sub-workflows should not be directly callable without an internal auth header.
- Protect `/runs/*`; run history can include payloads, model activity, logs, and errors.
- Workflows do not resume from checkpoints after Cloudflare Durable Object interruptions. Treat retries and external side effects as application-owned and idempotent.
- Scope temporary R2 diff/context data by run ID or head SHA. Do not key mutable in-flight context only by PR number, or concurrent reviews can mix state.
- Store durable review state separately from temporary run context. PR/head-scoped review JSON is okay; per-run patch manifests should be run-scoped.
- Prefer `log.info`, `log.warn`, and `log.error` from `FlueContext` for workflow facts that should appear in run history. Use `console.log` only for low-value runtime debugging.
- Keep model output structured with Valibot when trusted code consumes it. Skill instructions must match the schema exactly; do not ask for Markdown when the workflow expects JSON-like structured data.
- Keep side-effecting operations (GitHub labels, comments, close/update actions) in trusted TypeScript code, not in model tools.

## Testing

Pure, deterministic TypeScript functions in `.flue/lib/` — those that do not require AI, GitHub API calls, R2, or Workers bindings to exercise — should have Vitest unit tests. When adding or modifying trusted TS logic (rendering, state parsing, result merging, diff selection, concurrency utilities, webhook parsing, etc.), write or update tests in a matching `*.test.ts` file alongside the source. Run tests with `pnpm run test` from the `.flue/` directory.

Functions that require bindings (Durable Objects, R2, AI, the Flue harness) are not unit-testable in isolation and do not need tests; cover their logic paths through integration or by extracting the pure sub-functions and testing those.

## Review Rule Policy

Do not add agent review rules for issues that are already reliably caught by CI, including build failures, type checking, linting, link validation, and schema validation. Agent review rules should focus on style, clarity, maintainability, and conventions that CI cannot enforce.

Before adding a rule, verify whether the repository already catches the issue in CI. If it does, do not duplicate it in agent review output. For MDX/code structure checks, prefer AST-aware checks; avoid raw line pattern matching unless the rule explicitly ignores fenced code blocks and JSX component syntax.
