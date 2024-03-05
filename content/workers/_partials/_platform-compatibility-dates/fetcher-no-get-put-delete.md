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

Some objects in the Workers API implement a method `fetch()` which behaves similarly to the global `fetch()` method, but the requests are sent to the destination represented by the object, rather than being routed based on the URL. In particular, [Durable Object](/durable-objects/) stubs and [Service Bindings](/workers/configuration/bindings/about-service-bindings/) both have such `fetch()` methods.

Historically, API objects that had such a `fetch()` method also had methods `get()`, `put()`, and `delete()`. These methods were thin wrappers around `fetch()` which would perform the corresponding HTTP method and automatically handle writing/reading the request/response bodies as needed.

These methods were thought to be a neat idea but were never actually documented. In retrospect, they don't seem so great anymore. Moreover, they may soon get in the way: we would like for applications to define their own methods on these types, and applications may be surprised if they cannot define `get`, `put`, and `delete` due to conflicting with these helpers.

Therefore, these methods are being removed. Since they were never documented, it's unlikely anyone relies on them.
