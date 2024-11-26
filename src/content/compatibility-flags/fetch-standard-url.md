---
_build:
  publishResources: false
  render: never
  list: never

name: "Use standard URL parsing in `fetch()`"
sort_date: "2024-06-03"
enable_date: "2024-06-03"
enable_flag: "fetch_standard_url"
disable_flag: "fetch_legacy_url"
---

The `fetch_standard_url` flag makes `fetch()` use [WHATWG URL Standard](https://url.spec.whatwg.org/) parsing rules. The original implementation would throw `TypeError: Fetch API cannot load` errors with some URLs where standard parsing does not, for instance with the inclusion of whitespace before the URL. URL errors will now be thrown immediately upon calling `new Request()` with an improper URL. Previously, URL errors were thrown only once `fetch()` was called.
