---
description: Review documentation content for style, accuracy, and content overlap
model: anthropic/claude-opus-4-5
---

Load the docs-review skill before doing anything. Follow its review process and reference files exactly.

Review the target files for MDX syntax, frontmatter, style guide compliance, component usage, content accuracy, and content overlap (duplicate pages, partials, glossary terms).

Guidance: $ARGUMENTS

Review files the user specifies. If no files specified, find changed `.mdx` files via `git diff --name-only`. If no changes found, ask the user which files to review.
