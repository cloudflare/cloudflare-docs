---
title: Code Blocks
description: Rules for fenced code blocks that are not component-specific.
---

## Language Identifiers

- If an opening fence has no language identifier (bare ` ``` `) → **warning**: always specify a language; use `txt` if no appropriate language exists.
- If a fence uses a capitalized language name (`JSON`, `YAML`, `TypeScript`, `JavaScript`, `Go`) → **warning**: language identifiers must be lowercase (`json`, `yaml`, `ts`, `js`, `go`).

## Terminal Commands

- If a command line inside a code block starts with `$ `, `% `, or `PS> ` → **warning**: remove the shell prefix. The copy button copies it verbatim.
- Use `sh` or `bash` for Linux/macOS shell commands.
- Use `powershell` for Windows PowerShell.
- Use `txt` for Windows console (`cmd.exe`) commands.

## Line Breaks

- If a code-block line ends with two or more trailing spaces → **suggestion**: use `<br/>` instead of trailing spaces.

## Output Blocks

- If a command block is followed by output inline in the same block → **suggestion**: show output in a separate `txt` block immediately after the command block.

---

## Component Alternatives (MDX files only)

These suggestions apply **only** when the file is under `src/content/docs/` or `src/content/partials/`. Use judgment — a bare fence inside a `:::note` showing a one-liner error message is fine.

- If a raw ` ```ts `, ` ```tsx `, ` ```js `, or ` ```jsx ` fenced block appears in a docs/partials MDX file → **warning**: use `<TypeScriptExample>` instead; it auto-generates a JS tab from the TypeScript source.
- If a raw ` ```toml ` or ` ```jsonc ` fenced block contains Wrangler configuration keys (`name`, `main`, `compatibility_date`) → **warning**: use `<WranglerConfig>` instead; it auto-converts between TOML and JSONC.
- If a raw ` ```sh ` or ` ```bash ` block contains only package-manager install commands (`npm install`, `yarn add`, `pnpm add`, `bun add`) → **warning**: use `<PackageManagers>` instead.
