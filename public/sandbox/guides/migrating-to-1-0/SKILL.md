---
name: sandbox-migrating-to-1-0
description: Migrate Cloudflare Sandbox SDK projects to @cloudflare/sandbox@next and update deprecated transports, execution APIs, sessions, plugins, and extensions.
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
- `transport: "http"`
- `transport: "websocket"`
- `execStream(`
- `startProcess(`
- `enableDefaultSession`
- `createCodeContext(`
- `runCode(`
- `gitCheckout(`
- `terminal(`
- `@cloudflare/sandbox/xterm`

## Migration checklist

### HTTP and WebSocket transports

HTTP and WebSocket transports are removed in `1.0`. RPC is the supported transport path.

Before installing the `1.0` preview, test the project with `SANDBOX_TRANSPORT=rpc`. Remove code that forces `transport: "http"` or `transport: "websocket"`.

### Execution APIs

`exec()`, `execStream()`, and `startProcess()` are being consolidated into one `exec()` API that mirrors the Containers `container.exec()` model.

Use this migration map:

| Current API                     | Next API                                 | Notes                           |
| ------------------------------- | ---------------------------------------- | ------------------------------- |
| `sandbox.exec(command)`         | `sandbox.exec(...)`                      | Use for one-shot commands.      |
| `sandbox.execStream(command)`   | `sandbox.exec(...)` with streamed output | Use process stream APIs.        |
| `sandbox.startProcess(command)` | `sandbox.exec(...)` process handle       | Use for long-running processes. |

Confirm the final Sandbox SDK `exec()` TypeScript interface against the installed `1.0` preview package before rewriting production code.

### Default sessions

Hidden default sessions are removed in `1.0`. The `enableDefaultSession` flag is removed from `getSandbox()`.

Remove `enableDefaultSession`:

```ts
const sandbox = getSandbox(env.Sandbox, "my-sandbox");
```

Use explicit sessions when shell state must persist:

```ts
const session = await sandbox.createSession();
await session.exec("cd /workspace/app");
await session.exec("pwd");
```

### Plugins

Code Interpreter, Git, and PTY support move from the core SDK into plugins.

Plugins follow this pattern:

```ts
import { Sandbox } from "@cloudflare/sandbox";
import { withFeature } from "@cloudflare/sandbox/<plugin>";

export class MySandbox extends Sandbox {
	feature = withFeature(this);
}
```

The public interfaces should remain the same, but they are namespaced on the sandbox instance through the plugin.

Expected migration patterns:

```ts
import { withCodeInterpreter } from "@cloudflare/sandbox/code-interpreter";

export class MySandbox extends Sandbox {
	codeInterpreter = withCodeInterpreter(this);
}

await sandbox.codeInterpreter.runCode("1 + 1");
```

```ts
import { withGit } from "@cloudflare/sandbox/git";

export class MySandbox extends Sandbox {
	git = withGit(this);
}

await sandbox.git.gitCheckout("https://github.com/user/repo");
```

```ts
import { withPty } from "@cloudflare/sandbox/pty";

export class MySandbox extends Sandbox {
	pty = withPty(this);
}

return await sandbox.pty.terminal(request);
```

Confirm plugin identifiers and helper names against the installed `1.0` preview package before rewriting production code.

### Extension API

Use the new extension API when you want to attach reusable methods, state, or lifecycle behavior to a Sandbox instance.

Extensions use the same attachment model as plugins:

```ts
import { withMyExtension } from "@cloudflare/sandbox/my-extension";

export class MySandbox extends Sandbox {
	myExtension = withMyExtension(this);
}

await sandbox.myExtension.doWork();
```

Confirm the final extension authoring interface against the installed `1.0` preview package before publishing custom extensions.

## Verification

After migrating:

1. Confirm `@cloudflare/sandbox` resolves to the `1.0` preview release.
2. Deploy the Worker and container image together.
3. Run one top-level `exec()` call.
4. Test workflows that previously used default sessions.
5. Test Code Interpreter, Git, and PTY plugin calls.
6. Run the project integration tests.
