# AGENTS.md — Flue PR review bot

This directory is an independent pnpm project for the Cloudflare Worker `cloudflare-docs-flue`. Use Node 24, pnpm 11 (as in CI) or pnpm 10.34.5+, and Python 3 for the offline snapshot tests. Runtime, Vite integration, and CLI are pinned to **Flue 2.0.3**. Flue supplies its own Cloudflare Agents SDK dependency; do not add a separate `agents` pin.

## Architecture

```text
GitHub webhook
  → IngestWorkflow: authorize and route
  → ReviewCoordinator: one Durable Object per PR; supersession + durable outbox
  → ReviewOrchestrator: bounded Workflow continuations
      prepare → review → render → deliver
         │         │        │
      Sandbox   Flue DOs    R2 artifacts
                              → head-guarded summary comment(s)
```

- `app.ts`: HMAC verification, repository allowlist, durable ingestion, authenticated development/evaluation routes. No model calls or GitHub authorization in the webhook request.
- `orchestrators/ingest-workflow.ts`: codeowner authorization, automatic-review preferences, issue moderation, draft/closed cancellation, PR admission, and routing `/rebase`.
- `lib/review-coordinator.ts`: serializes admission and publication. An alarm-backed outbox creates deterministic Workflow instances, retires superseded runs, and detects terminal failures. The latest complete baseline, active generation, comment IDs, prior-finding index, and publication deduplication live here.
- `orchestrators/review-workflow.ts`: each review/render/delivery instance handles at most 12 tasks; review fan-out is three. Preparation also advances in bounded pages. A continuation uses a fresh Workflow instance, so step counts and checkpoint state do not grow with total PR size.
- `bin/snapshot.py`: trusted program in the Sandbox image. Fetches exact Git commits with blobless ancestry, inventories changes, and pages numbered additions/deletions/context. SQLite and disk cursors avoid loading whole diffs or huge individual lines in memory. A response is cached transactionally with cursor advancement before returning. Units are persisted in R2, so later reviews do not require the container to remain alive.
- `lib/agent-step.ts`: separate durable `dispatch` and `read` steps. Read retries reattach to the accepted receipt rather than submitting another prompt. Agents have Flue-native attempt/time bounds; an exhausted task is explicitly incomplete.
- `lib/agent-output.ts`: the shared typed `submit_*` tool / data writer / finish reminder. Never parse arbitrary model prose as a result.
- `orchestrators/rebase-workflow.ts`: checkpointed branch update, optional AI conflict resolution, guarded Git tree application, and review admission. `lib/rebase-conflict.ts` retains the deterministic rename/binary/completeness and branch-moved safety checks.

## Review behavior

Automatic reviews run on opened, reopened, synchronize, and ready-for-review events. There is no two-review cap. Every new head supersedes the previous run; stale deliveries cannot replace a newer head. Closed and draft PRs cancel automatic work. Commands may explicitly review a draft.

The first review uses the complete merge-base-to-head diff. Later reviews use the tree difference from the last successfully completed head, including after force-pushes when that commit remains fetchable. Missing prior commits cause an explicit full-diff fallback. There is no application-level file-count cap; generated/vendored/binary exclusions are counted, not disguised as reviewed files.

Existing findings are reconciled in batches of 25. Unchanged findings are copied without AI when there are no new eligible replies or metadata changes. Otherwise the reconciler reads paginated author/collaborator comments and verifies fixes at the current head. A clear natural-language dismissal is sufficient; exact IDs are helpful but not required. Ignored findings remain ignored unless explicitly reopened. New reviewers can read the prior-finding index to avoid re-reporting existing issues with different wording.

Only a complete, validated run advances the baseline. Failed tasks preserve the previous baseline. Successful chunk results can be reused when retrying the same head/comparison; `/full-review` bypasses this cache. Findings retain stable IDs and original-commit evidence links. Summary overflow is checkpointed and published before the primary summary; obsolete overflow comments are cleared.

Dependabot shares the coordinator, pagination, and publication path, with one task per parsed package. It does not approve or merge PRs. Unparseable package metadata falls back to ordinary review.

## Agents and skills

| Agent                      | Responsibility                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `review-chunk`             | Correctness and, for eligible MDX, explicit style rules for supplied changed lines |
| `conventions-reviewer`     | Title, description, and changed scope; paginated path metadata                     |
| `reconcile-findings`       | Carry, dismiss, reopen, or resolve existing findings only                          |
| `review-validator`         | Independent verification; valid, invalid, or unverified, never new findings        |
| `dependabot-reviewer`      | Release changes and repository usage for one package                               |
| `spam-filter`              | Structured spam/off-topic verdict; trusted code owns moderation                    |
| `rebase-conflict-resolver` | Suggest complete merged file content; no branch-writing tools                      |

Agent modules start with `"use agent"`, have stable `agentName` values, and explicit durability settings. `useResult` names are durable data identities. Flue generates agent DO bindings; never hand-author `FLUE_*` bindings. Append migrations for added/retired agent classes; never rewrite deployed migrations.

Style references are packaged in `.agents/skills/style-guide-review/reference/`; load only relevant references. Other review skills live alongside it. Maintain prompts and evaluation fixtures together.

## Security and side effects

- Never execute code, package scripts, hooks, or configuration from a PR. The Sandbox is a trusted Git reader, not a model-controlled shell.
- The Docker context is allowlisted. Never copy credentials or the repository checkout into the image.
- GitHub tokens come from bindings, never `initialData`, R2, model context, or tool outputs.
- Repository reads are pinned to commit SHAs and paged. Default-branch search results are hints that must be verified at the pinned head.
- Model tools are read-only. GitHub labels, comments, closes, and branch writes belong to trusted TypeScript.
- Only the PR author and repository collaborators can dismiss findings. Replies are evidence, not permission to execute commands.
- Slash commands require a codeowner read from production's CODEOWNERS; team membership must be active. A PR cannot grant itself authority by changing CODEOWNERS.
- `DOCS_FLUE_REVIEW_MODE=log` prevents GitHub mutations, including moderation and rebase. It still runs reviews and writes local/remote review state and incurs AI/container costs.
- Moderation acts only on high-confidence spam/off-topic verdicts and rechecks item/head metadata. Unavailable classification does not close legitimate contributions.
- Publication is serialized with admission and rechecks GitHub's current head. GitHub has no transactional compare-and-swap for issue comments: a push between the final API check and comment write can briefly show the old commit, which is visibly identified and superseded by the next run.
- Never hide incomplete work behind a clean-review summary.

## Development and checks

Root scripts are prefixed `flue:`. Install with `pnpm --dir .flue install --frozen-lockfile`. Do not install the docs site's dependencies to work on the bot.

```sh
pnpm run flue:docs -- read guide/durability
pnpm --dir .flue exec flue docs read guide/cloudflare-target
pnpm --dir .flue run types
pnpm run flue:typecheck
pnpm run flue:test
pnpm run flue:build
```

Unit tests run Vitest plus offline Python/Git snapshot fixtures. Live evaluations are separate, require Workers AI access, and are not part of unit tests. For opt-in evaluations, enable `DOCS_FLUE_ENABLE_EVAL_ROUTES=1` in log mode, start `pnpm run flue:evals:dev`, then run `pnpm run flue:evals` with the internal token configured. Evaluation mode uses GitHub fixtures but real AI calls.

Do not run runtime checks, local bindings, AI evaluations, builds, or deployment when the task says credentials/testing are unavailable. TypeScript and Python syntax checks are separate static checks. Format only edited files rather than changing unrelated docs.

## Storage and lifecycle

Artifacts: `reviews/2.0.3-1/pr-N/RUN/` contains snapshot, plan, units, results, finding batches, and report parts. Same-head retry cache: `review-cache/2.0.3-1/pr-N/`. Automatic-review disable flags retain the legacy key `diffs/pr-N/auto-review-disabled.json`.

Do not delete a baseline's finding artifacts: future runs need them. No destructive automatic R2 retention policy is installed. Closed PRs stop work; storage retention/cleanup is an operator decision. Sandbox disks are disposable and destroyed after completion/supersession. Native Flue conversation retention and account-wide AI/GitHub/container quotas still apply.
