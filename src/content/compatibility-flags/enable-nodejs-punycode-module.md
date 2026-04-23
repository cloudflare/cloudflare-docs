---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:punycode` module"
sort_date: "2025-12-04"
enable_date: "2025-12-04"
enable_flag: "enable_nodejs_punycode_module"
disable_flag: "disable_nodejs_punycode_module"
---

The `enable_nodejs_punycode_module` flag enables the `node:punycode` module in Workers. Note that `node:punycode` is deprecated in Node.js itself.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/punycode.html) for more details about the `node:punycode` API.
