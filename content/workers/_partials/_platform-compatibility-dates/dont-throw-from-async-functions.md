---
_build:
  publishResources: false
  render: never
  list: never

name: "Don't throw from async functions"
date: "2022-10-10"
enable_flag: "capture_async_api_throws"
disable_flag: "do_not_capture_async_api_throws"
---

The `capture_async_api_throws` compatibility flag will ensure that, in conformity with the standards API, async functions will only ever reject if they throw an error. The inverse `do_not_capture_async_api_throws` flag means that async functions which contain an error may throw that error synchronously rather than rejecting.
