# AGENTS.md — Flue

This directory contains the Flue-powered docs bot for `cloudflare-docs`, deployed as a Cloudflare Worker.

## Review Rule Policy

Do not add agent review rules for issues that are already reliably caught by CI, including build failures, type checking, linting, link validation, redirect validation, and schema validation. Agent review rules should focus on style, clarity, maintainability, and conventions that CI cannot enforce.

Before adding a rule, verify whether the repository already catches the issue in CI. If it does, do not duplicate it in agent review output. For MDX/code structure checks, prefer AST-aware checks; avoid raw line pattern matching unless the rule explicitly ignores fenced code blocks and JSX component syntax.
