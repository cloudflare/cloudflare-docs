---
description: Review code examples in documentation
model: anthropic/claude-opus-4-5
---

Load the code-review skill before doing anything. Follow its review process and reference files exactly.

Review every code snippet in the target files: fenced code blocks, `<TypeScriptExample>`, `<WranglerConfig>`, `<Tabs>`, and `<APIRequest>` components. Do not skip any.

When editing code, follow these rules:

- Copy original lines verbatim first, then change only the specific tokens that need fixing
- Note the indentation style before editing and confirm your replacement matches
- Prefer small edits — multiple single-line edits are safer than one large multi-line replacement
- Re-read modified lines from the file to confirm indentation is correct before moving on

Guidance: $ARGUMENTS

Review files the user specifies. If no files specified, find changed `.mdx` files via `git diff --name-only`. If no changes found, ask the user which files to review.
