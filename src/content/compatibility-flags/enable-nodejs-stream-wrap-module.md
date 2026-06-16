---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:_stream_wrap` module"
sort_date: "2026-01-29"
enable_date: "2026-01-29"
enable_flag: "enable_nodejs_stream_wrap_module"
disable_flag: "disable_nodejs_stream_wrap_module"
---

The `enable_nodejs_stream_wrap_module` flag enables the `node:_stream_wrap` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-01-29 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.
