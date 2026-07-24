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
- Lifecycle: https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/
- Process model: https://developers.cloudflare.com/sandbox/1-0-preview/processes/
- Terminals: https://developers.cloudflare.com/sandbox/1-0-preview/terminals/
- Errors and recovery: https://developers.cloudflare.com/sandbox/1-0-preview/errors/
- Environment variables: https://developers.cloudflare.com/sandbox/1-0-preview/environment/
- Code interpreter: https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/
- Extensions: https://developers.cloudflare.com/sandbox/1-0-preview/extensions/
- Bridge: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/
- Bridge HTTP API: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/http-api/
- API hub: https://developers.cloudflare.com/sandbox/1-0-preview/api/
- Processes API: https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/
- Terminals API: https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/
- Errors API: https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/
- Interpreter API: https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/

## Guidance for agents

1. Prefer `@next` for new work and planned migrations; do not force a production cutover without the user agreeing.
2. Deploy Worker package and container image from the **same** preview line. Never mix `@next` Worker code with a stable container image.
3. Prefer installed `@next` types and the human docs above over inventing APIs.
4. Never put internal release calendars or private timelines in user-facing text.
5. Keep stable docs links available for teams that remain on the current package.
6. **Error handling matters.** Do not wrap every sandbox call in the same retry loop: https://developers.cloudflare.com/sandbox/1-0-preview/errors/
7. Do **not** invent a git extension API or restore `gitCheckout` on core `Sandbox`. Run `git` via argv `exec`.
8. OpenCode / OpenAI adapter details are optional package surfaces — confirm exports in the installed `@next` package; do not invent helpers.

## Search before migrating

```sh
rg 'SANDBOX_TRANSPORT|transport:|setTransport|enableDefaultSession|createSession|getSession|deleteSession|execStream\(|startProcess\(|killProcess\(|sandbox\.terminal\(|sessionId|gitCheckout\(|SandboxTransport|ExecutionSession|/v1/sandbox/.*/exec|/v1/sandbox/.*/session|/v1/sandbox/.*/pty|timeout_ms|Session-Id'
```

Also find string `exec(` sites, session shell assumptions (`cd` then later `exec`), and bare `createCodeContext` / `runCode` on `Sandbox` (should move to `sandbox.interpreter` after `withInterpreter`).

## Mechanical changes

### Package

- Dependency: `@cloudflare/sandbox@next`
- Dockerfile / container: matching preview image (`cloudflare/sandbox:next` or the same exact prerelease tag)
- Bridge template (if used): https://github.com/cloudflare/sandbox-sdk/tree/next/bridge/worker

### Transport

- Remove transport settings entirely (`SANDBOX_TRANSPORT`, `transport` on `getSandbox`, `setTransport`)

### Execution

```ts
const p = await sandbox.exec(["/bin/bash", "-lc", "npm test"]);
const out = await p.output({ encoding: "utf8" });
```

- `await exec` = **launch**, not completion
- `output()` defaults to **bytes**; pass `{ encoding: "utf8" }` for strings
- Observation timeout/abort does **not** kill; `exec` `timeout` is remote process lifetime
- Process handles have **no stdin**; use argv/`cwd`/`env`, or a terminal for interactive PTY
- `waitForPort` default mode is **`tcp`**; pass `mode: "http"` for HTTP readiness
- `kill(signal?)` takes a **numeric** signal only (default `15`)
- Processes run in the current **container** for a **sandbox ID**; same sandbox ID ≠ same container forever
- `getProcess` / `listProcesses` do not start a container; return `null` / `[]` when none is running
- After container stop/replace: stale-handle; store the job and `exec` again
- API: https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/
- Lifetime: https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives
- Lifecycle: https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/

### Sessions and environment

- Remove session APIs
- Pass `cwd` / `env` on each `exec`, or one shell argv script for multi-step shell syntax
- `setEnvVars` merges into later launches (Durable Object memory; not filesystem-durable alone)
- **Non-secret** config only in sandbox env
- Live credentials: Worker secrets + outbound handlers — https://developers.cloudflare.com/sandbox/guides/outbound-traffic/
- https://developers.cloudflare.com/sandbox/1-0-preview/environment/

### Terminals

```ts
const terminal = await sandbox.createTerminal({ command: ["bash"] });
const t = await sandbox.getTerminal(terminal.id);
if (t) return t.connect(request, { cursor });
```

- Browser helper: `@cloudflare/sandbox/xterm` with `{ sandboxId, terminalId }` (not `sessionId`)
- Docs: https://developers.cloudflare.com/sandbox/1-0-preview/terminals/
- API: https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/

### Errors

| Error | What to do |
| ----- | ---------- |
| `ContainerUnavailableError` | Container did not start the work — back off, then try the work again |
| `OperationInterruptedError` | Work may have started — read `reason` / `retryable`; check state before repeating |
| `RPCTransportError` | Lost contact during the call — later calls may work; this call may already have run |
| `StaleProcessHandleError` / `StaleTerminalHandleError` | Start again from stored work state |
| `ProcessWaitTimeoutError` / `ProcessAbortedError` | Wait ended only; process may still run |
| `RuntimeControlProtocolError` / bad image after deploy | Worker package and container image must match on the same `@next` line; not a slow-start retry |

- Prefer `instanceof` on classes from `@cloudflare/sandbox`
- Catalog: https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/
- Guidance: https://developers.cloudflare.com/sandbox/1-0-preview/errors/

### Interpreter

```ts
import { withInterpreter } from "@cloudflare/sandbox/interpreter";
// on Sandbox subclass:
interpreter = withInterpreter(this);
// sandbox.interpreter.createCodeContext / runCode / ...
```

- How-to: https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/
- API: https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/
- Python needs the **`-python`** image variant; same `@next` Worker + image line
- `runCode` returns plain serializable `ExecutionResult`

### Git

- `gitCheckout` removed — use argv `exec`, e.g. `["git", "clone", url, dir]` then `output()` / waits

### Bridge (self-deployed Worker)

- Not a Cloudflare-hosted shared API — user deploys the Worker
- Template: https://github.com/cloudflare/sandbox-sdk/tree/next/bridge/worker
- Pair `@cloudflare/sandbox@next` with `cloudflare/sandbox:next`
- HTTP: `/processes`, `/terminals` — **not** `/exec`, sessions, or `/pty`
- Process create body uses `timeout` (not `timeout_ms`)
- Docs: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/
- HTTP reference: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/http-api/

### Other APIs (mostly unchanged)

Files, mounts, backups, ports/tunnels, `proxyToSandbox`, and lifecycle options remain available. Prefer main Sandbox docs for signatures; skip sessions, transport selection, string exec helpers, and `sandbox.terminal` where those pages still describe them.

## Validation

1. Typecheck against `@next`
2. Smoke argv `exec` + `output({ encoding: "utf8" })`
3. Smoke long-running process (`waitForPort` / `logs`)
4. Smoke terminal create + connect if the app uses a terminal UI
5. Confirm error handling does not retry every failure the same way
6. Smoke interpreter if used (correct image variant)
7. Confirm no live secrets in sandbox env
8. Grep again for removed APIs (including bridge `/exec` / sessions / `/pty` if applicable)
9. If bridge: redeploy `next` template and update HTTP clients
