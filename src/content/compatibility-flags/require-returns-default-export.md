---
_build:
  publishResources: false
  render: never
  list: never

name: "`require()` returns default export"
sort_date: "2026-01-22"
enable_date: "2026-01-22"
enable_flag: "require_returns_default_export"
disable_flag: "require_returns_namespace"
---

When `require_returns_default_export` is enabled, `require()` will return the default export of a module if it exists. If the default export does not exist, it falls back to returning a mutable copy of the module namespace object.

This matches the behavior that Node.js uses for `require(esm)`, where the default export is returned when available. This flag is useful for frameworks like Next.js that expect to be able to patch module exports.

Previously, `require()` always returned the module namespace object (an object like `{default: module.exports}`).
