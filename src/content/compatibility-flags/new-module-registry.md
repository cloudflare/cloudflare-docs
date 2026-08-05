---
_build:
  publishResources: false
  render: never
  list: never

name: "New module registry"
sort_date: "2026-08-05"
enable_flag: "new_module_registry"
disable_flag: "legacy_module_registry"
---

The `new_module_registry` flag replaces the Workers module registry with a new
implementation that resolves specifiers as URLs instead of filesystem-style paths.

When enabled, the new registry provides:

- `import.meta.url`, `import.meta.main`, and `import.meta.resolve()` support.
- Specifiers are parsed and resolved as URLs, including query strings and fragments.
- `node:` built-ins resolve to the same module instance regardless of how they are reached.
- Import attributes (`with { type: 'json' }`) are correctly validated.
- `require()` on an ES module follows Node.js `require(esm)` rules.
- Consistent error classes and messages across all loading paths.
- Lazy module compilation and shared compiled code across V8 isolate replicas.
- WebAssembly source phase imports.

This flag does not have a default-on date yet. You must add it explicitly to
your `compatibility_flags`. For more information, refer to the
[module registry reference](/workers/reference/module-registry/).
