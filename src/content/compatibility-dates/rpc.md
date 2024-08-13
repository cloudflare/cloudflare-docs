---
_build:
  publishResources: false
  render: never
  list: never

name: "Durable Object stubs and Service Bindings support RPC"
sort_date: "2024-04-03"
enable_date: "2024-04-03"
enable_flag: "rpc"
disable_flag: "no_rpc"
---

With this flag on, [Durable Object](/durable-objects/) stubs and [Service Bindings](/workers/runtime-apis/bindings/service-bindings/) support [RPC](/workers/runtime-apis/rpc/). This means that these objects now appear as if they define every possible method name. Calling any method name sends an RPC to the remote Durable Object or Worker service.

For most applications, this change will have no impact unless you use it. However, it's possible some existing code will be impacted if it explicitly checks for the existence of method names that were previously not defined on these types. For example, we've seen code in the wild which iterates over [bindings](/workers/runtime-apis/bindings/) and tries to auto-detect their types based on what methods they implement. Such code will now see service bindings as implementing every method, so may misinterpret service bindings as being some other type. In the cases we've seen, the impact was benign (nothing actually broke), but out of caution we are guarding this change behind a flag.
