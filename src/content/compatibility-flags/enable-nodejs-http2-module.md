---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:http2` module"
sort_date: "2025-09-01"
enable_date: "2025-09-01"
enable_flag: "enable_nodejs_http2_module"
disable_flag: "disable_nodejs_http2_module"
---

The `enable_nodejs_http2_module` flag enables the `node:http2` module stubs in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-01 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/http2.html) for more details about the `node:http2` API.
