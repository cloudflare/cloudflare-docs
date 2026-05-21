# Code blocks

## Language identifiers

Always specify a language after the opening fence. Language names must be **lowercase**.

Supported languages: `bash` (alias: `curl`), `c`, `css`, `dart`, `diff`, `go`, `graphql`, `hcl` (alias: `tf`), `html`, `ini`, `java`, `js` (alias: `javascript`), `json`, `jsonc`, `kotlin`, `mdx`, `php`, `powershell`, `python` (alias: `py`), `ruby` (alias: `rb`), `rust` (alias: `rs`), `sh` (alias: `shell`), `sql`, `swift`, `toml`, `ts` (alias: `typescript`), `txt` (aliases: `text`, `plaintext`), `xml`, `yaml` (alias: `yml`).

Use `txt` for output blocks, environment configs, Apache config, or anything not in the list above.

**Warning:**
- ` ``` ` with no language identifier (bare fence)
- Unsupported language identifiers: `output`, `env`, `csharp`, `promql`, `Go` (must be `go`), `JavaScript` (must be `js` or `javascript`)
- Any language identifier that is not lowercase (e.g. `JSON`, `YAML`, `TypeScript`)

## Terminal commands

Do not prefix terminal commands with `$`, `%`, `PS>`, or similar. The copy button copies verbatim — the prefix would be included.

**Warning:** any `+` line inside a code block that starts with `$ `, `% `, or `PS> `.

Use `sh` or `bash` for Linux/macOS shell commands. Use `powershell` for Windows PowerShell. Use `txt` for Windows console (cmd.exe) commands.

## Mandatory Cloudflare components

Workers JS/TS examples must use `<TypeScriptExample>` — not bare ` ```js ` or ` ```ts ` fences.

**Warning:** any ` ```js ` or ` ```ts ` fence that contains Workers-style code (imports from `cloudflare:workers`, `hono`, `@cloudflare/`, or exports a `default` handler).

Wrangler config must use `<WranglerConfig>` — not bare ` ```toml ` fences when the content is a `wrangler.toml` / `wrangler.jsonc`.

**Warning:** any ` ```toml ` fence that looks like a `wrangler.toml` (contains `name =`, `compatibility_date =`, `[vars]`, `[[kv_namespaces]]`, etc.).

Package install/exec commands must use `<PackageManagers>` — not bare `npm install`, `yarn add`, `pnpm add` commands in a code fence.

**Warning:** any code block that contains only `npm install`, `yarn add`, `pnpm add`, or `npx` commands without using `<PackageManagers>`.

## Command output

Show output in a separate code block immediately after the command, using the `output` language suffix:

````
```sh
wrangler deploy
```

```txt output
Deployed...
```
````

This is a convention, not a build-breaking rule. **Suggestion:** if output is shown inline in the command block.

## Line breaks

Use `<br/>`, never two trailing spaces (invisible and error-prone).

**Suggestion:** any `+` line that ends with two or more spaces.
