---
_build:
  publishResources: false
  render: never
  list: never

name: "Dynamic Dispatch Exception Propagation"
sort_date: "2023-03-01"
enable_date: "2023-03-01"
enable_flag: "dynamic_dispatch_tunnel_exceptions"
disable_flag: "dynamic_dispatch_treat_exceptions_as_500"
---

Previously, when using Workers for Platforms' [dynamic dispatch API](/cloudflare-for-platforms/workers-for-platforms/get-started/dynamic-dispatch/) to send an HTTP request to a user Worker, if the user Worker threw an exception, the dynamic dispatch Worker would receive an HTTP `500` error with no body. When the `dynamic_dispatch_tunnel_exceptions` compatibility flag is enabled, the exception will instead propagate back to the dynamic dispatch Worker. The `fetch()` call in the dynamic dispatch Worker will throw the same exception. This matches the similar behavior of [service bindings](/workers/runtime-apis/bindings/service-bindings/) and [Durable Objects](/durable-objects/).