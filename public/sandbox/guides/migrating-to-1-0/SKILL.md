---
name: sandbox-migrating-to-1-0
description: Migrate Cloudflare Sandbox SDK projects to @cloudflare/sandbox@next and update deprecated transports, execution APIs, sessions, Code Interpreter, terminals, and extensions.
---

# Sandbox SDK 1.0 migration

Use this skill when migrating a codebase from the current `@cloudflare/sandbox` release to the `1.0` preview, published on the `@cloudflare/sandbox@next` npm tag.

Existing projects should migrate as soon as possible. New projects should install `@cloudflare/sandbox@next` today.

For the full guide, refer to [Migrate to Sandbox SDK 1.0](https://developers.cloudflare.com/sandbox/guides/migrating-to-1-0/).

## Install the 1.0 preview

Install the `1.0` preview:

```sh
npm install @cloudflare/sandbox@next
```

Deploy Worker code and the container image together when the migration changes behavior across the SDK and runtime.

## Scan the codebase

Search for these legacy APIs and configuration values:

- `SANDBOX_TRANSPORT`
- `SandboxTransport`
- `transport: "http"`
- `transport: "websocket"`
- `setTransport(`
- `enableDefaultSession`
- `execStream(`
- `startProcess(`
- `await sandbox.exec(`
- `createCodeContext(`
- `runCode(`
- `terminal(`
- `@cloudflare/sandbox/xterm`

## Migration checklist

### HTTP and WebSocket transports

HTTP and WebSocket transport selection is removed in `1.0`. The SDK uses one RPC control channel internally.

Remove these settings and APIs:

- `SANDBOX_TRANSPORT`
- `SandboxTransport`
- The `transport` option on `getSandbox()`
- `sandbox.setTransport()`

No replacement configuration is required.

### Execution APIs

`exec()` returns a `SandboxProcessPromise` in the `1.0` preview. It starts a process and exposes `.output()`, `.text()`, `.json()`, streams, standard input, exit status, process control, and re-attach support.

Use this migration map:

| Current API                     | Next API                               | Notes                                                 |
| ------------------------------- | -------------------------------------- | ----------------------------------------------------- |
| `await sandbox.exec(command)`   | `await sandbox.exec(command).output()` | Use for buffered output.                              |
| `await sandbox.exec(command)`   | `await sandbox.run(command)`           | Use for previous buffered, session-shell behavior.    |
| `sandbox.execStream(command)`   | `sandbox.exec(command)`                | Read from `process.stdout` and `process.stderr`.      |
| `sandbox.startProcess(command)` | `sandbox.exec(command, { processId })` | Use for long-running processes and re-attach support. |

Examples:

```ts
const result = await sandbox.exec("npm test").output();
console.log(result.stdout, result.stderr, result.exitCode);
```

```ts
const server = await sandbox.exec("npm run dev", {
	processId: "dev-server",
});
await server.waitForPort(3000);

const sameServer = await sandbox.getProcess("dev-server");
```

```ts
const process = await sandbox.exec("python /workspace/script.py", {
	stdin: "input text",
	stderr: "combined",
});
return new Response(process.stdout);
```

### Default sessions

Hidden default sessions are removed in `1.0`. The `enableDefaultSession` flag is removed from `getSandbox()`.

Remove `enableDefaultSession`:

```ts
const sandbox = getSandbox(env.Sandbox, "my-sandbox");
```

Use explicit sessions when shell state must persist:

```ts
const session = await sandbox.createSession({ id: "build" });
await session.run("cd /workspace/app");
const result = await session.run("pwd");
```

You can also pass `sessionId` to top-level operations:

```ts
await sandbox.run("cd /workspace/app", { sessionId: "build" });
const result = await sandbox.run("pwd", { sessionId: "build" });
```

Use `listProcesses({ sessionId })` and `getProcess(id, { sessionId })` when process lookup must be scoped to a session.

### Code Interpreter extension

Code Interpreter moves from the core Sandbox instance to `@cloudflare/sandbox/interpreter`.

Migrate from direct calls:

```ts
const context = await sandbox.createCodeContext({ language: "python" });
const result = await sandbox.runCode("1 + 1", { context });
```

Attach the interpreter extension:

```ts
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox<Env> {
	interpreter = withInterpreter(this);
}

const context = await sandbox.interpreter.createCodeContext({
	language: "python",
});
const result = await sandbox.interpreter.runCode("1 + 1", { context });
```

`runCode()` returns a plain `ExecutionResult` instead of an `Execution` instance. The `onResult` callback receives plain `ResultData` instead of a `Result` instance, and the `formats()` helper is no longer available on that callback argument.

Python execution still requires the `-python` image variant.

### Git APIs

Git remains on the core Sandbox API in the current `1.0` preview. Keep using `sandbox.gitCheckout()`:

```ts
await sandbox.gitCheckout("https://github.com/user/repo", {
	branch: "main",
	targetDir: "/workspace/repo",
});
```

If Git shell commands depend on persistent `cd` or exported variables, run those commands through an explicit session.

### Terminal APIs

Terminals are explicit resources in the `1.0` preview.

Migrate from direct terminal calls to `sandbox.terminal().connect()`:

```ts
const terminal = sandbox.terminal({
	id: "main-terminal",
	cwd: "/workspace",
	shell: "/bin/bash",
});

return await terminal.connect(request, { cols: 120, rows: 30 });
```

Destroy terminals when the application no longer needs them:

```ts
await terminal.destroy();
```

### Extension API

Use the extension API when you want to attach reusable methods or sidecar-backed behavior to a Sandbox instance.

SDK-side extensions use `@cloudflare/sandbox/extensions`:

```ts
import {
	SandboxExtension,
	type SandboxLike,
} from "@cloudflare/sandbox/extensions";

class MyExtension extends SandboxExtension {
	constructor(sandbox: SandboxLike) {
		super(sandbox);
	}

	async doWork() {
		return this.client.commands.execute("echo hello");
	}
}

export function withMyExtension(sandbox: SandboxLike) {
	return new MyExtension(sandbox);
}
```

Sidecar processes can use `@cloudflare/sandbox/sidecar`:

```ts
import {
	SandboxSidecar,
	serveSandboxSidecar,
} from "@cloudflare/sandbox/sidecar";

class MySidecar extends SandboxSidecar {
	async isOdd(value: number) {
		return value % 2 === 1;
	}
}

serveSandboxSidecar(new MySidecar());
```

Sidecars are distributed as npm-style `.tgz` packages and started on demand by the container. Third-party npm distribution for extensions is not wired up in the current preview.

### Error and lifecycle behavior

The `1.0` preview adds `CONTAINER_UNAVAILABLE` errors for temporary container startup and replacement failures. Treat this error as retryable according to the application's retry policy.

The preview also improves backup restore and tunnel recovery across sandbox runtime restarts. No code migration is required for these recovery improvements, but test backup and preview URL workflows after upgrading.

## Verification

After migrating:

1. Confirm `@cloudflare/sandbox` resolves to the `1.0` preview release.
2. Deploy the Worker and container image together.
3. Run one top-level `exec().output()` call.
4. Test workflows that previously used default sessions.
5. Test `exec()` streaming, process IDs, and re-attach workflows.
6. Test Code Interpreter through `sandbox.interpreter`.
7. Test terminal WebSocket routes with `sandbox.terminal().connect()`.
8. Run the project integration tests.
