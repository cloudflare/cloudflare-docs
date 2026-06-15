# AGENTS.md — Flue

This directory contains the Flue-powered docs bot for `cloudflare-docs`, deployed as a Cloudflare Worker.

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

## Review Rule Policy

Do not add agent review rules for issues that are already reliably caught by CI, including build failures, type checking, linting, link validation, and schema validation. Agent review rules should focus on style, clarity, maintainability, and conventions that CI cannot enforce.

Redirect file formatting is validated by CI, but missing redirects for renamed or deleted docs pages are not currently enforced by CI.

Before adding a rule, verify whether the repository already catches the issue in CI. If it does, do not duplicate it in agent review output. For MDX/code structure checks, prefer AST-aware checks; avoid raw line pattern matching unless the rule explicitly ignores fenced code blocks and JSX component syntax.
