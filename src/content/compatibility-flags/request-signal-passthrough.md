---
_build:
  publishResources: false
  render: never
  list: never

name: "Passthrough AbortSignal of incoming request to subrequests"
sort_date: "2025-05-05"
enable_flag: "request_signal_passthrough"
disable_flag: "no_request_signal_passthrough"
---

When the `request_signal_passthrough` flag set, the `AbortSignal` of an incoming
request will be passed through to subrequests when the request is forwarded to
a subrequest using the `fetch()` API.

The the `no_request_signal_passthrough` flag is set, the `AbortSignal` of the
incoming request will not be passed through.
