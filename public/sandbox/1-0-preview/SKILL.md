---
name: sandbox-1-0-preview
description: Help users adopt the Cloudflare Sandbox SDK 1.0 preview (@cloudflare/sandbox@next), including new projects and migrations from the stable package. Prefer @next for new work; migrate existing apps when the user is ready for 1.0.
---

# Sandbox SDK 1.0 preview (`@next`)

**Sandbox SDK 1.0** is the next major release. It is available as `@cloudflare/sandbox@next` while the current stable package remains published.

## When to use this skill

- The user wants `@cloudflare/sandbox@next` or the **1.0 preview**.
- The user is starting a **new** Sandbox project — prefer the preview.
- The user wants to **migrate** an existing app toward Sandbox SDK 1.0.

If the user explicitly wants to stay on the current stable package only, use the stable docs instead: https://developers.cloudflare.com/sandbox/

## Human documentation (preview section)

- Hub: https://developers.cloudflare.com/sandbox/1-0-preview/
- Get started: https://developers.cloudflare.com/sandbox/1-0-preview/get-started/
- Migrate: https://developers.cloudflare.com/sandbox/1-0-preview/migrate/
- Process model: https://developers.cloudflare.com/sandbox/1-0-preview/processes/
- Terminals: https://developers.cloudflare.com/sandbox/1-0-preview/terminals/
- API reference: https://developers.cloudflare.com/sandbox/1-0-preview/api/
- Processes API: https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/
- Terminals API: https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/
- Extensions: https://developers.cloudflare.com/sandbox/1-0-preview/extensions/

## Guidance for agents

1. Encourage adoption of `@next` for new work and planned migrations; do not force a production cutover without the user agreeing.
2. Deploy Worker package and container image from the same preview line.
3. Prefer installed `@next` types over inventing APIs.
4. Never put internal release calendars or private timelines in user-facing text.
5. Keep stable docs links available for teams that remain on the current package for now.

## Search before migrating

```sh
rg 'SANDBOX_TRANSPORT|transport:|setTransport|enableDefaultSession|createSession|getSession|execStream\(|startProcess\(|killProcess\(|sandbox\.terminal\(|sessionId|createCodeContext\(|runCode\(|SandboxTransport|ExecutionSession'
```

Also find string `exec(` sites and session shell assumptions (`cd` then later `exec`).

## Mechanical changes

### Package

- Dependency: `@cloudflare/sandbox@next`
- Align Dockerfile / container with that preview

### Transport

- Remove transport settings entirely

### Execution

```ts
const p = await sandbox.exec(["/bin/bash", "-lc", "npm test"]);
const out = await p.output({ encoding: "utf8" });
```

- `await exec` = launch, not completion
- Observation timeout/abort does not kill; `exec` `timeout` is remote process lifetime
- Processes run in the current **container** for a **sandbox ID**; same sandbox ID ≠ same container forever
- `getProcess` / `listProcesses` do not start a container; return `null` / `[]` when none is running
- After the container stops or is replaced, old process IDs/handles are gone (stale-handle); store the job and `exec` again
- Canonical explanation: https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives

### Sessions

- Remove core session APIs
- Pass `cwd` / `env` on each `exec`, or one shell argv script for multi-step shell syntax

### Terminals

```ts
const terminal = await sandbox.createTerminal({ command: ["bash"] });
const t = await sandbox.getTerminal(terminal.id);
if (t) return t.connect(request, { cursor });
```

- Browser helper: `@cloudflare/sandbox/xterm` with `{ sandboxId, terminalId }`
- Docs: https://developers.cloudflare.com/sandbox/1-0-preview/terminals/

### Extensions

```ts
interpreter = withInterpreter(this);
```

## Validation

1. Typecheck against `@next`
2. Smoke argv exec + `output()`
3. Smoke long-running process
4. Smoke terminal create + connect if the app uses a terminal UI
5. Smoke extensions in use
6. Grep again for removed APIs
