---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:child_process` module"
sort_date: "2026-03-17"
enable_date: "2026-03-17"
enable_flag: "enable_nodejs_child_process_module"
disable_flag: "disable_nodejs_child_process_module"
---

The `enable_nodejs_child_process_module` flag enables the `node:child_process` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/child_process.html) for more details about the `node:child_process` API.
