---
description: Review code examples in documentation
agent: review-code-examples
model: anthropic/claude-opus-4-5
---

Review code snippets in documentation files using the @review-code-examples agent. Focus on code within `<TypeScriptExample>`, `<WranglerConfig>`, `<Tabs>`, and fenced code blocks.

Guidance: $ARGUMENTS

Review files the user specifies. If no files specified, find changed `.mdx` files via `git diff --name-only`. If no changes found, ask the user which files to review.