---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:fs` module"
sort_date: "2025-09-15"
enable_date: "2025-09-15"
enable_flag: "enable_nodejs_fs_module"
disable_flag: "disable_nodejs_fs_module"
---

The `enable_nodejs_fs_module` flag enables the `node:fs` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-15 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/fs.html) for more details about the `node:fs` API.
