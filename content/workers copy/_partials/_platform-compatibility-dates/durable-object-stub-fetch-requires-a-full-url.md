---
_build:
  publishResources: false
  render: never
  list: never

name: "Durable Object `stub.fetch()` requires a full URL"
sort_date: "2021-11-10"
enable_date: "2021-11-10"
enable_flag: "durable_object_fetch_requires_full_url"
disable_flag: "durable_object_fetch_allows_relative_url"
---

Originally, when making a request to a Durable Object by calling `stub.fetch(url)`, a relative URL was accepted as an input. The URL would be interpreted relative to the dummy URL `http://fake-host`, and the resulting absolute URL was delivered to the destination object's `fetch()` handler. This was a mistake — full URLs were meant to be required. This flag makes full URLs required.
