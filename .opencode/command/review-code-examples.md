---
description: Review code examples in documentation
model: anthropic/claude-opus-4-5
---

Use the code-review skill to review code snippets in documentation files. Focus on code within `<TypeScriptExample>`, `<WranglerConfig>`, `<Tabs>`, and fenced code blocks.

Follow the skill's review process: fetch latest types and schema, categorize each code block, validate with tools, and check against the rules in the skill's references.

When editing code, follow these rules:

- Copy original lines verbatim first, then change only the specific tokens that need fixing
- Note the indentation style before editing and confirm your replacement matches
- Prefer small edits — multiple single-line edits are safer than one large multi-line replacement
- Re-read modified lines from the file to confirm indentation is correct before moving on

Guidance: $ARGUMENTS

Review files the user specifies. If no files specified, find changed `.mdx` files via `git diff --name-only`. If no changes found, ask the user which files to review.
