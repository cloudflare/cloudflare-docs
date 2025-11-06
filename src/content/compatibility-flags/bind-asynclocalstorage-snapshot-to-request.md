---
_build:
  publishResources: false
  render: never
  list: never

name: "Bind AsyncLocalStorage snapshots to the request"
sort_date: "2025-06-16"
enable_date: "2025-06-16"
enable_flag: "bind_asynclocalstorage_snapshot_to_request"
disable_flag: "do_not_bind_asynclocalstorage_snapshot_to"
---

The AsyncLocalStorage frame can capture values that are bound to the
current request context. This is not always in the users control since we use
the ALS storage frame to propagate internal trace spans as well as
user-provided values. When the `bind_asynclocalstorage_snapshot_to_request`
flag is set, the runtime binds the snapshot / bound functions to the current
request context and will throw an error if the bound functions are called
outside of the request in which they were created.

The `do_not_bind_asynclocalstorage_snapshot_to` flag disables this behavior.
