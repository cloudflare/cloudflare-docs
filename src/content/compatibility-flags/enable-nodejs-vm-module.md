---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:vm` module"
sort_date: "2025-10-01"
enable_date: "2025-10-01"
enable_flag: "enable_nodejs_vm_module"
disable_flag: "disable_nodejs_vm_module"
---

The `enable_nodejs_vm_module` flag enables the `node:vm` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-10-01 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/vm.html) for more details about the `node:vm` API.
