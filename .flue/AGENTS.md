# AGENTS.md — Flue

This directory contains the Flue-powered docs bot for `cloudflare-docs`, deployed as a Cloudflare Worker.

## Verified CI enforcement finding

Do not assume the docs CI enforces every rule from `.agents/references/style-guide.md`.

- `WranglerConfig` currently accepts both TOML and JSONC input in `src/components/WranglerConfig.astro`; TOML input is a style convention, not a build-enforced requirement.
- `pcx_content_type` is currently an optional string in `src/schemas/base.ts`; CI does not enforce the documented enum values or require it on every docs page.
- `description` is not required on every docs page by `src/schemas/base.ts`; treat missing or weak descriptions as review findings, not schema failures.
- Real MDX parse errors are build-enforced, but regex-style checks for unescaped `{`, `}`, `<`, or `>` create false positives on JSX component tags, JavaScript expressions, and TypeScript generics inside code blocks.

When adding Flue review rules, prefer AST-aware checks for MDX/code structure. Avoid raw line pattern matching for syntax characters unless the rule explicitly ignores fenced code blocks and JSX component syntax.
