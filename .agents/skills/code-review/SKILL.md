---
name: code-review
description: Reviews Workers and Cloudflare Developer Platform code for type correctness, API usage, and configuration validity. Load when reviewing TypeScript/JavaScript using Workers APIs, wrangler.jsonc/toml config, or Cloudflare bindings (KV, R2, D1, Durable Objects, Queues, Vectorize, AI, Hyperdrive).
---

Your knowledge of Cloudflare Workers APIs, types, and wrangler configuration may be outdated. **Prefer retrieval over pre-training** for any Workers code review task.

## Retrieval Sources

Fetch the **latest** versions before reviewing. The current repo may have outdated dependencies — always validate against what is currently published, not what is locally installed.

| Source                 | How to retrieve                                         | Use for                                                |
| ---------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Wrangler config schema | See `references/wrangler-config.md` for retrieval steps | Config fields, binding shapes, allowed values          |
| Workers types          | See `references/workers-types.md` for retrieval steps   | API usage, handler signatures, binding types           |
| Cloudflare docs        | `https://developers.cloudflare.com/workers/`            | API reference, compatibility dates/flags, binding docs |

## FIRST: Fetch Latest References

Retrieve the latest wrangler schema and workers types before reviewing. See the reference files for specific retrieval commands. If the current repo's `node_modules` has an older version, **prefer the latest published version** — documentation should reflect the current state of the platform, not a pinned dependency.

## Review Process

### 1. Build Context

Read full files, not just diffs or isolated snippets. Code that looks wrong in isolation may be correct given surrounding logic.

- Identify the purpose of the code: is it a complete Worker, a snippet, a configuration example?
- Check git history for context: `git log --oneline -5 -- <file>`
- Understand which bindings, types, and patterns the code depends on

### 2. Categorize the Code

Every code block falls into one of three categories. Review **in the context** of its category.

| Category          | Definition                                                           | Expectations                                         |
| ----------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| **Illustrative**  | Demonstrates a concept; uses comments for most logic                 | Correct API names, realistic signatures              |
| **Demonstrative** | Functional but incomplete; would work if placed in the right context | Syntactically valid, correct APIs and binding access |
| **Executable**    | Standalone and complete; runs without modification                   | Compiles, runs, includes imports and config          |

### 3. Validate with Tools

Run type-checking and linting. Tool output is evidence, not opinion.

```bash
npx tsc --noEmit                    # TypeScript errors
npx eslint <files>                  # Lint issues
```

For config files, validate against the latest wrangler config schema (see `references/wrangler-config.md` for retrieval) and check that all fields, binding types, and values conform.

### 4. Check Against Rules

See `references/workers-types.md` for type system rules, `references/wrangler-config.md` for config validation, and `references/common-patterns.md` for correct API patterns.

**Quick-reference rules:**

| Rule                    | Detail                                                                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Binding access          | `env.X` in module export handlers; `this.env.X` in classes extending platform base classes. See `references/common-patterns.md`.         |
| No `any`                | Never use `any` for binding types, handler params, or API responses. Use proper generics.                                                |
| No type-system cheats   | Flag `as unknown as T`, unjustified `@ts-ignore`, unsafe assertions. See `references/workers-types.md`.                                  |
| Config-code consistency | Binding names in wrangler config must match `env.X` usage in code. See `references/wrangler-config.md`.                                  |
| Required config fields  | Verify against the wrangler config schema — do not assume which fields are required.                                                     |
| Concise examples        | Examples should focus on core logic. Minimize boilerplate that distracts from what the code teaches.                                     |
| Floating promises       | Every `Promise` must be `await`ed, `return`ed, `void`ed, or passed to `ctx.waitUntil()`. See `references/common-patterns.md`.            |
| Serialization           | Data crossing Queue, Workflow step, or DO storage boundaries must be structured-clone serializable. See `references/common-patterns.md`. |
| Streaming               | Large/unknown payloads must stream, not buffer. Flag `await response.text()` on unbounded data.                                          |
| Error handling          | Minimal but present — null checks on nullable returns, basic fetch error handling. Do not distract with verbose try/catch.               |

### 5. Assess Risk

| Risk       | Triggers                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| **HIGH**   | Auth, crypto, external calls, value transfer, validation removal, access control, binding misconfiguration |
| **MEDIUM** | Business logic, state changes, new public APIs, error handling, config changes                             |
| **LOW**    | Comments, logging, formatting, minor style                                                                 |

Focus deeper analysis on HIGH risk. For critical paths, check blast radius: how many other files reference this code?

**Security logic escalation**: for crypto, auth, and timing-sensitive code, do not stop at verifying API calls are correct. Examine the surrounding logic for flaws that undermine the security property (e.g., correct `timingSafeEqual` call but early return on length mismatch). See `references/common-patterns.md` Security section.

## Anti-patterns to Flag

| Anti-pattern                                                                  | Why it matters                                                             |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `any` on `Env` or handler params                                              | Defeats type safety for every binding access downstream                    |
| `as unknown as T` double-cast                                                 | Hides real type incompatibilities — fix the underlying design              |
| `@ts-ignore` / `@ts-expect-error` without explanation                         | Masks errors silently; require a comment justifying each suppression       |
| Buffering unbounded data (`await res.text()`, `await res.json()` on streams)  | Memory exhaustion on large payloads; use streaming                         |
| Hardcoded secrets or API keys                                                 | Use `env` bindings and `wrangler secret`                                   |
| `blockConcurrencyWhile` on every request                                      | Only for initialization; blocks all concurrent requests                    |
| Single global Durable Object                                                  | Creates a bottleneck; shard by coordination atom                           |
| In-memory-only state in DOs                                                   | Lost on eviction; persist to SQLite storage                                |
| Missing DO migrations in config                                               | New DO classes require migration entries or deployment fails               |
| Floating promises (`step.do()`, `fetch()` without `await`)                    | Silent bugs — drops results, breaks Workflow durability, ignores errors    |
| Non-serializable values across boundaries (`Response`, `Error` in step/queue) | Compiles but fails at runtime; extract plain data before crossing boundary |
| `implements` instead of `extends` on platform base classes                    | Legacy pattern — loses `this.ctx`, `this.env` access from base class       |

## What NOT to Flag

- Style not enforced by linters
- "Could be cleaner" when code is correct and clear
- Theoretical performance concerns without evidence
- Missing features not in scope of the example
- Pre-existing issues in unchanged code
- TOML config in existing docs (only flag for new content)

## Output Format

```
**[SEVERITY]** Brief description
`file.ts:42` — explanation with evidence (tool output, type error, config mismatch)
Suggested fix: `code` (if applicable)
```

Severity: **CRITICAL** (security, data loss, crash) | **HIGH** (type error, wrong API, broken config) | **MEDIUM** (missing validation, edge case, outdated pattern) | **LOW** (style, minor improvement)

End with a summary count by severity. If no issues found, say so directly.

## Principles

- **Be certain.** Investigate before flagging. If you cannot confirm an API, binding pattern, or config field, retrieve the docs or schema first.
- **Provide evidence.** Reference line numbers, tool output, schema fields, or type definitions.
- **Correctness over completeness.** A concise example that works is better than a comprehensive one with errors.
- **Respect existing patterns.** Do not flag conventions already established in the codebase unless actively harmful.
- **Focus on what developers will copy.** Code in documentation gets pasted into production. Treat it accordingly.
