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

Previously, when using the [dynamic dispatch API](/cloudflare-for-platforms/workers-for-platforms/get-started/dynamic-dispatch/) to send an HTTP request to another Worker, if the destination Worker threw an exception, the dynamic dispatch Worker would receive an HTTP `500` error with no body. By setting `dynamic_dispatch_tunnel_exceptions`, the exception will instead propagate to the caller. That is, the `fetch()` call in the dynamic dispatch Worker will throw the same exception. This matches the similar behavior of [service bindings](/workers/runtime-apis/service-bindings/#service-bindings) and [Durable Objects](/durable-objects/).
dispatcher would receive an HTTP 500 error with no body. With `dynamic_dispatch_tunnel_exceptions`
set, the exception will instead propagate to the caller, i.e. the `fetch()` call in the dispatcher
will throw the same exception. This matches the similar behavior of service bindings and Durable Objects.