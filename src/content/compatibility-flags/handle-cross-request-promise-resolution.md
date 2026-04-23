---
_build:
  publishResources: false
  render: never
  list: never

name: "Handle cross-request promise resolution correctly"
sort_date: "2024-10-14"
enable_date: "2024-10-14"
enable_flag: "handle_cross_request_promise_resolution"
disable_flag: "no_handle_cross_request_promise_resolution"
---

Historically, it was possible to resolve a promise from an incorrect request context, which could lead to promise continuations being scheduled in the wrong context, causing errors and difficult-to-diagnose bugs.

With `handle_cross_request_promise_resolution` enabled, promise continuations are scheduled to run in the correct request context if it is still alive, or dropped with a warning if the correct context has already ended.
