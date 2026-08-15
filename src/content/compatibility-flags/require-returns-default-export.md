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

The `require_returns_default_export` and `require_returns_namespace` flags apply only to the legacy module registry.

With the legacy registry, `require_returns_default_export` makes `require()` return a module's default export when one exists. Otherwise, it returns a mutable copy of the module namespace object.

The `require_returns_namespace` flag restores the previous namespace behavior.

Neither flag affects the [new module registry](/workers/reference/module-registry/#use-require-with-es-modules). The new registry follows Node.js `require(esm)` behavior and supports an additional compatibility marker for older bundler output.

It returns the module namespace object by default. A string-named `'module.exports'` export controls the returned value.

A truthy `__cjsUnwrapDefault` export returns the default export and takes precedence over those rules.

For [`workerd` `node:` built-ins](/workers/reference/module-registry/#load-nodejs-built-ins-consistently), `require()` returns the default export directly.
