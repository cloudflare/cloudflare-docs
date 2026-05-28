---
_build:
  publishResources: false
  render: never
  list: never

name: "Fetchers no longer have get/put/delete helper methods"
sort_date: "2024-03-26"
enable_date: "2024-03-26"
enable_flag: "fetcher_no_get_put_delete"
disable_flag: "fetcher_has_get_put_delete"
---

[Durable Object](/durable-objects/) stubs and [Service Bindings](/workers/runtime-apis/bindings/service-bindings/) both implement a `fetch()` method which behaves similarly to the global `fetch()` method, but requests are instead sent to the destination represented by the object, rather than being routed based on the URL.

Historically, API objects that had such a `fetch()` method also had methods `get()`, `put()`, and `delete()`. These methods were thin wrappers around `fetch()` which would perform the corresponding HTTP method and automatically handle writing/reading the request/response bodies as needed.

These methods were a very early idea from many years ago, but were never actually documented, and therefore rarely (if ever) used. Enabling the `fetcher_no_get_put_delete`, or setting a compatibility date on or after `2024-03-26` disables these methods for your Worker.

This change paves a future path for you to be able to define your own custom methods using these names. Without this change, you would be unable to define your own `get`, `put`, and `delete` methods, since they would conflict with these built-in helper methods.

