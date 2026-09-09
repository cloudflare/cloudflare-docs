---
name: pr-mr
description: Guides opening, creating, submitting, updating, and editing pull requests and merge requests for cloudflare-docs changes. Covers title conventions, branch naming, request body structure, and documentation checklist templates. Load when asked to open, create, submit, update, or edit a PR or MR, or write a title or description.
---

Use this skill to prepare and manage a pull request or merge request. Use the process appropriate for the contributor's repository to perform repository actions.

## Editing an existing request

When asked to update or edit an existing request description (or title), follow these rules strictly — then stop. Do not proceed to the "Creating a new request" steps below.

1. **Always read the current request description first** before making any changes.
2. **If the description is empty**, treat it as a new request body and follow the template and guidelines in the "Creating a new request" section below.
3. **Follow the existing format** — if the author has structured their description in a particular way, preserve that structure. Do not reformat, reorder, or restructure sections they wrote.
4. **Only change what was asked** — make the minimum edit necessary to fulfill the request. Do not "improve" unrelated phrasing, fix grammar elsewhere, rewrite the summary, or modify checklist items that were not part of the request.

## After pushing to a branch with an open request

Whenever you push new commits to a branch that already has an open request, check whether its title and description still accurately describe what the branch now does. New commits often add scope the original description does not mention.

1. Check whether the branch has an open request.
2. Compare the title and body against the full branch diff (`git diff production...HEAD --stat`), not just the latest commit.
3. If they are now inaccurate or incomplete, update them following the "Editing an existing request" rules above — preserve the author's structure and make the minimum edit needed to reflect the new changes. If they still describe the branch correctly, leave them unchanged.

Do this proactively after a push; you do not need to be asked separately to keep the request in sync.

## Creating a new request

Follow Steps 1–4 below only when creating a new request (or when an existing request has an empty description).

## Step 1 — Gather context

Run `--stat` first to understand the scope without blowing up context:

```bash
git log --oneline production..HEAD
git diff production...HEAD --stat
git status
```

**If `git status` shows untracked or modified files**, stop and ask the user whether those files should be committed as part of this request before proceeding. Do not silently ignore them — they may be integral to the work being submitted.

If the stat output shows more than ~20 files changed, do **not** run the full diff. Instead, read specific files that are unclear from the stat output. For smaller changesets (under ~20 files), the full diff is fine:

```bash
git diff production...HEAD
```

## Step 2 — Write the request title

### Branch: `production`

This repo uses `production` as the default branch, not `main`. Contributors from other repos often expect `main` — this is intentional.

Create feature branches off an up-to-date `production` commit unless the user asked for a different base.

### Format

For content changes, the dominant convention is product brackets:

```
[Product] Short description
```

For changes spanning multiple products:

```
[Product1, Product2] Short description
```

For non-content changes such as tooling, CI, configuration, components, worker code, or repository maintenance, use a conventional commit prefix:

```
chore: Short description
fix: Short description
feat: Short description
```

### Inferring the product bracket from file paths

Do not ask the author what product bracket to use — infer it from the changed file paths.

- `src/content/docs/{slug}/` and `src/content/partials/{slug}/` map directly to a product. Read the `title` field from `src/content/docs/{slug}/index.mdx` to get the display name, then strip any "Cloudflare " prefix to get the bracket (e.g. title "Cloudflare Workers" → `[Workers]`).
- `src/content/changelog/{slug}/` maps the same way — use the product bracket, not `[Changelog]`. Use `[Changelog]` only when the request exclusively adds or updates changelog entries across multiple products.
- If the change spans more than 3 products, use the 2–3 most prominent ones.

### Rules

- Use title case for product names inside brackets: `[Workers]`, `[AI Search]`, `[Zero Trust]`
- Keep the description under ~60 characters
- Use imperative mood: add, fix, update, remove, document, correct
- Do not end with a period
- Common abbreviations in brackets: `[DO]` for Durable Objects, `[KV]`, `[ZT]` for Zero Trust, `[R2]`, `[D1]`

### Title examples

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

## Step 3 — Write the request body

Read the request template from the repository before writing the body. Use it as the exact base for the request body. Do not rely on any hardcoded version of the template — always read it fresh from disk in case it has changed.

### How to fill out each section

### Summary

Write a short explanation covering:

- What type of documentation is being changed (new page, update, fix, restructure, changelog entry)
- Why the change is needed or what prompted it
- Links to any relevant public context: issues, related PRs, or public docs pages.

This is a public, open-source repository. Do not include private Cloudflare information, secrets, credentials, environment variable values, or URLs and titles of internal resources (tickets, wiki pages, internal docs) in request titles, descriptions, or comments. If there is any doubt about whether something is safe to publish, stop and ask the user.

Keep it factual. Do not repeat what the checklist items say. For small, focused requests 1-2 sentences is enough. For larger requests touching many files or multiple areas, a longer description is appropriate — use tables, lists, or code blocks over paragraphs of prose where it makes the summary easier to scan.

Good examples:

Small, focused request:

> Adds a caution note for the `active` attribute mapping behavior in SCIM provisioning.
>
> Fixes #1234

Medium request:

> Updates the Access policies index to reflect the new policy grouping UI. Fixes stale screenshots and outdated step ordering.

Larger request spanning multiple areas:

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

### Screenshots (optional)

Skip this section entirely unless the request changes something visual — new pages, rearranged navigation, updated UI steps, or modified images. Do not leave the empty comment placeholder if screenshots are not needed.

If the request does change something visual, include the section with a `<!-- TODO: add screenshots before requesting review -->` comment so the human knows to fill it in before the request is ready for review.

### Documentation checklist

Go through each item and decide whether it applies:

1. **Changelog entry** — Required if the request documents a new feature, enhancement, or noteworthy change to a Cloudflare product. Remove this item if the request is a fix, typo correction, internal restructure, or style update.

2. **Style guide adherence** — Check the diff for files under `src/content/` or authored component files (`.mdx`, `.astro`, `.css`). Keep this item **only** if at least one such file was added or modified. Remove this item if the request exclusively changes source code (`.ts`, `.tsx`, `.js`), tooling, CI, configuration files, agent skills, or any other non-content assets — even if those files live under `src/` or happen to be Markdown.

3. **Issue opened for larger changes** — Keep this item if the request adds a new page, restructures a section, or addresses known inaccuracies. Remove it for small focused changes.

4. **Redirects for renamed/moved files** — Keep this item if any `.mdx` files were renamed, moved, or deleted. Remove it if no files changed location.

Remove individual checklist items that genuinely do not apply. Do not leave unchecked items that are irrelevant — they create noise for reviewers. Only remove the entire Documentation checklist section if **none** of the items apply (e.g. a pure CI or tooling change). If even one item applies, keep the section and remove only the irrelevant items.

### What not to do

- **Context-free rewrites** — If the request significantly changes or restructures content, the summary must explain what changed and why. A diff with no explanation forces reviewers to reverse-engineer intent.
- **Diff narration** — Do not summarise the request by listing what changed line by line ("changed X to Y on line 42", "updated heading from A to B"). Explain why the change was made, not what it mechanically did.
- **Cross-product changes without explanation** — If the request touches files across multiple product areas, explain the connection. Unrelated-looking changes with no stated reason are a red flag for reviewers.
- **Pruning the checklist wrong** — Remove individual items that do not apply. Do not delete the entire checklist section unless none of the items are relevant. Reviewers use the remaining items to quickly verify coverage.

## Step 4 — Prepare the request

Build the request body by starting from the template read in Step 3 — replace the summary placeholder comment with the actual summary, remove checklist items that do not apply, and handle the screenshots section per the guidance above.

Create all requests as drafts. The author should review the deploy preview before marking the request ready for review.

## Output

Share the proposed title and body. Do not create, edit, or link to a pull request or merge request.
