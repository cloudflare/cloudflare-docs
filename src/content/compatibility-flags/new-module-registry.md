---
_build:
  publishResources: false
  render: never
  list: never

name: "New module registry"
sort_date: "2026-08-05"
experimental: false
enable_flag: "new_module_registry"
disable_flag: "legacy_module_registry"
---

The `new_module_registry` flag selects a URL-based Workers module registry. Use `legacy_module_registry` to select the legacy registry.

When enabled, the new registry provides:

- `import.meta` URL, path, entrypoint, and resolution metadata
- URL-based specifiers with query and fragment identities
- Import attribute validation and Node.js `require(esm)` behavior
- Consistent errors across module loading paths
- Compilation on first import and reuse of compilation data
- Dynamic WebAssembly source phase imports

Static `import source` works with both registries. Dynamic `import.source()` requires the new registry.

This flag has no default date. Add `new_module_registry` explicitly to opt in.

This flag only applies to JavaScript Workers. Python Workers ignore it and use the legacy registry.

For configuration and tooling requirements, refer to the [module registry reference](/workers/reference/module-registry/).
