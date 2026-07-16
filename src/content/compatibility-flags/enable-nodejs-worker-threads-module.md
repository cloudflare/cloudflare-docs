---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:worker_threads` module"
sort_date: "2026-03-17"
enable_date: "2026-03-17"
enable_flag: "enable_nodejs_worker_threads_module"
disable_flag: "disable_nodejs_worker_threads_module"
---

The `enable_nodejs_worker_threads_module` flag enables the `node:worker_threads` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/worker_threads.html) for more details about the `node:worker_threads` API.
