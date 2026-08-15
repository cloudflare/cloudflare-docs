---
_build:
  publishResources: false
  render: never
  list: never

name: "CommonJS modules do not export a module namespace"
sort_date: "2022-10-31"
enable_date: "2022-10-31"
enable_flag: "export_commonjs_default"
disable_flag: "export_commonjs_namespace"
---

The `export_commonjs_default` and `export_commonjs_namespace` flags apply only to the legacy module registry.

The legacy registry previously exported a module namespace like `{ default: module.exports }`. The `export_commonjs_default` flag exports `module.exports` directly.

The `export_commonjs_namespace` flag restores the previous namespace behavior.

Neither flag affects the new module registry. For its Node.js `require(esm)` behavior, refer to the [module registry reference](/workers/reference/module-registry/#use-require-with-es-modules).
