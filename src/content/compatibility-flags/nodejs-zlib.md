---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:zlib` module"
sort_date: "2024-09-23"
enable_date: "2024-09-23"
enable_flag: "nodejs_zlib"
disable_flag: "no_nodejs_zlib"
---

The `nodejs_zlib` flag enables the `node:zlib` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2024-09-23 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/zlib.html) for more details about the `node:zlib` API.
