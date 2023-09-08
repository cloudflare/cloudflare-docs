---
_build:
  publishResources: false
  render: never
  list: never

name: "New URL parser implementation"
sort_date: "2022-10-31"
enable_date: "2022-10-31"
enable_flag: "url_standard"
disable_flag: "url_original"
---

The original implementation of the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) API in Workers was not fully compliant with the [WHATWG URL Standard](https://url.spec.whatwg.org/), differing in several ways, including how validation and URL encoding was performed. Set the compatibility date of your Worker to a date after `2022-10-31` or enable the `url_standard` compatibility flag to opt-in the fully spec compliant `URL` API implementation.
