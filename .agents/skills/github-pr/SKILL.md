---
name: github-pr
description: Drafts GitHub pull request titles and descriptions for cloudflare-docs changes. Do not use for GitLab merge requests or internal mirrors. Load when asked to write a PR title or description.
---

Use this skill to draft a GitHub pull request title or description. Do not use it to create, edit, or manage a pull request. The contributor must use the process appropriate for their repository.

## Editing an existing PR

When asked to update an existing PR description or title:

1. Read the current title and description first.
2. Follow the author's existing format. Do not reformat, reorder, or restructure sections they wrote.
3. Change only what was requested. Do not improve unrelated phrasing, fix grammar elsewhere, rewrite the summary, or modify unrelated checklist items.

## Write the PR title

For content changes, use the product bracket convention:

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

Infer the product bracket from changed file paths instead of asking the author.

- `src/content/docs/{slug}/` and `src/content/partials/{slug}/` map directly to a product. Read the `title` field from `src/content/docs/{slug}/index.mdx` to get the display name, then remove any `Cloudflare ` prefix.
- `src/content/changelog/{slug}/` maps the same way. Use `[Changelog]` only when a PR exclusively changes changelog entries across multiple products.
- If a change spans more than three products, use the two or three most prominent ones.

### Rules

- Use title case for product names inside brackets: `[Workers]`, `[AI Search]`, `[Zero Trust]`.
- Keep the description under approximately 60 characters.
- Use imperative mood: add, fix, update, remove, document, correct.
- Do not end with a period.
- Common abbreviations in brackets: `[DO]` for Durable Objects, `[KV]`, `[ZT]` for Zero Trust, `[R2]`, `[D1]`.

## Write the PR body

Read the repository's PR template before drafting the body. Use it as the exact base and remove sections or checklist items that do not apply.

### Summary

Write a short explanation covering:

- What type of documentation is changing: new page, update, fix, restructure, or changelog entry.
- Why the change is needed or what prompted it.
- Relevant public context, such as issues, related PRs, or public documentation.

This is a public, open-source repository. Do not include private Cloudflare information, secrets, credentials, environment variable values, or internal resources. If there is any doubt about whether information is safe to publish, ask the user.

Keep it factual. For small, focused PRs, one or two sentences are enough. For larger changes, use tables, lists, or code blocks when they make the summary easier to scan.

### Screenshots

Include this section only when a PR changes something visual, such as new pages, navigation, UI steps, or images. Otherwise, remove the empty section.

### Documentation checklist

Keep only items that apply:

1. **Changelog entry**: Keep for a new feature, enhancement, or noteworthy product change. Remove for fixes, typo corrections, internal restructures, or style updates.
2. **Style guide adherence**: Keep when changing content or authored component files such as `.mdx`, `.astro`, or `.css`. Remove for source code, tooling, CI, configuration, agent skills, and other non-content assets.
3. **Issue opened for larger changes**: Keep for a new page, section restructure, or known inaccuracy. Remove for small, focused changes.
4. **Redirects for renamed or moved files**: Keep when `.mdx` files were renamed, moved, or deleted. Remove otherwise.

Remove individual checklist items that do not apply. Remove the entire checklist only when none apply.

## Output

Provide the proposed title and body. Do not create, edit, or link to a pull request.
