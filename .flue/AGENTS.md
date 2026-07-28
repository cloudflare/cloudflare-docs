# AGENTS.md — Flue

This directory contains the Flue-powered docs bot for `cloudflare-docs`, deployed as a Cloudflare Worker. It is built on **Flue 2.0** (`@flue/runtime`, `@flue/vite`, `@flue/cli` — `0.4.0-nightly`).

## Architecture

The bot is a single Cloudflare Worker (`cloudflare-docs-flue`) that reviews pull requests on `cloudflare/cloudflare-docs`. It runs three independent specialist reviews — **code review**, **conventions**, and **style-guide review** — and posts all three as one GitHub comment with `### Code Review`, `### Conventions`, and `### Style Guide Review` sections. It also runs a spam/off-topic gate on new issues and PRs, a separate Dependabot review path, and a `/rebase` command.

The 2.0 design principle is **trusted code drives; the model only reasons.** Control flow lives in Cloudflare `WorkflowEntrypoint`s and plain TypeScript drivers. Each AI step is a Flue **agent** (a Durable Object) invoked via `init(Agent, { id }).dispatch().read()`. Agents never call GitHub or mutate state — they return structured data through a single `submit_*` tool, and trusted code performs every side effect.

### Entry point and routing

- **`app.ts`** — a Hono app. `setProvider(cloudflareBindingProvider({ binding: AI, gateway: … }))` runs at module scope so the Workers AI binding + AI Gateway are configured in every isolate, including the per-agent Durable Objects that make model calls. `GET /health` is public. `POST /webhooks/github` is the only ingress: it verifies the webhook HMAC signature, calls the pure `classifyWebhook`, and hands actionable events to `startReviewPipeline`. There are **no internal HTTP routes** — the orchestrators drive agents via bindings, not worker-to-worker HTTP — so there is no internal-auth middleware.
- **`lib/webhook-classify.ts`** — pure, unit-tested classification of the webhook payload into a routing decision (`classifyWebhook`, `isActionable`). No transport, no GitHub calls, no bindings.
- **`lib/pipeline-entry.ts`** — `startReviewPipeline`: the fast seam between the HTTP ingress and the durable pipeline. It kicks the right Workflow and returns immediately so the webhook always answers within GitHub's delivery timeout. Codeowner slash commands are handled inline (auth + reactions + kick/flag) because they are only a few sub-second API calls.

### Workflows (Cloudflare `WorkflowEntrypoint`s)

`ReviewOrchestrator` is defined in `cloudflare.ts`; the others live under `orchestrators/` and are re-exported from `cloudflare.ts`. The generated Worker entry does `export * from cloudflare.ts`, so every named export is surfaced for the `[[workflows]]` `class_name` bindings. Cloudflare Workflows are **not** Durable Objects and need no migration entry.

| Workflow (class)                                                           | Binding               | Role                                                                                                                                      |
| -------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ReviewOrchestrator` (`cloudflare.ts`)                                     | `REVIEW_ORCHESTRATOR` | The code-review pipeline: guards → gather-context → placeholder → 3 concurrent specialist steps → reconcile → publish → mark-auto-review. |
| `IngestWorkflow` (`orchestrators/ingest-workflow.ts`)                      | `INGEST`              | Spam/off-topic gate for issues + non-Dependabot PRs; kicks `REVIEW_ORCHESTRATOR` for a clean non-draft PR.                                |
| `DependabotReviewWorkflow` (`orchestrators/dependabot-review-workflow.ts`) | `DEPENDABOT_REVIEW`   | Separate review path for Dependabot PRs.                                                                                                  |
| `RebaseWorkflow` (`orchestrators/rebase-workflow.ts`)                      | `REBASE`              | The `/rebase` command: GitHub update-branch, AI-assisted conflict resolution, then re-trigger a full review.                              |

The specialist and reconcile Flue agents are driven from **inside** Workflow steps via the trusted drivers in `lib/run-*.ts`. Because the pipeline `awaits` each specialist as a durable step, there is no fire-and-forget admit, no poll, and no R2 rendezvous namespace — Workflow step durability provides the crash protection the 0.11 placeholder results + finalize lock used to.

### Agents (Flue `'use agent'` modules → Durable Objects)

Each agent is a `"use agent"` module whose default-export function uses hooks (`useModel`, `useSkill`, `useInitialData`, `useTool`, `useDataWriter`, `useAgentFinish`) and sets `.agentName`. The framework generates one Durable Object class per agent, named **`Flue<PascalCase(agentName)>Agent``. Per-run context (PR metadata, file content, head SHA) arrives as `initialData`; the GitHub installation token is **not** seeded through `initialData` — Flue records `initialData` durably in the DO's SQLite, so a short-lived credential would persist for the DO's lifetime. Instead, token-carrying agents mint the token in-DO from the Worker's GitHub App secrets via `getGitHubToken()` (`lib/token-provider.ts`), which calls `getInstallationToken(env)` from `cloudflare:workers` and caches with a soft TTL. Tools that need the token are built inside the render from that provider at a fixed length so the hook order is stable.

| Agent (`agents/`)             | agentName                | DO class                        | Driver (`lib/`)           |
| ----------------------------- | ------------------------ | ------------------------------- | ------------------------- |
| `code-review-file.ts`         | code-review-file         | FlueCodeReviewFileAgent         | run-code-review.ts        |
| `style-guide-file.ts`         | style-guide-file         | FlueStyleGuideFileAgent         | run-style-guide.ts        |
| `conventions-reviewer.ts`     | conventions-reviewer     | FlueConventionsReviewerAgent    | run-conventions-review.ts |
| `reconcile-reviewer.ts`       | reconcile-reviewer       | FlueReconcileReviewerAgent      | run-reconcile.ts          |
| `spam-filter.ts`              | spam-filter              | FlueSpamFilterAgent             | run-spam-filter.ts        |
| `dependabot-reviewer.ts`      | dependabot-reviewer      | FlueDependabotReviewerAgent     | run-dependabot-review.ts  |
| `rebase-conflict-resolver.ts` | rebase-conflict-resolver | FlueRebaseConflictResolverAgent | run-rebase-conflict.ts    |

### Structured output (the `submit_*` contract)

Every agent returns its result through exactly **one** Valibot-typed `submit_<name>` tool whose `run` hands the payload to a `useDataWriter(name, { schema })`. `useAgentFinish` enforces the call — if the model settles without submitting, it is appended a reminder and sent back to work. The driver reads `reply.data[name][0]` and re-validates with the same schema. There is no free-text parsing of model output, and the model has no other way to return a result.

### Request flow

1. GitHub → `POST /webhooks/github`. HMAC verified, classified, routed by `startReviewPipeline`:
   - **Codeowner slash command** → handled inline (see Slash commands).
   - **Dependabot PR event** (opened/reopened/synchronize/ready_for_review) → `DEPENDABOT_REVIEW.create({ number })` (skips the spam gate).
   - **Spam-filter event** (issue or non-Dependabot PR on opened/reopened/synchronize, or PR ready_for_review): a **codeowner** sender skips the gate and kicks `REVIEW_ORCHESTRATOR` directly for a non-draft PR; otherwise the event goes to `INGEST`.
2. `IngestWorkflow`: step `spam-filter` runs the spam agent and acts on a confident spam verdict (label + comment + close, all trusted TS); any error is treated as "not spam" so a transient failure never blocks a legitimate review. A clean, non-draft PR then gets `REVIEW_ORCHESTRATOR.create({ number })` (draft PRs are skipped unless the action is `ready_for_review`).
3. `ReviewOrchestrator` (durable steps):
   - **guards** — auto-review-disabled flag + the 2-review automatic cap (both R2). Codeowner commands bypass via `bypassReviewLimit`.
   - **gather-context** — fetch PR + comments; decide the **diff mode** (incremental from the last reviewed head SHA when a prior review exists, else full). `/full-review` wipes prior `review-*.json` so reconcile starts fresh.
   - **placeholder-comment** (comment mode only).
   - three **concurrent specialist steps** (`code-review`, `style-guide`, `conventions`): each self-fetches its diff (`fetchFilesForDiffMode`, incremental→full self-heal), selects files, and drives its agent(s). Any failure degrades to `{ ok: false }` — prior findings are carried forward rather than reconciled, so a degraded stream never falsely resolves findings.
   - **reconcile** — per stream, current findings against the previous review (from R2; a legacy bare array means style-only) and the human comments posted since. Conventions always reconciles in full-diff mode. Persists `review-<headSha>.json` (`{ code, style, conventions }`).
   - **publish** — head-guard (skip if a newer push owns the comment) + comment-mode idempotency-guard (skip if this head is already finalized unless the comment is pending/failure), render, post or log, swap 👀→👍 on the trigger comment.
   - **mark-auto-review** — consume an auto-review slot when code + style both succeeded on an automatic run.
4. `DependabotReviewWorkflow`: fetch PR + parse bumped packages → placeholder (comment mode) → drive the dependabot agent (degrade to a failure comment on error) → render + post/log + 👀→👍.
5. `RebaseWorkflow`: validate (must target `production`, must not be a fork) → GitHub update-branch (rebase). Clean → complete + trigger a full review. Conflict → `resolveConflictsWithAI` (drives the rebase-conflict agent) + `applyResolution` (Git Data API tree build with production-moved and PR-branch-moved guards) on high confidence, else halted-confidence. On success it re-triggers a fresh full review via `REVIEW_ORCHESTRATOR.create({ forceFullReview: true, bypassReviewLimit: true })`.

### Per-file fan-out

Code review and style-guide review fan out **one agent instance per changed file** — `init(Agent, { id: `${runId}:cr:${i}` })` — read concurrently with `withConcurrency` (cap 5, at most 20 files, largest-diff-first). Each instance is its own Durable Object, so peak heap is bounded by the DO model rather than the 0.11 `session.delete()` trick. A single file's failure degrades to an empty result and never aborts the pool; results are merged and deduped by finding id. Reconcile likewise runs one agent instance per stream (`${runId}:rc:{code|style|conventions}`).

- **Code review** reviews all changed text files (excluding lockfiles, `dist`/`skills`/`node_modules`, `.wrangler`, `src/assets`, and binary/image types). It emits `critical`/`warning`/`suggestion` severities with `CR-` ids and gives the model GitHub-API-backed tools (`read_repo_file` pinned to the PR head SHA, `search_repo`) so it can read full post-change file content. The token stays in trusted code; only tool results cross into the model. The repo root `AGENTS.md` is fetched from the PR **base** ref and injected as agent `instructions`.
- **Style guide** reviews only `src/content/(docs|partials|changelog)/**.mdx`, emits `warning`/`suggestion` only, and uses the bundled `style-guide-review` skill and its reference tree.

### State, comment, and rendering

- **R2** (`DOCS_FLUE_BUCKET`) holds cross-run review state under `diffs/pr-<n>/`: `review-<headSha>.json` (`{ code: […], style: […], conventions: […] }`; a legacy bare array means style-only), `auto-review-count.json`, `ignore-review-limit.json`, `auto-review-disabled.json`. There is **no rendezvous namespace** in 2.0 — Workflow step durability replaced the R2 finalize lock, and the diff is staged in agent memory / delivered via tools rather than R2.
- The bot keeps **one** comment per PR, located via the `BOT_COMMENT_MARKER` HTML comment. It embeds `reviewed-head-sha`, `reviewed-at`, and `status` markers used to detect prior state and to partition the human comments posted after it (`lib/code-review-state.ts`).
- `lib/code-review-render.ts` renders the single comment under a `## Review` heading: a status line, a collapsed "Fix in your agent" prompt block (only when there is an active finding), then `### Code Review`, `### Conventions`, `### Style Guide Review`, an "Acknowledged by author" block, and a Commands block. Findings are tables only; there are no inline review comments. It also renders the `/rebase` status line (`renderRebaseStatusUpdate`).
- **Models**: all model calls (reviews and reconciliation) use `cloudflare/@cf/moonshotai/kimi-k2.7-code`.
- **Review mode** (`DOCS_FLUE_REVIEW_MODE`): `log` (default) renders and logs the comment without mutating GitHub; `comment` posts/updates the bot comment.

### Slash commands (codeowner-only, commented on a PR)

Handled inline in `lib/pipeline-entry.ts`. Authorization is `getInstallationToken` + `isCodeOwner(token, GITHUB_ORG_TOKEN, sender)`; non-codeowners are ignored.

- `/review` — run now (incremental if a prior review exists, else full); bypasses the auto-review limit.
- `/full-review` — re-review the entire diff from scratch (clears prior review JSONs); bypasses the limit.
- `/ignore-review-limit` — permanently lift the 2-review automatic cap (R2 flag); 👍.
- `/disable-auto-review` — stop push-triggered automatic reviews (R2 flag); manual `/review` and `/full-review` still work; 👍.
- `/rebase` — kick `RebaseWorkflow`.
- On Dependabot PRs, `/review` and `/full-review` route to `DEPENDABOT_REVIEW` instead.
- All commands swap 👀 → 👍 on the trigger comment when done.

### Bindings & migrations (`wrangler.jsonc`)

- Bindings: `AI` (Workers AI), `DOCS_FLUE_BUCKET` (R2), and four `[[workflows]]` (`REVIEW_ORCHESTRATOR`, `INGEST`, `DEPENDABOT_REVIEW`, `REBASE`). The AI Gateway id comes from `DOCS_FLUE_AI_GATEWAY_ID`. `GITHUB_WEBHOOK_SECRET` and `GITHUB_ORG_TOKEN` (read:org, for codeowner checks) are required secrets.
- DO migrations: v1–v9 are the 0.11 history (kept so already-deployed workers migrate in order). **v10** is the Flue 2.0 reset: it deletes the retired `FlueRegistry` plus all nine 0.11 workflow DO classes and creates the **seven** per-agent SQLite DO classes the 2.0 build binds (`Flue<PascalCase(agentName)>Agent`). Every agent DO binding is created by v10. Validate the whole config with `wrangler deploy --dry-run --config dist/cloudflare_docs_flue/wrangler.json`.

### Roles, build config, and dev/deploy scripts

- **Roles** (`roles/`): `cloudflare-docs-bot.md` holds the bot's identity and operating guidelines. Flue 2.0 has **no** role auto-discovery (0.11's `flue()` mount used to inject `roles/` into every agent). The content is re-homed explicitly: `lib/bot-role.ts` imports the markdown as a string (a plain `.md` import loads verbatim), strips the YAML frontmatter, and exposes a `useBotRole()` hook that appends it via `useInstruction`. Every agent calls `useBotRole()` once, immediately after `useSkill(...)`, so the guidelines carry the same global scope they had in 0.11.
- **Build config** (`vite.config.ts`): `flue()` + `cloudflare({ config: flueWorkerConfig() })`. `flue()` MUST precede `cloudflare()`. The build is **`vite build`** — `@flue/cli` 2.0 no longer has `build`/`dev` commands (its help: "Dev servers and production builds are owned by Vite"). `flue.config.ts` is a vestigial legacy CLI entry, harmless under Vite.
- **Maintenance script** (`bin/clear-r2-pr-data.ts`): clears `diffs/pr-<n>/` R2 state for a PR (or all). Run locally via `flue:clear-r2-pr-data:local`.
- **Repo-root scripts** (`package.json` at the repository root): `flue:dev` (`vite dev`), `flue:dev:wrangler` (`vite build` + `wrangler dev --remote`), `flue:build` (`vite build`), `flue:deploy` (build + `wrangler deploy --config dist/cloudflare_docs_flue/wrangler.json --secrets-file .env`), `flue:clear-r2-pr-data:local`, `flue:reset:local`.
- **Validate locally**: `pnpm --dir .flue exec tsc -p tsconfig.json --noEmit`, `pnpm run flue:build`, `pnpm --dir .flue run test`, then `wrangler deploy --dry-run` on the generated config. `pnpm run build` at the repo root will time out in CI — do not run a full site build here.

## Reading Flue documentation

Use the installed Flue CLI for docs so guidance matches the version in `.flue/package.json`:

```bash
pnpm --dir .flue exec flue docs search "workflow"
pnpm --dir .flue exec flue docs read guide/agents
```

Do not rely on pre-trained Flue knowledge. Flue changed substantially across the 0.x releases and again at 2.0 (the workflow-per-DO + internal-HTTP model was replaced by Workflow-driven agents).

## Flue 2.0 patterns

- Trusted TypeScript owns control flow and **every** side effect (GitHub comments, labels, reactions, refs, commits, R2). Agents only reason and return structured data via their single `submit_*` tool.
- Drive agents from inside Workflow steps with `init(Agent, { id }).dispatch().read()`. Give each `read` an `AbortSignal.timeout(...)` and call `agent.abort()` on timeout so a wedged agent does not hang the step or keep burning model calls.
- Keep model output structured with Valibot when trusted code consumes it. The skill instructions must match the schema; do not ask for Markdown when the workflow expects structured data.
- Scope temporary run state by run id / head SHA; keep durable review JSON PR/head-scoped. Do not key mutable in-flight context only by PR number, or concurrent reviews can mix state.
- Treat retries and external side effects as application-owned and idempotent — Cloudflare Workflow steps can re-run after an interruption. Catch errors inside a step and return a discriminated result rather than throwing, so retries are deliberate.

## Testing

Pure, deterministic TypeScript functions in `.flue/lib/` — those that do not require AI, GitHub API calls, R2, or Workers bindings to exercise — should have Vitest unit tests. When adding or modifying trusted TS logic (rendering, state parsing, result merging, diff selection, concurrency utilities, webhook parsing, etc.), write or update tests in a matching `*.test.ts` file alongside the source. Run tests with `pnpm run test` from the `.flue/` directory.

Functions that require bindings (Durable Objects, R2, AI, Workflows, the Flue runtime) are not unit-testable in isolation and do not need tests; cover their logic paths through integration or by extracting the pure sub-functions and testing those. The orchestrators, drivers, and `startReviewPipeline` fall in this category — the pure `classifyWebhook` and the domain helpers they call are what carry unit tests.

## Review Rule Policy

Do not add agent review rules for issues that are already reliably caught by CI, including build failures, type checking, linting, link validation, and schema validation. Agent review rules should focus on style, clarity, maintainability, and conventions that CI cannot enforce.

Before adding a rule, verify whether the repository already catches the issue in CI. If it does, do not duplicate it in agent review output. For MDX/code structure checks, prefer AST-aware checks; avoid raw line pattern matching unless the rule explicitly ignores fenced code blocks and JSX component syntax.

## Agent Evals

Agent evals test agent behavior against the live Workers AI model. They live in `.flue/evals/` and use `vitest-evals` with a custom harness that drives agents over HTTP through the Flue Worker's eval routes.

### Architecture

- **Eval routes** (`app.ts`): each reviewable agent is mounted at `/eval/agents/:agentName` behind the `DOCS_FLUE_INTERNAL_TOKEN` gate (same token as `/dev/review/:number`). Routes return 404 when the token is unset, so they are invisible in production deploys that have not configured it.
- **Harness** (`evals/harness.ts`): a custom `createHarness` adapter that POSTs `{ message, initialData }` to the agent's HTTP endpoint with `?wait=result`, then reads `?view=history` to extract the structured `useDataWriter` output and tool-call transcript.
- **Eval cases** (`evals/*.eval.ts`): each file uses `describeEval` with the harness, providing synthetic `initialData` fixtures and asserting on the structured output (`findings`, `is_spam`, `resolved`, etc.) and tool calls (`submit_*`).

### Running evals

Evals need a running Flue dev server (the Worker provides the `env.AI` binding for Workers AI):

```bash
# Terminal 1: start the dev server
pnpm run flue:dev

# Terminal 2: run evals against it
pnpm --dir .flue run evals
```

Set `FLUE_BASE_URL` to target a deployment instead:

```bash
FLUE_BASE_URL=https://preview.example.com pnpm --dir .flue run evals
```

Both the server and the eval runner need `DOCS_FLUE_INTERNAL_TOKEN` set to the same value.

### CI

The `evals` job in `.github/workflows/flue-ci.yml` starts the dev server, runs evals, and uploads `vitest-results.json` as an artifact. The job is skipped for fork PRs because it needs `DOCS_FLUE_INTERNAL_TOKEN` and Workers AI access.

### Adding a new eval case

1. Create or edit a `.eval.ts` file in `.flue/evals/`.
2. Import `createFlueAgentHarness` from `./harness.ts` and the agent's input type.
3. Construct a harness with the agent name, data key, and dispatch message.
4. Write `describeEval` cases with synthetic `initialData` and assert on the structured output.
5. Assert that the `submit_*` tool was called (proves the agent completed its contract).
6. Prefer deterministic assertions over LLM judges. Add judges only for semantic behavior that cannot be checked exactly.

### Current eval coverage

| Agent | Eval file | Cases |
| ----- | --------- | ----- |
| `style-guide-file` | `style-guide.eval.ts` | Full URL flag, clean root-relative link pass |
| `conventions-reviewer` | `conventions.eval.ts` | Vague title flag, well-described PR pass |
| `spam-filter` | `spam-filter.eval.ts` | Spam issue flag, legit typo report pass |
| `reconcile-reviewer` | `reconcile.eval.ts` | Resolved finding, ignored-by-author, incremental carry-forward |
| `code-review-file` | `code-review.eval.ts` | Unhandled promise flag, clean error handling pass |

Not yet covered: `dependabot-reviewer` and `rebase-conflict-resolver` (need GitHub/npm tool fixtures or credentials).
