---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:inspector` module"
sort_date: "2026-01-29"
enable_date: "2026-01-29"
enable_flag: "enable_nodejs_inspector_module"
disable_flag: "disable_nodejs_inspector_module"
---

The `enable_nodejs_inspector_module` flag enables the `node:inspector` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-01-29 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/inspector.html) for more details about the `node:inspector` API.
