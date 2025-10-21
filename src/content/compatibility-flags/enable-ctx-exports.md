---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable ctx.exports"
sort_date: "2025-09-24"
enable_flag: "enable_ctx_exports"
---

This flag enables [the `ctx.exports` API](/workers/runtime-apis/context/#exports), which contains automatically-configured loopback bindings for your Worker's top-level exports. This allows you to skip configuring explicit bindings for your `WorkerEntrypoint`s and Durable Object namespaces defined in the same Worker.

We may change this API to be enabled by default in the future (regardless of compat date or flags).
