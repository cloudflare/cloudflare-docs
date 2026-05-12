---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable Node.js-compatible global timers"
sort_date: "2026-02-10"
enable_date: "2026-02-10"
enable_flag: "enable_nodejs_global_timers"
disable_flag: "no_nodejs_global_timers"
---

When `enable_nodejs_global_timers` is enabled, `setTimeout`, `setInterval`, `clearTimeout`, and `clearInterval` return Node.js-compatible `Timeout` objects with methods like `refresh()`, `ref()`, `unref()`, and `hasRef()`, matching the behavior of `node:timers`.

This flag requires [`nodejs_compat`](/workers/runtime-apis/nodejs/) to be enabled and is automatically enabled for Workers using a compatibility date of 2026-02-10 or later when `nodejs_compat` is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/timers.html) for more details about the timer APIs.
