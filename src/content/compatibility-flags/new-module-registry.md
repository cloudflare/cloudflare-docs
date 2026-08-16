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

The `new_module_registry` flag replaces the JavaScript Workers module registry with an implementation that resolves specifiers as URLs instead of filesystem-style paths. Python Workers continue to use the legacy module registry.

When enabled, the new registry provides:

- `import.meta.url`, `import.meta.main`, `import.meta.filename`, `import.meta.dirname`, and `import.meta.resolve()` support.
- Specifiers are parsed and resolved as URLs, including query strings and fragments.
- With [`nodejs_compat`](/workers/runtime-apis/nodejs/), `node:` built-ins resolve to the same module instance regardless of how they are reached.
- Import attributes (`with { type: 'json' }`) are correctly validated.
- With `nodejs_compat`, `require()` on an ES module follows Node.js [`require(esm)`](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require) rules.
- Consistent error classes and messages across all loading paths.
- Lazy module compilation and shared compiled code across V8 isolate replicas.
- WebAssembly source phase imports.

You must add this flag explicitly to your `compatibility_flags`. For examples and migration details, refer to the [module registry reference](/workers/reference/module-registry/).
