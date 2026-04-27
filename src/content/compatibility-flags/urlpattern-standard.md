---
_build:
  publishResources: false
  render: never
  list: never

name: "Spec-compliant URLPattern implementation"
sort_date: "2025-05-01"
enable_date: "2025-05-01"
enable_flag: "urlpattern_standard"
disable_flag: "urlpattern_original"
---

The original `URLPattern` implementation was not fully compliant with the [WHATWG URLPattern Standard](https://urlpattern.spec.whatwg.org/), leading to a number of issues reported by users.

With `urlpattern_standard` enabled, Workers uses a spec-compliant URLPattern implementation. This is a breaking change from the original behavior, so it is gated behind a compatibility flag.

If you are using `URLPattern` and encounter unexpected behavior changes after updating your compatibility date, you can set `urlpattern_original` to revert to the previous implementation.
