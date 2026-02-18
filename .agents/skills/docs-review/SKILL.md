---
name: docs-review
description: Reviews documentation PRs and provides GitHub PR suggestions. Load when asked to review, suggest changes, or provide feedback on docs content. Covers MDX, frontmatter, style guide, components, and content accuracy.
---

Review documentation changes for correctness, style, and structure. Use AGENTS.md and the style guide at `src/content/docs/style-guide/` as primary references.

## When to Suggest vs. When to Edit

### Decision logic

1. **Explicit instruction wins.** If the user says "suggest", "only make suggestions", or "do not make changes" — post suggestions via `gh` CLI, never push commits. If they say "fix", "address this", or "update" — edit files directly and commit.
2. **Different actor = suggest.** If the person invoking the review is not the PR author (and no explicit fix instruction was given), post suggestions so the author retains control.
3. **Same actor or ambiguous = fix by default.** When the invoker is the PR author (or it is unclear), default to **editing files directly**. MDX syntax errors, broken code, invalid frontmatter, wrong component usage, and other obvious errors should always be fixed, not suggested.

### Quick reference

| Instruction                                        | Action                                                                |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| "review", "suggest changes", "provide suggestions" | Post **suggestions only** via `gh` CLI — do not push commits          |
| "only make suggestions", "do not make changes"     | Post **suggestions only** — never edit files or push                  |
| "fix", "address this", "update"                    | Always edit files directly and commit changes                         |
| "review and fix"                                   | Fix low-severity issues directly; suggest high-impact changes         |
| Invoked by someone other than PR author            | Post suggestions unless explicitly told to fix                        |
| Invoked by PR author (or unclear)                  | Fix directly — especially MDX syntax, code errors, and build breakers |

When in doubt, **fix obvious errors** (build breakers, MDX syntax, wrong imports, broken code) and **suggest subjective changes** (wording, restructuring, style preferences).

## Posting GitHub Suggestions

Use the GitHub REST API via `gh api` to post line-level suggestions on PRs. This is the **only** way to propose changes when operating in suggestion-only mode.

### Prerequisites

Determine the PR number and the latest commit SHA before posting:

```bash
PR_NUMBER=$(gh pr view --json number -q '.number')
COMMIT_SHA=$(gh pr view --json commits -q '.commits[-1].oid')
```

### Single-line suggestion

Replace one line in the diff. Use `subject_type: "line"`.

````bash
gh api repos/{owner}/{repo}/pulls/${PR_NUMBER}/comments \
  -f body='Tighten the phrasing:

```suggestion
Workers use an event-driven architecture. Each incoming request triggers a `fetch` handler.
```' \
  -f commit_id="${COMMIT_SHA}" \
  -f path="src/content/docs/workers/get-started/index.mdx" \
  -F line=42 \
  -f side="RIGHT" \
  -f subject_type="line"
````

### Multi-line suggestion

Replace a range of lines. Add `start_line` and `start_side`.

````bash
gh api repos/{owner}/{repo}/pulls/${PR_NUMBER}/comments \
  -f body='Simplify this paragraph:

```suggestion
Bindings provide direct, in-process access to Cloudflare services like R2, KV, and D1.
They require no network hop, no authentication token, and add no extra latency.
```' \
  -f commit_id="${COMMIT_SHA}" \
  -f path="src/content/docs/workers/runtime-apis/bindings.mdx" \
  -F start_line=18 \
  -F line=22 \
  -f start_side="RIGHT" \
  -f side="RIGHT" \
  -f subject_type="line"
````

### Comment without suggestion

For feedback that does not map to a specific replacement, post a plain review comment (no suggestion block):

```bash
gh api repos/{owner}/{repo}/pulls/${PR_NUMBER}/comments \
  -f body="This claim needs a source. Link to the relevant API reference or remove it." \
  -f commit_id="${COMMIT_SHA}" \
  -f path="src/content/docs/workers/observability/index.mdx" \
  -F line=55 \
  -f side="RIGHT" \
  -f subject_type="line"
```

### Rules for suggestion blocks

- The content inside a `suggestion` fenced block replaces the target line(s) exactly. Include the full replacement text with correct indentation.
- For single-line: set `line` to the diff line number. Do not set `start_line`.
- For multi-line: set `start_line` to the first line and `line` to the last line of the range being replaced.
- Always set `side` to `"RIGHT"` (the new file side of the diff).
- Always set `subject_type` to `"line"`.
- Line numbers refer to the **new file** in the diff (the right side), not the old file.
- Use `-F` (not `-f`) for numeric fields (`line`, `start_line`) so `gh` sends them as integers.
- Keep the prose before the suggestion block to one sentence. Do not over-explain.

### Batching with a review object

When posting 3+ suggestions, use a single review with multiple comments to avoid notification spam:

```bash
gh api repos/{owner}/{repo}/pulls/${PR_NUMBER}/reviews \
  --input - <<EOF
{
  "event": "COMMENT",
  "body": "A few suggestions for this PR.",
  "commit_id": "${COMMIT_SHA}",
  "comments": [
    {
      "path": "src/content/docs/workers/get-started/index.mdx",
      "line": 42,
      "side": "RIGHT",
      "body": "Tighten:\n\n\`\`\`suggestion\nWorkers use an event-driven model.\n\`\`\`"
    },
    {
      "path": "src/content/docs/workers/get-started/index.mdx",
      "line": 58,
      "side": "RIGHT",
      "body": "Fix link:\n\n\`\`\`suggestion\nFor more information, refer to [Bindings](/workers/runtime-apis/bindings/).\n\`\`\`"
    }
  ]
}
EOF
```

When using `--input -` with a heredoc, do not pass `-f`/`-F` flags — all fields go in the JSON body. The JSON must include `event`, `commit_id`, `body`, and `comments`.

## Review Process

### 1. Read the Full Diff

```bash
gh pr diff ${PR_NUMBER}
```

Read full files for context — code that looks wrong in a diff may be correct in context. Check what section the change sits in and what comes before/after.

### 2. Check Against Rules

See `references/content-rules.md` for the full checklist. Quick reference:

| Rule                     | Detail                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| Unescaped MDX characters | `{`, `}`, `<`, `>` in prose must be escaped or in backticks                                          |
| Component imports        | Every component used must be imported from `~/components`                                            |
| Code block languages     | Must be lowercase and in the supported set (see AGENTS.md)                                           |
| Internal links           | Absolute paths, no file extensions, no `https://developers.cloudflare.com`                           |
| Heading hierarchy        | Sequential: H2 then H3 then H4 — never skip                                                          |
| Frontmatter              | `title` required; `pcx_content_type` must be a valid value                                           |
| Style guide              | Active voice, no contractions, "select" not "click", bold for UI elements                            |
| Workers code             | Must use `TypeScriptExample` component, not bare `js`/`ts` fences                                    |
| Config blocks            | Must use `WranglerConfig` component with TOML input                                                  |
| Code correctness         | For type checking, API usage, and binding patterns, load the `code-review` skill                     |
| Accuracy                 | Claims must be substantiated — link to sources of truth, do not explain inline what other docs cover |

### 3. Assess What to Flag

| Flag                                                            | Do not flag                                          |
| --------------------------------------------------------------- | ---------------------------------------------------- |
| Incorrect technical content                                     | Style preferences not in the style guide             |
| Broken MDX (build will fail)                                    | Pre-existing issues in unchanged lines               |
| Wrong API usage or types                                        | "Could be cleaner" when code is correct              |
| Missing component usage (`TypeScriptExample`, `WranglerConfig`) | Theoretical concerns without evidence                |
| Inaccurate or unsubstantiated claims                            | Missing features outside the PR scope                |
| Security or safety issues in examples                           | Minor wording differences that do not change meaning |
| Scope creep (changes to files outside the PR intent)            |                                                      |

### 4. Prioritize

Review in severity order:

1. **Build breakers** — unescaped MDX, missing imports, invalid frontmatter
2. **Incorrect content** — wrong API, wrong behavior description, broken examples
3. **Missing best practices** — no `TypeScriptExample`, hardcoded compat dates, bare code fences
4. **Style and structure** — heading levels, link format, prose quality

## Content Review Principles

These principles are derived from recurring review feedback on this repo:

- **Link to sources of truth.** Do not re-explain concepts that have their own docs page. Link to the canonical page instead. Example: do not explain HTTP error 522 inline — link to `/support/troubleshooting/http-status-codes/`.
- **Substantiate claims.** If docs say "X behaves this way", verify it. Reference source code, API docs, or config schemas. Flag unverified claims.
- **Be direct about recommendations.** "Always use Hyperdrive when connecting to a remote PostgreSQL database" is better than "Connecting directly adds latency; consider using Hyperdrive."
- **Qualify scope.** "Bindings provide direct access to Cloudflare services like R2, KV, and D1" is better than "Bindings provide direct access to Cloudflare services" (which implies all services).
- **Code examples must be safe to copy.** Treat every code block as something a developer will paste into production. Examples must handle errors, use correct types, and follow current best practices.
- **Use the right component.** Workers code should use `TypeScriptExample`. Config should use `WranglerConfig` with `$today` for compatibility dates. Package install commands should use `PackageManagers`.
- **Keep changes in scope.** If a review uncovers issues in files outside the PR, note them but do not fix them in the same PR.
- **Research before asserting.** If uncertain whether an API, flag, or behavior is correct, look it up in the types, schema, or docs before flagging.

## Output Format

When posting suggestions, keep commentary minimal. One sentence of context, then the suggestion block.

When posting a summary comment (not line-level), list issues by severity with file and line references. Severity levels: **CRITICAL** (build break, security) | **HIGH** (incorrect content, wrong API) | **MEDIUM** (missing component, outdated pattern) | **LOW** (minor style, wording)
