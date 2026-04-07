---
name: pr
description: Creates and updates GitHub pull requests for cloudflare-docs changes. Load when asked to open, create, submit, update, edit, or write a title or description for a PR. Covers title conventions, PR body structure, and the documentation checklist template.
---

Use this skill when creating a GitHub pull request for changes to this repository, or when editing an existing PR's title or description.

## `gh` CLI

This skill uses the `gh` CLI throughout. If a `gh` command fails because it is not installed or not authenticated, fall back to providing the PR title and body clearly so the user can copy-paste them, along with the relevant GitHub URL:

- **New PR**: `https://github.com/cloudflare/cloudflare-docs/compare/production...<branch>` (get branch from `git branch --show-current`)
- **Edit existing PR**: `https://github.com/cloudflare/cloudflare-docs/pull/<number>` — instruct them to select **Edit** on the description.

## Editing an existing PR

When asked to update or edit an existing PR description (or title), follow these rules strictly — then stop. Do not proceed to the "Creating a new PR" steps below.

1. **Always read the current PR description first** using `gh pr view <number> --json title,body` before making any changes.
2. **If the description is empty**, treat it as a new PR body and follow the template and guidelines in the "Creating a new PR" section below.
3. **Follow the existing format** — if the author has structured their description in a particular way, preserve that structure. Do not reformat, reorder, or restructure sections they wrote.
4. **Only change what was asked** — make the minimum edit necessary to fulfill the request. Do not "improve" unrelated phrasing, fix grammar elsewhere, rewrite the summary, or modify checklist items that were not part of the request.
5. Apply the edit using `gh pr edit <number> --body "..."` or `--title "..."`.

## Creating a new PR

Follow Steps 1–4 below only when creating a new PR (or when an existing PR has an empty description).

## Step 1 — Gather context

Run `--stat` first to understand the scope without blowing up context:

```bash
git log --oneline production..HEAD
git diff production...HEAD --stat
```

If the stat output shows more than ~20 files changed, do **not** run the full diff. Instead, read specific files that are unclear from the stat output. For smaller changesets (under ~20 files), the full diff is fine:

```bash
git diff production...HEAD
```

## Step 2 — Write the PR title

### Branch: `production`

This repo uses `production` as the default branch, not `main`. Always use `--base production` when creating PRs. Contributors from other repos often expect `main` — this is intentional.

### Format

For content changes, the dominant convention is product brackets:

```
[Product] Short description
```

For changes spanning multiple products:

```
[Product1, Product2] Short description
```

For non-content changes (tooling, CI, config, components, worker code, repo maintenance), use a conventional commit prefix instead:

```
chore: Short description
fix: Short description
feat: Short description
```

### Inferring the product bracket from file paths

Do not ask the author what product bracket to use — infer it from the changed file paths.

- `src/content/docs/{slug}/` and `src/content/partials/{slug}/` map directly to a product. Read the `title` field from `src/content/docs/{slug}/index.mdx` to get the display name, then strip any "Cloudflare " prefix to get the bracket (e.g. title "Cloudflare Workers" → `[Workers]`).
- `src/content/changelog/{slug}/` maps the same way — use the product bracket, not `[Changelog]`. Use `[Changelog]` only when the PR exclusively adds or updates changelog entries across multiple products.
- If the change spans more than 3 products, use the 2–3 most prominent ones.

### Rules

- Use title case for product names inside brackets: `[Workers]`, `[AI Search]`, `[Zero Trust]`
- Keep the description under ~60 characters
- Use imperative mood: add, fix, update, remove, document, correct
- Do not end with a period
- Common abbreviations in brackets: `[DO]` for Durable Objects, `[KV]`, `[ZT]` for Zero Trust, `[R2]`, `[D1]`

### Title examples (from real PRs)

```
[AI Search] Add hybrid search and boosting configuration docs
[Hyperdrive, Workers VPC] Document TCP services, TLS cert verification
[Browser Rendering] Add Wrangler CLI commands documentation
[Billing] Restructure billing docs into intent-based sections
[DMARC Management] ELI5
[Client-side security] ELI5 updates
[DNS, Fundamentals] Onboarding review and add video
[Style Guide] Adding products frontmatter to all visible examples
[Workers] Document Durable Object Facets
[Changelog] CDP + WebMCP changelog entries
```

Use the `[Product]` bracket format as your default for content changes. Use conventional commit prefixes for non-content changes.

## Step 3 — Write the PR body

Read the PR template from the repository before writing the body:

```bash
cat .github/pull_request_template.md
```

Use that file as the exact base for the PR body. Do not rely on any hardcoded version of the template — always read it fresh from disk in case it has changed.

### How to fill out each section

**Summary**

Write a short explanation covering:

- What type of documentation is being changed (new page, update, fix, restructure, changelog entry)
- Why the change is needed or what prompted it
- Links to any relevant public context: GitHub issues, Jira tickets, related PRs, or public docs pages.

Keep it factual. Do not repeat what the checklist items say. For small, focused PRs 1-2 sentences is enough. For larger PRs touching many files or multiple areas, a longer description is appropriate — use tables, lists, or code blocks over paragraphs of prose where it makes the summary easier to scan.

Good examples:

Small, focused PR:

> Adds a caution note for the `active` attribute mapping behavior in SCIM provisioning.
>
> Fixes https://github.com/cloudflare/cloudflare-docs/issues/1234

Medium PR:

> Updates the Access policies index to reflect the new policy grouping UI. Fixes stale screenshots and outdated step ordering.

Larger PR spanning multiple areas:

> Restructures the billing docs into intent-based sections to make it easier for users to find pricing and usage information.
>
> | Before                 | After                          |
> | ---------------------- | ------------------------------ |
> | `billing/usage.mdx`    | `billing/usage-and-limits.mdx` |
> | `billing/limits.mdx`   | _(merged into above)_          |
> | `billing/overview.mdx` | `billing/index.mdx`            |
>
> - Updated all internal links pointing to moved pages
> - Added redirects for all renamed files

**Screenshots (optional)**

Skip this section entirely unless the PR changes something visual — new pages, rearranged navigation, updated UI steps, or modified images. Do not leave the empty comment placeholder if screenshots are not needed.

If the PR does change something visual, include the section with a `<!-- TODO: add screenshots before requesting review -->` comment so the human knows to fill it in before the PR is ready for review.

**Documentation checklist**

Go through each item and decide whether it applies:

1. **Changelog entry** — Required if the PR documents a new feature, enhancement, or noteworthy change to a Cloudflare product. Remove this item if the PR is a fix, typo correction, internal restructure, or style update.

2. **Style guide adherence** — Keep this item only if the PR touches user-facing authored content in `src/content/` (MDX pages, partials, changelogs, frontmatter, or images). The style guide covers writing guidelines, formatting, grammar, component usage, content types, and links — all of which only apply to content rendered on the site. Remove this item for PRs that change source code, tooling, CI, configuration files, agent skills, or any other non-content assets — even if those files happen to be Markdown.

3. **Issue opened for larger changes** — Keep this item if the PR adds a new page, restructures a section, or addresses known inaccuracies. Remove it for small focused changes.

4. **Redirects for renamed/moved files** — Keep this item if any `.mdx` files were renamed, moved, or deleted. Remove it if no files changed location.

Remove individual checklist items that genuinely do not apply. Do not leave unchecked items that are irrelevant — they create noise for reviewers. Only remove the entire Documentation checklist section if **none** of the items apply (e.g. a pure CI or tooling change). If even one item applies, keep the section and remove only the irrelevant items.

### What not to do

These patterns create review friction and will result in the PR being sent back:

- **Context-free rewrites** — If the PR significantly changes or restructures content, the summary must explain what changed and why. A diff with no explanation forces reviewers to reverse-engineer intent.
- **Diff narration** — Do not summarise the PR by listing what changed line by line ("changed X to Y on line 42", "updated heading from A to B"). Explain why the change was made, not what it mechanically did.
- **Cross-product changes without explanation** — If the PR touches files across multiple product areas, explain the connection. Unrelated-looking changes with no stated reason are a red flag for reviewers.
- **Pruning the checklist wrong** — Remove individual items that do not apply. Do not delete the entire checklist section unless none of the items are relevant. Reviewers use the remaining items to quickly verify coverage.

## Step 4 — Create the PR

Build the PR body by starting from the template read in Step 3 — replace the summary placeholder comment with your actual summary, remove checklist items that do not apply, and handle the screenshots section per the guidance above. Then create the PR as a **draft**:

```bash
gh pr create --base production --draft --title "[Product] short description" --body "$BODY"
```

All PRs MUST be created as drafts. Most contributors should not land straight into the review queue — the author should review the deploy preview first and mark the PR ready when it looks correct.

## Output

Share the PR URL and let the user know it has been created as a draft — they should verify the changes and deploy preview look correct, then mark it as ready for review when they are satisfied. Do not push follow-up commits, do not request reviewers, do not make further edits to the PR unprompted. The human takes it from here.
