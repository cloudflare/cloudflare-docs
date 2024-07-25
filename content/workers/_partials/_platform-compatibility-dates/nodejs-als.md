---
_build:
  publishResources: false
  render: never
  list: never

name: "Node.js AsyncLocalStorage"
sort_date: "2024-03-01"
enable_flag: "nodejs_als"
disable_flag: "no_nodejs_als"
---

Enables the availability of the Node.js [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage) API in Workers. This API allows you to store data that is accessible to all asynchronous operations within a given execution context. This is useful for storing data that is relevant to the current request, such as request-specific metadata or tracing information.
