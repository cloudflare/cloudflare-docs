---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable Node.js HTTP server modules"
sort_date: "2025-09-01"
enable_date: "2025-09-01"
enable_flag: "enable_nodejs_http_server_modules"
disable_flag: "disable_nodejs_http_server_modules"
---

The `enable_nodejs_http_server_modules` flag enables the availability of Node.js
HTTP server modules such as `node:_http_server` in Workers.

The `disable_nodejs_http_server_modules` flag disables the availability of these
server modules.

This enables compatibility with Node.js libraries and existing code that
use the standard Node.js HTTP server APIs. The available functionality includes:

* `http.createServer()` for creating HTTP servers
* `http.Server` class for server instances
* `http.ServerResponse` for handling server responses

This flag must be used in combination with the `enable_nodejs_http_modules` flag
to enable full features of `node:http`.

This flag is automatically enabled for Workers using
a compatibility date of 2025-09-01 or later when `nodejs_compat` is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/http.html) for more details about the Node.js HTTP APIs.