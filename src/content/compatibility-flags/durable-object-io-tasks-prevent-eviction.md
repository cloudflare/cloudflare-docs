---
_build:
  publishResources: false
  render: never
  list: never

name: "Durable Object I/O tasks prevent eviction"
sort_date: "2026-10-01"
enable_date: "2026-10-01"
enable_flag: "durable_object_io_tasks_prevent_eviction"
disable_flag: "durable_object_io_tasks_do_not_prevent_eviction"
---

With the `durable_object_io_tasks_prevent_eviction` flag set, pending I/O keeps a Durable Object in memory after the client disconnects or drops its reference to the object. This includes service binding requests, Durable Object RPC calls, `container.monitor()`, and promises passed to `this.ctx.waitUntil()`. Each operation prevents eviction until it completes or for up to 15 minutes from when it starts, whichever comes first. Without this flag, a Durable Object with no connected client can be evicted while these operations are still pending. For more information, refer to [Lifecycle of a Durable Object](/durable-objects/concepts/durable-object-lifecycle/).
