# Flue Review Bot

`.flue/` is the Cloudflare Worker that reviews pull requests for `cloudflare/cloudflare-docs`. It uses Flue 2.1.0, Cloudflare Workflows, R2, Workers AI, and Hono.

## Operating Rules

- **Trusted code drives; agents only decide.** TypeScript owns control flow, GitHub/R2 writes, reactions, labels, and all other side effects. Agents return one validated structured result through `submit_result` and terminate.
- Agents use plain Markdown instruction imports. Do not add skills to agents.
- Keep Workflow step results well below 1 MiB. Store plans, patches, prompts, findings, and rendered output as R2 run artifacts.
- Make external writes idempotent. Workflow steps can retry.
- Do not add model rules for failures CI reliably catches, such as builds, types, lint, links, or schemas.

## Review Architecture

`app.ts` verifies GitHub webhooks and delegates to the pipeline entry. The review path is:

1. Debounce `synchronize` automatic runs for `DOCS_FLUE_REVIEW_DEBOUNCE_SECONDS` (default 120 seconds).
2. Admit the run, claim it in v2 state, supersede an older run, and abort that run's agents.
3. Prepare paginated PR files, classify noise, create numbered patches, calculate line fingerprints, select targets, and collect eligible author/maintainer comments.
4. Optionally write a pending placeholder in comment mode.
5. Dispatch and read the `code`, `style`, and `conventions` specialists in parallel.
6. Deterministically reject off-target output, assign stable IDs, deduplicate, and carry untouched findings.
7. Prepare and run one judge over new and touched findings.
8. Finalize state, render one summary comment, publish or log it, then clean run artifacts.

The fail path renders a failure state when publication is allowed. A failed specialist carries its active findings forward rather than resolving them. A failed judge publishes filtered specialist findings as unverified.

### Routing

| Specialist    | Reviews                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `code`        | Every added line of non-MDX files, and added lines inside code blocks or code components in MDX |
| `style`       | Added lines of MDX files under `src/content/docs`, `partials`, and `changelog`                  |
| `conventions` | PR title, description, and the changed-file index                                               |

`prepareRun` reads each changed MDX file at the head to find its code lines, because a diff shows only a few lines around each edit and can hide the fence that opens a long code block. If a read fails, the plan falls back to scanning the hunks.

No specialist reviews the technical accuracy of documentation prose, such as product behavior, limits, or pricing. The source of truth for those claims usually lives outside this repository, and the bot cannot tell an intended product change from an error. Do not add prose accuracy checks.

### Agents

Agents are Durable Objects driven by shared helpers in `lib/agents/`:

1. `init(Agent, { id })`
2. `dispatch(message)`
3. `read()`

Each agent gets one durable instance ID per run. Use `agentStep` helpers for dispatch/read durability and deadlines. The `submit_result` tool ends the agent turn (`terminate`); trusted code validates its output against the Valibot schema. Instructions are static plain `.md` imports; per-run data belongs in the dispatched message or run artifacts.

Specialists use `cloudflare/@cf/deepseek-ai/deepseek-v4-flash-0731`; the judge uses `cloudflare/@cf/zai-org/glm-5.3`. Model IDs live in `lib/agents/models.ts`. Agents with `read_repo_file` and `search_repo` also get `prompts/repo-tools.md`, which describes what each tool can and cannot see. The judge receives reduced context and decides only whether a new finding is kept or dropped, and whether each touched prior finding remains active, is resolved, or is dismissed.

### Rules and verification

Each specialist's rules live apart from its agent instructions, and `lib/agents/review-rules.ts` exports them. The specialist and the judge load the same export, so the judge checks findings against the rules they were found with.

| Specialist    | Rules                                   |
| ------------- | --------------------------------------- |
| `code`        | `prompts/code-rules.md`                 |
| `style`       | Every file under `prompts/style-guide/` |
| `conventions` | `prompts/conventions-rules.md`          |

The judge keeps a new finding only when it can verify that the finding is true and that a rule covers it. It drops findings it cannot verify, including code findings that depend on API, library, or service behavior that the diff, files at the head, and repository search do not show. The code reviewer applies the same standard before reporting. This repository's docs count as evidence for Cloudflare API behavior.

The judge's reasoning length varies widely between runs, even on small inputs, so its durability timeout is 20 minutes. The Workflow read step adds a 2-minute buffer and must stay within the 30-minute Workflow step timeout; a unit test enforces this.

## Diffs And Re-reviews

`lib/review/diff/` builds `PatchFile` data and a `ReviewPlan`.

| Tier        | Rule                               | Dispatch                                      |
| ----------- | ---------------------------------- | --------------------------------------------- |
| `inline`    | At most 250k estimated tokens      | Target patch included in message              |
| `tool`      | At most 1M tokens                  | Agents read patch artifacts with `read_patch` |
| `too-large` | More than 1M tokens or 1,000 files | Conventions only                              |

Every skipped, excluded, collapsed, or patchless file is included in the rendered **Not reviewed** list.

Incremental reviews track fingerprints of added lines. A fingerprint includes the path, normalized line, and adjacent new-file lines: editing a neighboring line means the target is touched. Untouched active findings carry forward. A re-raised matching finding keeps the prior ID and adopts its new fingerprint.

Finding IDs are deterministic and specialist-scoped. A new finding with a dismissed finding's ID is deterministically suppressed. A differently worded re-raise goes to the judge, which receives dismissed findings as context.

A full review clears successful-review fingerprints and the conventions input hash, but preserves active and dismissed findings, comments, and completion metadata. It dispatches specialists across the whole diff. Located active findings for targeted specialists are treated as touched and re-judged; dismissed findings remain dismissal context.

## Comments And Dismissals

The bot maintains one marker-located summary comment per PR. It has grouped Code Review, Style Guide, and Conventions sections, an optional fix prompt, a collapsed Not reviewed section, history, and command help. It never creates inline review comments.

Each finding renders as a list block: a location and title line, an explanation, and an optional `snippet` block for code excerpts only. Findings state the problem only, never a fix; the author and their agent decide how to fix it. Finding IDs stay in the agent prompt and internal state, not the visible comment. Empty specialist sections are omitted. Renderer input is untrusted model text: preserve the single marker and safely render prose.

`/rebase` writes a transient, marker-delimited status block into that singleton comment while the rebase runs. The next review render removes the block, so normal review output does not retain stale rebase status.

Only the PR author or a maintainer (`OWNER`, `MEMBER`, or `COLLABORATOR`) can dismiss findings. Reasoned dismissals are honored for style and conventions. Code dismissals require proof at the current head, or a maintainer who dismisses the finding or explains why it is wrong. The judge is the dismissal authority; trusted code applies its decision.

## State And Artifacts

v2 state is at `reviews/v2/pr-<number>/state.json`; old review state is intentionally ignored.

| State field                   | Purpose                                                            |
| ----------------------------- | ------------------------------------------------------------------ |
| `activeRun`                   | Current owner, workflow ID, SHA, and agent IDs for supersession    |
| `reviewed`                    | Successful specialist line fingerprints                            |
| `findings`                    | Active and dismissed findings; resolved findings are not persisted |
| `conventionsInputHash`        | Prevents unnecessary conventions work                              |
| `commentsSeenThrough`         | Bounds comments sent to the judge                                  |
| `commentId` / `lastCompleted` | Published comment and completion metadata                          |

Use ETag-conditional state writes. Only the currently active run may commit. Run artifacts live at `reviews/v2/pr-<number>/runs/<run-id>/`; their names are centralized in `RUN_ARTIFACTS` in `lib/review/run-context.ts`.

The local clear-R2 script deletes both `reviews/v2/pr-<number>/` state and run artifacts and legacy `diffs/pr-<number>/` flags.

## Commands And Modes

Codeowner commands are authorized in the pipeline entry:

- `/review`: run an incremental review from the last completed run; the first run reviews the whole PR.
- `/full-review`: re-review the complete PR diff while preserving dismissals and prior-comment context.
- `/disable-auto-review`: disable automatic reviews for the PR.
- `/draft-never-stale`: opt the draft PR out of stale-draft reminders.
- `/rebase`: start the rebase workflow.

`/review` and `/full-review` route Dependabot PRs to `DEPENDABOT_REVIEW`. `/draft-never-stale` only applies to open draft PRs. Draft PRs skip automatic review; commands can still run. `DOCS_FLUE_REVIEW_MODE=log` is the default and only logs rendered output. `comment` updates the singleton summary comment.

## Spam Gates

The item gate (`INGEST`) evaluates new issues and non-Dependabot PRs and closes items the `spam-filter` agent flags as spam or clearly off-topic at medium/high confidence. The comment gate (`COMMENT_SPAM`) evaluates new `issue_comment` events and deletes comments the `comment-spam-filter` agent flags as spam at **high** confidence only. Off-topic content is never deletable at the comment level — support questions and short reactions are normal conversation. Both gates fail open: an agent error is treated as not spam. All side effects live in trusted code; agents only return structured verdicts.

The comment gate skips comments from authors with write access (`OWNER`, `MEMBER`, or `COLLABORATOR` via `author_association`), any `[bot]` account, the item's own author, and exact-match slash commands (payload-derived, zero API calls in the classifier). Codeowners are skipped via an API check inside the workflow, keeping the webhook fast. The gate runs on comments on open and closed items alike.

Before deleting, the workflow writes an audit record to `spam-gate/comment-deletions/<commentId>.json` in R2. That prefix sits outside `reviews/v2/` on purpose: run cleanup and the clear-R2 script never touch it. The deletion is 404-tolerant, so webhook redeliveries and step retries are idempotent.

## Replay And Evals

`pnpm run flue:replay --pr <number>` runs the real-PR replay harness. Run `pnpm run flue:dev` first. It reads `DOCS_FLUE_INTERNAL_TOKEN` and optional `FLUE_BASE_URL` (default `http://localhost:5173`) from the environment or `.flue/.env(.local)`. `--pr` accepts any PR number or a comma-separated list, such as `--pr 33622,33305`; omit it to replay every PR in `bin/replay-prs.json`, and use `--concurrency <number>` to run several at once.

Replay calls the dev review route with `replay: true`. It always runs a full review from empty state, so prior dismissals do not apply. It publishes according to the dev server's `DOCS_FLUE_REVIEW_MODE`:

| Mode      | Replay output                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `log`     | Prints the rendered comment in the replay terminal and the dev server log                                                                                            |
| `comment` | Writes the PR's singleton summary comment, even on a closed PR: first a "Full review in progress" note, then the finished review, or a failure note if the run fails |

In comment mode, replaying the whole list comments on every PR in it. Replay never writes review state or reactions, and has no debounce, supersession, or cleanup. Results and rendered markdown go to the ignored `.flue/replay-results/` directory.

Evals live in `evals/` and exercise structured agent output with fixtures. `pnpm run flue:evals` starts a local dev server with `DOCS_FLUE_AGENT_EVALS=1`, waits for it, runs evals, and tears it down. It requires `DOCS_FLUE_INTERNAL_TOKEN` in the environment or `.flue/.env(.local)`:

```sh
pnpm run flue:evals
```

## Local Development And Deployment

| Task                     | Command                                              |
| ------------------------ | ---------------------------------------------------- |
| Local dev                | `pnpm run flue:dev`                                  |
| Remote Worker dev        | `pnpm run flue:dev:wrangler`                         |
| Build                    | `pnpm run flue:build`                                |
| Deploy                   | `pnpm run flue:deploy`                               |
| Clear local review state | `pnpm run flue:clear-r2-pr-data:local --pr <number>` |
| Reset local Worker state | `pnpm run flue:reset:local`                          |
| Focused tests            | `pnpm --dir .flue exec vitest run <file>`            |

`wrangler.jsonc` defines the Worker bindings, R2 bucket, Workflow bindings, AI binding, Durable Object migrations, and queue consumers. Migration `v12` deletes `FlueCodeReviewFileAgent`, `FlueStyleGuideFileAgent`, `FlueReconcileReviewerAgent`, and `FlueReviewValidatorAgent`; it creates `FlueCodeReviewerAgent`, `FlueStyleGuideReviewerAgent`, and `FlueReviewJudgeAgent`. Migration `v13` creates `FlueCommentSpamFilterAgent` for the comment spam gate.

Because `wrangler.jsonc` declares `secrets.required`, local dev loads only those secrets from `.flue/.env(.local)` and drops every other key. `vite.config.ts` forwards the non-secret settings in `LOCAL_DEV_SETTINGS` (review mode, recommendations mode, and debounce) as Worker vars during `vite dev` only, and logs them at startup. Restart `flue dev` after editing these values. `flue:dev:wrangler` does not forward them.

`pnpm run flue:deploy` builds first, then deploys with `dist/cloudflare_docs_flue/wrangler.json`. Use that generated configuration for `wrangler deploy --dry-run` after a build.

## Adding Or Changing Review Logic

1. Update shared types in `lib/review/types.ts` deliberately; all review code imports this contract.
2. Put pure diff, state, reducer, and renderer behavior in focused modules with Vitest tests.
3. Keep agent prompts aligned with their Valibot schemas and return only structured results.
4. Preserve tier limits, off-target filtering, stable IDs, carry-forward behavior, and single-comment rendering.
5. Run Prettier and focused tests. Run `.flue` typecheck and build when practical; report unrelated failures rather than changing concurrent work.
