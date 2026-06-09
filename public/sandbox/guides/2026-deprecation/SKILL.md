---
name: sandbox-2026-deprecation
description: Migrate Cloudflare Sandbox SDK codebases away from features deprecated in June 2026 (HTTP and WebSocket transports, desktop, exposePort, default sessions, buffered file and exec APIs).
---

# Sandbox SDK 2026 deprecation migration

Use this skill when migrating a codebase that depends on the Cloudflare Sandbox SDK away from features deprecated in June 2026.

This is a stub. Detailed migration instructions will be published shortly. For the announcement, refer to the [changelog entry](https://developers.cloudflare.com/changelog/sandbox/2026-06-09-deprecating-sandbox-sdk-features/). For an overview of each migration, refer to the [migration guide](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/).

## Deprecated features

1. **HTTP and WebSocket transports** — switch to `SANDBOX_TRANSPORT=rpc` or pass `transport: "rpc"` to `getSandbox()`.
2. **Desktop** — removed in `0.10.2`. Migrate to Cloudflare Browser Run.
3. **`exposePort()`** — migrate to the tunnels API.
4. **Default sessions** — set `enableDefaultSession: false` and use `sandbox.createSession()` for explicit sessions.
5. **Buffered `readFile`, `writeFile`, `exec`** — the buffered variants stay, the streaming-only variants will be removed as the buffered ones stream by default.
