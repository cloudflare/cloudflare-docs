---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:trace_events` module"
sort_date: "2025-12-04"
enable_date: "2025-12-04"
enable_flag: "enable_nodejs_trace_events_module"
disable_flag: "disable_nodejs_trace_events_module"
---

The `enable_nodejs_trace_events_module` flag enables the `node:trace_events` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/tracing.html) for more details about the `node:trace_events` API.
