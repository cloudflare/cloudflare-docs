---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:domain` module"
sort_date: "2025-12-04"
enable_date: "2025-12-04"
enable_flag: "enable_nodejs_domain_module"
disable_flag: "disable_nodejs_domain_module"
---

The `enable_nodejs_domain_module` flag enables the `node:domain` module stub in Workers. Note that `node:domain` is deprecated in Node.js itself.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/domain.html) for more details about the `node:domain` API.
