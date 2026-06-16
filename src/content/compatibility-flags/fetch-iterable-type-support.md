---
_build:
  publishResources: false
  render: never
  list: never

name: "Support iterables as fetch Request/Response body"
sort_date: "2026-02-19"
enable_date: "2026-02-19"
enable_flag: "fetch_iterable_type_support"
disable_flag: "no_fetch_iterable_type_support"
---

When `fetch_iterable_type_support` is enabled, sync and async iterables can be passed as the body of a `fetch()` `Request` or `Response` and will be properly iterated over.

Previously, sync iterables like Arrays would be accepted but stringified (e.g., `[1, 2, 3]` would become `"1,2,3"`), and async iterables would be treated as regular objects and not iterated at all. With this flag enabled, iterables are properly consumed as streaming body content.

Note that Arrays will now be treated as iterables instead of being stringified, which is a breaking change for code that relied on the previous behavior.
