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

The original Workers `URL` API implementation was not fully compliant with the [WHATWG URL Standard](https://url.spec.whatwg.org/), differing in several ways, including how validation and URL encoding was performed. Use the `url_standard` flag to opt-in to the backwards-incompatible change to use a fully compliant `URL` API implementation.
