---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:readline` module"
sort_date: "2026-03-17"
enable_date: "2026-03-17"
enable_flag: "enable_nodejs_readline_module"
disable_flag: "disable_nodejs_readline_module"
---

The `enable_nodejs_readline_module` flag enables the `node:readline` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/readline.html) for more details about the `node:readline` API.
