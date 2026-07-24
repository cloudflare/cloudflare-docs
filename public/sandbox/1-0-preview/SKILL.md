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
- API reference: https://developers.cloudflare.com/sandbox/1-0-preview/api/
- Processes API: https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/
- Terminals API: https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/
- Errors API: https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/
- Extensions: https://developers.cloudflare.com/sandbox/1-0-preview/extensions/
- Environment variables: https://developers.cloudflare.com/sandbox/1-0-preview/environment/
- Code interpreter: https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/
- Interpreter API: https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/
- Bridge: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/
- Bridge HTTP API: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/http-api/

## Guidance for agents

1. Encourage adoption of `@next` for new work and planned migrations; do not force a production cutover without the user agreeing.
2. Deploy Worker package and container image from the same preview line.
3. Prefer installed `@next` types over inventing APIs.
4. Never put internal release calendars or private timelines in user-facing text.
5. Keep stable docs links available for teams that remain on the current package for now.
6. **Error handling matters.** Do not wrap every sandbox call in the same retry loop. Follow https://developers.cloudflare.com/sandbox/1-0-preview/errors/

## Search before migrating

```sh
rg 'SANDBOX_TRANSPORT|transport:|setTransport|enableDefaultSession|createSession|getSession|execStream\(|startProcess\(|killProcess\(|sandbox\.terminal\(|sessionId|gitCheckout\(|createCodeContext\(|runCode\(|SandboxTransport|ExecutionSession'
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
- Process handles have **no stdin**; use argv/`cwd`/`env`, or a terminal for interactive PTY
- `waitForPort` default mode is **`tcp`** (not HTTP); pass `mode: "http"` for HTTP readiness
- `kill(signal?)` takes a **numeric** signal only (default `15`)
- Wait/log/port option details: https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/
- Processes run in the current **container** for a **sandbox ID**; same sandbox ID ≠ same container forever
- `getProcess` / `listProcesses` do not start a container; return `null` / `[]` when none is running
- After the container stops or is replaced, old process IDs/handles are gone (stale-handle); store the job and `exec` again
- Lifecycle model: https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/
- Process lifetime: https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives

### Sessions and environment

- Remove session APIs
- Pass `cwd` / `env` on each `exec`, or one shell argv script for multi-step shell syntax
- `setEnvVars` merges into later `exec` launches (memory on the Durable Object; not filesystem-durable)
- Per-launch `env` on `exec` / `createTerminal` as needed for **non-secret** config
- Do **not** put live API keys or long-lived credentials in the sandbox; use outbound handlers: https://developers.cloudflare.com/sandbox/guides/outbound-traffic/
- https://developers.cloudflare.com/sandbox/1-0-preview/environment/

### Terminals

```ts
const terminal = await sandbox.createTerminal({ command: ["bash"] });
const t = await sandbox.getTerminal(terminal.id);
if (t) return t.connect(request, { cursor });
```

- Browser helper: `@cloudflare/sandbox/xterm` with `{ sandboxId, terminalId }`
- Docs: https://developers.cloudflare.com/sandbox/1-0-preview/terminals/

### Errors

| Error | What to do |
| ----- | ---------- |
| `ContainerUnavailableError` | Container did not start the work — back off, then try the work again |
| `OperationInterruptedError` | Work may have started — read `reason` / `retryable` and check state before repeating |
| `RPCTransportError` | Lost contact during the call — later calls may work; this call may already have run |
| `StaleProcessHandleError` / `StaleTerminalHandleError` | Start again from stored work state |
| `ProcessWaitTimeoutError` / `ProcessAbortedError` | Wait ended only; process may still run |
| `RuntimeControlProtocolError` / bad image after deploy | Worker package and container image must match on the same `@next` line; not a slow-start retry |

- Prefer `instanceof` on classes from `@cloudflare/sandbox`
- Full catalog: https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/
- Guidance: https://developers.cloudflare.com/sandbox/1-0-preview/errors/

### Extensions

```ts
import { withInterpreter } from "@cloudflare/sandbox/interpreter";
// on Sandbox subclass:
interpreter = withInterpreter(this);
// then: sandbox.interpreter.createCodeContext / runCode / ...
```

- How-to: https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/
- API: https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/
- Python needs the `-python` image variant; same `@next` Worker + image line

### Other APIs

Files, mounts, backups, ports/tunnels, and lifecycle options remain available. Prefer the main Sandbox docs for signatures; skip sessions, transport selection, string exec helpers, and `sandbox.terminal` where those pages still describe them.

Environment variables on `@next`: https://developers.cloudflare.com/sandbox/1-0-preview/environment/

- `gitCheckout` is removed on `@next` — run `git` with argv `exec`

### Bridge (self-deployed Worker)

- Template: `https://github.com/cloudflare/sandbox-sdk/tree/next/bridge/worker`
- npm `@next` + Docker `cloudflare/sandbox:next` (same line)
- HTTP: `/processes`, `/terminals` — not `/exec`, sessions, or `/pty`
- Docs: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/

## Validation

1. Typecheck against `@next`
2. Smoke argv exec + `output()`
3. Smoke long-running process
4. Smoke terminal create + connect if the app uses a terminal UI
5. Confirm error handling does not retry every failure the same way
6. Smoke extensions in use
7. Grep again for removed APIs
