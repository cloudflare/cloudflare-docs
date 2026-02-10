---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable availability of `node:http` and `node:https` modules"
sort_date: "2025-08-15"
enable_date: "2025-08-15"
enable_flag: "enable_nodejs_http_modules"
disable_flag: "disable_nodejs_http_modules"
---

The `enable_nodejs_http_modules` flag enables the availability of Node.js
`node:http` and `node:https` modules in Workers (client APIS only).

The `disable_nodejs_http_modules` flag disables the availability of these
modules.

This enables compatibility with Node.js libraries and existing code that
use the standard node:http and node:https APIs for making HTTP requests.
The available functionality includes:

* `http.request()` and `https.request()` for making HTTP/HTTPS requests
* `http.get()` and `https.get()` for making GET requests
* Request and response objects with standard Node.js APIs
* Support for standard HTTP methods, headers, and options

See the [Node.js documentation](https://nodejs.org/docs/latest/api/http.html)
for more details about the Node.js APIs.
