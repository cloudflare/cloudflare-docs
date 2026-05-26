---
title: Code Blocks
description: Rules for fenced code blocks that are not component-specific.
---

## Language Identifiers

- If an opening fence has no language identifier (bare ` ``` `) → **warning**: always specify a language.
- If a fence uses an unsupported language identifier (`output`, `env`, `csharp`, `promql`) → **warning**: use `txt` for unsupported types.
- If a fence uses a capitalized language name (`JSON`, `YAML`, `TypeScript`, `JavaScript`, `Go`) → **warning**: language identifiers must be lowercase (`json`, `yaml`, `ts`, `js`, `go`).

**Supported languages:** `bash` (alias `curl`), `c`, `css`, `dart`, `diff`, `go`, `graphql`, `hcl` (alias `tf`), `html`, `ini`, `java`, `js` (alias `javascript`), `json`, `jsonc`, `kotlin`, `mdx`, `php`, `powershell`, `python` (alias `py`), `ruby` (alias `rb`), `rust` (alias `rs`), `sh` (alias `shell`), `sql`, `swift`, `toml`, `ts` (alias `typescript`), `txt` (aliases `text`, `plaintext`), `xml`, `yaml` (alias `yml`).

Use `txt` for: output blocks, environment configs, Apache config, or anything not in the list above.

## Terminal Commands

- If a command line inside a code block starts with `$ `, `% `, or `PS> ` → **warning**: remove the shell prefix. The copy button copies it verbatim.
- Use `sh` or `bash` for Linux/macOS shell commands.
- Use `powershell` for Windows PowerShell.
- Use `txt` for Windows console (`cmd.exe`) commands.

## Line Breaks

- If a code-block line ends with two or more trailing spaces → **suggestion**: use `<br/>` instead of trailing spaces.

## Output Blocks

- If a command block is followed by output inline in the same block → **suggestion**: show output in a separate `txt` block immediately after the command block.
