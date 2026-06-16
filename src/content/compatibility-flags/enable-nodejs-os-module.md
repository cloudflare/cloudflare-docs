---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:os` module"
sort_date: "2025-09-15"
enable_date: "2025-09-15"
enable_flag: "enable_nodejs_os_module"
disable_flag: "disable_nodejs_os_module"
---

The `enable_nodejs_os_module` flag enables the `node:os` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-15 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/os.html) for more details about the `node:os` API.
