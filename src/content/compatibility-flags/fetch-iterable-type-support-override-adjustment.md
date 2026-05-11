---
_build:
  publishResources: false
  render: never
  list: never

name: "Fetch iterable body respects toString/toPrimitive overrides"
sort_date: "2026-01-15"
enable_date: "2026-01-15"
enable_flag: "fetch_iterable_type_support_override_adjustment"
disable_flag: "no_fetch_iterable_type_support_override_adjustment"
---

When `fetch_iterable_type_support_override_adjustment` is enabled, objects passed as the body of a `fetch()` `Request` or `Response` that are sync iterable but also have a custom `toString` or `Symbol.toPrimitive` method will not be treated as iterables. Instead, they will fall through to being handled as stringified objects, matching the previous behavior for such objects.

This flag refines the behavior introduced by the `fetch_iterable_type_support` flag and is automatically enabled when `fetch_iterable_type_support` is enabled after 2026-01-15.
