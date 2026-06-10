---
name: sandbox-2026-deprecation
description: Migrate Cloudflare Sandbox SDK codebases away from features deprecated in June 2026 (HTTP and WebSocket transports, desktop, exposePort, default sessions, and stream-specific file and command APIs).
---

# Sandbox SDK 2026 deprecation migration

Use this skill when migrating a codebase that depends on the Cloudflare Sandbox SDK away from features deprecated in June 2026.

For the announcement, refer to the [changelog entry](https://developers.cloudflare.com/changelog/sandbox/2026-06-09-deprecating-sandbox-sdk-features/). For detailed documentation, refer to the [migration guide](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/).

## Migration checklist

1. Update `@cloudflare/sandbox` and the sandbox container image before changing runtime configuration.
2. Search the codebase for deprecated configuration and APIs:

   ```sh
   rg 'SANDBOX_TRANSPORT|transport:|exposePort\(|enableDefaultSession|execStream\(|readFileStream|writeFileStream'
   ```

3. Switch every sandbox to RPC transport with `SANDBOX_TRANSPORT=rpc` or `getSandbox(..., { transport: "rpc" })`.
4. Replace Sandbox SDK desktop APIs with Cloudflare Browser Run where browser automation is required.
5. Replace `exposePort()` with `sandbox.tunnels.get()`. Use quick tunnels for development and named tunnels for stable production hostnames.
6. Set `enableDefaultSession: false` on `getSandbox()`.
7. Replace workflows that depend on persisted shell state with explicit sessions from `sandbox.createSession()`.
8. Move stream-specific file and command logic to the base `readFile()`, `writeFile()`, and `exec()` APIs where streaming behavior is supported.
9. Deploy the Worker and smoke-test command execution, file operations, public URLs, and stateful session workflows.

## API replacements

| Deprecated feature                       | Replacement                                          |
| ---------------------------------------- | ---------------------------------------------------- |
| HTTP or WebSocket transport              | RPC transport                                        |
| Sandbox SDK desktop                      | Cloudflare Browser Run                               |
| `exposePort()`                           | `sandbox.tunnels.get()`                              |
| Default sessions                         | `enableDefaultSession: false` with explicit sessions |
| Stream-specific command and file helpers | Base command and file APIs with streaming support    |

## Notes for agents

- Do not remove `exposePort()` blindly if the Worker uses `proxyToSandbox()` to inject authentication or rewrite responses. Preserve that behavior before moving traffic to tunnels.
- If code relies on `cd` carrying across separate `exec()` calls, create an explicit session with `cwd` instead.
- Tunnels require RPC transport. Configure RPC before migrating public URLs.
- Large or binary file streaming requires RPC transport.
