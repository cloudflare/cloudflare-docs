---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:repl` module"
sort_date: "2026-03-17"
enable_date: "2026-03-17"
enable_flag: "enable_nodejs_repl_module"
disable_flag: "disable_nodejs_repl_module"
---

The `enable_nodejs_repl_module` flag enables the `node:repl` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/repl.html) for more details about the `node:repl` API.
