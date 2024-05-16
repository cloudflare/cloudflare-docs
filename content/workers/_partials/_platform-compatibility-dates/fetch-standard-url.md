---
_build:
  publishResources: false
  render: never
  list: never

name: "Standard URL parsing for the fetch API"
sort_date: "2024-06-03"
enable_date: "2024-06-03"
enable_flag: "fetch_standard_url"
disable_flag: "fetch_legacy_url"
---

In the original implementation of the `fetch()` API, the runtime would incorrectly parse URLs. Per the fetch specification, URLs are to be parsed using the WHATWG URL parsing algorithm. Further, the URL is expected to be parsed upon creation of the `Request` object using the constructor. Redirect URLs provided by a 30x redirection response are also to be parsed using the same algorithm.

When the `fetch_standard_url` flag is used, the `fetch()` API will implement the correct standard behavior.
