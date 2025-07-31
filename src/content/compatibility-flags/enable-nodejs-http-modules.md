---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable availability of `node:http` modules"
sort_date: "2025-08-15"
enable_date: "2025-08-15"
enable_flag: "enable_nodejs_http_modules"
disable_flag: "disable_nodejs_http_modules"
---

The `enable_nodejs_http_modules` flag enables the availability of Node.js
`node:http` and `node:https` modules in Workers.

The `disable_nodejs_http_modules` flag disables the availability of these
modules.
