---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:console` module"
sort_date: "2025-09-21"
enable_date: "2025-09-21"
enable_flag: "enable_nodejs_console_module"
disable_flag: "disable_nodejs_console_module"
---

The `enable_nodejs_console_module` flag enables the `node:console` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-21 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/console.html) for more details about the `node:console` API.
