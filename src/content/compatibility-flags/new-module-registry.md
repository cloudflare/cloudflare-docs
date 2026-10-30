---
name: "New module registry"
sort_date: "2026-11-12"
enable_date: "2026-11-12"
enable_flag: "new_module_registry"
disable_flag: "legacy_module_registry"
---

For compatibility dates on or after November 12, 2026, JavaScript Workers use the new module registry by default. For earlier dates, add `new_module_registry` to opt in. Add `legacy_module_registry` to retain the legacy registry with a later compatibility date. Python Workers continue to use the legacy registry.

The registry resolves and loads the modules uploaded with your Worker and the runtime's built-in modules. It provides `import.meta.url`, `import.meta.main`, and `import.meta.resolve()`, and resolves module specifiers as URLs. Different query strings or fragments create separate module instances, even when they refer to the same source.

Review these differences before changing your compatibility date:

- Import attributes are validated. Unknown attribute keys, unsupported types, and types that do not match the imported module throw errors.
- `require()` of an ES module returns its namespace unless it exports a value named `"module.exports"`. Workers' built-in `node:` modules return their default export. The `__cjsUnwrapDefault` marker in existing bundles still unwraps the default export.
- `require()` rejects module graphs containing top-level `await`, even if the graph has already finished evaluating. Use dynamic `import()` for these modules.
- The legacy-registry flags `export_commonjs_default`, `require_returns_default_export`, `throw_on_unrecognized_import_assertion`, and `disable_top_level_await_in_require` do not control the new registry.

The registry does not download modules from arbitrary URLs or install npm dependencies. Your build tooling still determines which modules are uploaded and may transform imports or `import.meta` before deployment. Refer to [Bundling](/workers/wrangler/bundling/#runtime-module-loading) and [Node.js compatibility](/workers/runtime-apis/nodejs/).

For background and examples, refer to [How we rebuilt Cloudflare Workers' module registry for Node.js compatibility](https://blog.cloudflare.com/workers-module-registry-nodejs/).
