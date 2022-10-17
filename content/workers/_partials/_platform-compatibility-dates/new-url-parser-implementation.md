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

The original Workers `URL` API implementation is not fully compliant with the [WHATWG URL Standard](https://url.spec.whatwg.org/). Cloudflare has added a new implementation that is fully compliant. However, since the new implementation is not completely backwards compatible, it is disabled by default. Use the `url_standard` flag to enable the new implementation.
