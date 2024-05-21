---
_build:
  publishResources: false
  render: never
  list: never

name: "Support for accepting custom thenables in internal APIs"
sort_date: "2024-04-01"
enable_date: "2024-04-01"
enable_flag: "unwrap_custom_thenables"
disable_flag: "no_unwrap_custom_thenables"
---

Enables workers to accept custom thenables in internal APIs that expect a promise (for instance, the `ctx.waitUntil(...)` method)

Note that this is on received values only (e.g. `tryUnwrap(...)`).