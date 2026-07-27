---
name: sandbox-v1-migration
description: Use when migrating a Cloudflare Sandbox SDK app from the stable package to @cloudflare/sandbox@next (Sandbox SDK 1.0 preview), or when stable APIs such as string exec, sessions, execStream, startProcess, sandbox.terminal, gitCheckout, SANDBOX_TRANSPORT, or bridge /exec appear in code that should move to 1.0.
---

# Migrate to Sandbox SDK 1.0 preview (`@next`)

This skill is a **portable runbook**. An agent may only have this file (pasted URL, downloaded `SKILL.md`, or local skills folder). Do **not** require fetching docs to perform the migration. Human docs deepen edge cases; this file must be enough to audit, edit, deploy, and validate.

Prefer `@next` for **new** Sandbox work. For migrations: do not force production cutover without the user agreeing.

**Human docs (optional depth):**  
https://developers.cloudflare.com/sandbox/1-0-preview/migrate/  
https://developers.cloudflare.com/sandbox/1-0-preview/  
**Stable-only:** https://developers.cloudflare.com/sandbox/

## Workflow

1. **Review** the rules and replacement map below.
2. **Audit** the codebase with the search; list every hit and its target shape.
3. **Clarify** with the user: cutover timing, bridge Worker, Python image, unclear call sites.
4. **Upgrade** package + image, apply code edits from this file, then deploy cutover.
5. **Validate** typecheck, smokes, and a second grep.

Stop after any step that needs a user decision.

## Hard rules

- Worker npm package and container image must be the **same** `@next` line. Never mix `@next` Worker code with a stable image (or the reverse).
- Production cutover uses immediate container rollout (command below). Stable and `@next` control protocols are incompatible both ways; a gradual container rollout leaves a broken mixed window.
- `await sandbox.exec(...)` means **process launched**, not **command finished**.
- Argv is passed to the process **as-is** (no implicit shell, no shell-escaping of argv). Shell syntax needs an explicit shell binary.
- Process handles have **no stdin**. Interactive input → terminals.
- Observation `timeout` / `AbortSignal` on `output` / waits / `logs` cancel **only that wait**. They do **not** kill the process. Use `kill(signal?)` (numeric; default `15`) or `exec` remote `timeout`.
- Do **not** use one retry loop for every error (table below).
- Do **not** invent APIs: no `gitCheckout` on core, no process stdin, no string-exec completion helper, no custom extension authoring guide.
- No internal release calendars in user-facing text.
- Prefer installed `@next` TypeScript types when resolving API details.

## 1. Review — what changes

| Stable | Preview |
| ------ | ------- |
| `SANDBOX_TRANSPORT` / `transport` / `setTransport` | Remove — RPC only |
| `await sandbox.exec("cmd")` → buffered result | `await sandbox.exec(argv)` → handle, then `output` / waits |
| `execStream` / `startProcess` | Same handle: `logs`, `waitFor*`, `kill` |
| Default / named sessions | Gone — `cwd`/`env` per launch, or one shell script argv |
| `sandbox.terminal(request)` / session terminal | `createTerminal` + `terminal.connect(request)` |
| xterm `sessionId` | `terminalId` |
| Interpreter methods on `Sandbox` | `withInterpreter` → `sandbox.interpreter.*` |
| `gitCheckout` | argv `git` via `exec` |
| String kill signals | Numeric only |
| Bridge `/exec`, sessions, `/pty`, `timeout_ms` | `/processes`, `/terminals`, `timeout` |
| Files, mounts, backups, ports, tunnels, `proxyToSandbox` | Mostly unchanged (ignore session/transport bits on stable pages) |

## 2. Audit

```sh
rg 'SANDBOX_TRANSPORT|transport:|setTransport|enableDefaultSession|createSession|getSession|deleteSession|execStream\(|startProcess\(|killProcess\(|sandbox\.terminal\(|sessionId|gitCheckout\(|SandboxTransport|ExecutionSession|/v1/sandbox/.*/exec|/v1/sandbox/.*/session|/v1/sandbox/.*/pty|timeout_ms|Session-Id'
```

Also search: string `exec(`, patterns of `cd` then a later `exec`, bare `createCodeContext` / `runCode` on `Sandbox`.

For each hit, note the replacement from this file. Ask the user before guessing.

## 3. Clarify (ask when needed)

- OK to cut production with immediate container rollout (live container processes/terminals/streams stop)?
- Self-deployed bridge Worker in scope?
- Python interpreter → must use **`-python`** image variant?
- Any call site not covered below?

## 4. Upgrade

### 4.1 Package and image

```sh
npm install @cloudflare/sandbox@next
# or pnpm / yarn equivalent
```

Dockerfile / container must match, for example:

```dockerfile
FROM cloudflare/sandbox:next
# Python interpreter:
# FROM cloudflare/sandbox:next-python
```

Use the same exact prerelease tag on Worker and image when not on the floating `next` tag. Bridge template (if used): https://github.com/cloudflare/sandbox-sdk/tree/next/bridge/worker

### 4.2 Remove transport

Delete `SANDBOX_TRANSPORT`, `transport` on `getSandbox()`, `setTransport()`, and `SandboxTransport` types. No replacement setting.

### 4.3 Command execution

**Buffered command**

```ts
// Stable
const result = await sandbox.exec("npm test");
console.log(result.stdout, result.exitCode);

// Preview
const process = await sandbox.exec(["/bin/bash", "-lc", "npm test"]);
// single binary without shell:
// const process = await sandbox.exec(["npm", "test"], { cwd: "/workspace/app" });
const result = await process.output({ encoding: "utf8" });
console.log(result.stdout, result.exitCode);
```

- Default `output()` streams are **bytes** (`Uint8Array`). Pass `{ encoding: "utf8" }` for strings.
- Depth: https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/

**Background / streaming**

```ts
// Stable-ish: startProcess / execStream
// Preview:
const server = await sandbox.exec(["/bin/bash", "-lc", "npm run dev"], {
  cwd: "/workspace/app",
});
await server.waitForPort(3000, { timeout: 60_000 });
// HTTP readiness: { mode: "http", path: "/health", timeout: 60_000 }
// Default waitForPort mode is tcp.

const stream = await server.logs({ follow: true, replay: true });
// consume stream...
await server.kill(); // default signal 15
```

**Shell state / cwd / env**

```ts
// Stable (broken assumption on preview)
await sandbox.exec("cd /app");
await sandbox.exec("npm test");

// Preview — one shot
await sandbox.exec(["/bin/bash", "-lc", "cd /app && npm test"]);
// or
await sandbox.exec(["npm", "test"], { cwd: "/app", env: { NODE_ENV: "test" } });
```

- `setEnvVars` still exists for sandbox-wide **non-secret** config.
- Do **not** put live API keys in `setEnvVars` or launch `env`. Keep secrets in the Worker; use outbound handlers when processes call external APIs: https://developers.cloudflare.com/sandbox/guides/outbound-traffic/
- Depth: https://developers.cloudflare.com/sandbox/1-0-preview/environment/

**Timeouts**

| Goal | API |
| ---- | --- |
| Limit process lifetime | `exec(argv, { timeout })` → completion may have `timedOut: true` |
| Limit how long you wait | `timeout` / `signal` on `output` / `waitFor*` / `logs` — does not kill |

### 4.4 Drop sessions

Remove `createSession`, `getSession`, `deleteSession`, `enableDefaultSession`, and `sessionId` options. Isolate users with **separate sandbox IDs**, not sessions inside one sandbox.

### 4.5 Terminals

```ts
// Stable
return sandbox.terminal(request);

// Preview — create once, store id with sandbox id
const terminal = await sandbox.createTerminal({
  command: ["bash"],
  cwd: "/workspace",
});
// later request / WebSocket upgrade:
const t = await sandbox.getTerminal(terminal.id);
if (!t) {
  // container gone or unknown id — createTerminal again from app state
  return new Response("terminal gone", { status: 410 });
}
return t.connect(request, { cursor, cols, rows });
```

Browser `@cloudflare/sandbox/xterm`: pass `terminalId` (not `sessionId`) when building the WebSocket URL.

Depth: https://developers.cloudflare.com/sandbox/1-0-preview/terminals/

### 4.6 Interpreter

```ts
// Stable: sandbox.createCodeContext / sandbox.runCode
// Preview:
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox<Env> {
  interpreter = withInterpreter(this);
}

const ctx = await sandbox.interpreter.createCodeContext({ language: "python" });
const result = await sandbox.interpreter.runCode('print("hi")', { context: ctx });
// result is plain serializable ExecutionResult
```

Python requires the **`-python`** image. Same `@next` Worker + image line.

Depth: https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/

### 4.7 Git

```ts
// Stable
await sandbox.gitCheckout(repoUrl, { targetDir: "/workspace/repo" });

// Preview
const clone = await sandbox.exec(
  ["git", "clone", "--depth", "1", repoUrl, "/workspace/repo"],
  { cwd: "/workspace" },
);
const result = await clone.output({ encoding: "utf8" });
if (result.exitCode !== 0) throw new Error(result.stderr);
```

### 4.8 Long-running work across requests

Process IDs are **not** durable jobs. Same sandbox ID ≠ same container forever.

**Store:** argv (or script), `cwd`, `env`, app checkpoint — and optionally `process.id` while it might still be alive.

```ts
// Later request — prefer fresh lookup
const existing = processId ? await sandbox.getProcess(processId) : null;
if (existing) {
  const stream = await existing.logs({ since: cursor, replay: true, follow: true });
  // ...
} else {
  // null: no container or unknown id — relaunch from stored job
  const p = await sandbox.exec(storedArgv, { cwd: storedCwd, env: storedEnv });
  // save p.id
}
// Reusing an old handle object after replace → StaleProcessHandleError; relaunch.
```

Depth: https://developers.cloudflare.com/sandbox/1-0-preview/processes/

### 4.9 Errors (minimum handlers)

| Error | What to do |
| ----- | ---------- |
| `ContainerUnavailableError` | Container did not start the work — back off (`retryAfterMs` if set), retry **new** operation |
| `OperationInterruptedError` | Work may have started — read `reason` / `retryable`; inspect before repeating side effects |
| `RPCTransportError` | Lost contact mid-call — later calls may work; **this** call may already have run |
| `StaleProcessHandleError` / `StaleTerminalHandleError` | Previous container — relaunch from stored work |
| `ProcessWaitTimeoutError` / `ProcessAbortedError` | Wait ended only — process may still run |
| `RuntimeControlProtocolError` / broken image after deploy | Worker and image not on same `@next` line — fix deploy, not slow-start retry |

Prefer `instanceof` on classes from `@cloudflare/sandbox`.  
Depth: https://developers.cloudflare.com/sandbox/1-0-preview/errors/

`getProcess` / `getTerminal` / `list*` do **not** start a container; they return `null` / `[]` when none is running.

### 4.10 Bridge (only if audit found bridge clients)

Self-deployed Worker (not a Cloudflare-hosted shared API).

1. Redeploy from https://github.com/cloudflare/sandbox-sdk/tree/next/bridge/worker  
2. Pair `@cloudflare/sandbox@next` with `cloudflare/sandbox:next`  
3. Update HTTP clients:

| Stable bridge | Preview bridge |
| ------------- | -------------- |
| `POST …/exec` | `POST …/processes` then `GET …/processes/:id/logs` |
| Sessions / `Session-Id` | Removed — `cwd`/`env` on each create |
| `GET …/pty` | `POST …/terminals` then connect |
| Body `timeout_ms` | `timeout` |

Depth: https://developers.cloudflare.com/sandbox/1-0-preview/bridge/

### 4.11 Deploy cutover

Finish code on a branch/staging first. Production is **one** deploy of matching Worker + image:

```sh
npx wrangler deploy --containers-rollout=immediate
```

- Does **not** clear `rollout_active_grace_period`. Leave grace at default `0` for cutover (or set `0` if raised).
- Before cutover: finish or stop work you must keep.
- After cutover: treat pre-deploy process/terminal IDs as invalid; start work again; run Validate.
- If you run a bridge, redeploy it in the same window.

Depth: https://developers.cloudflare.com/sandbox/1-0-preview/migrate/  
Containers rollouts: https://developers.cloudflare.com/containers/platform-details/rollouts/

## 5. Validate

1. Lockfile + Dockerfile both on the same `@next` line  
2. Typecheck against `@next`  
3. Smoke argv `exec` + `output({ encoding: "utf8" })`  
4. Smoke long process (`waitForPort` / `logs`) if used  
5. Smoke terminal create + `connect` if used  
6. Smoke interpreter if used (correct image variant)  
7. Error handling distinguishes unavailable / interrupted-RPC / stale / local wait  
8. No live secrets in sandbox env  
9. Grep again for removed APIs (and bridge `/exec` / sessions / `/pty` / `timeout_ms`)  
10. Production cutover used `--containers-rollout=immediate`

## Red flags — stop and fix

- Mixing `@next` Worker with stable image (or reverse)  
- Gradual container rollout for this control-plane cutover  
- Treating `await exec` as command completion  
- Assuming `cd` / exports persist across `exec` calls  
- One retry wrapper for every sandbox error  
- Inventing `gitCheckout`, process stdin, or undocumented extension APIs  
- Keeping pre-cutover process/terminal IDs after deploy  
- Forcing production cutover without user agreement  
- Putting live secrets in `setEnvVars` / launch `env`
