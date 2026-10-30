---
name: "Enable `Request.signal` for incoming requests"
sort_date: "2026-11-12"
enable_date: "2026-11-12"
enable_flag: "enable_request_signal"
disable_flag: "disable_request_signal"
---

For compatibility dates on or after November 12, 2026, incoming [`Request`](/workers/runtime-apis/request/) objects provide an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/Request/signal) that fires an `abort` event when the client disconnects. You can listen for this event to perform cleanup or write logs before the invocation ends.

For earlier compatibility dates, add `enable_request_signal` to opt in. Add `disable_request_signal` to opt out, including with later compatibility dates.

This flag does not change `request_signal_passthrough`. Pass `request.signal` explicitly to APIs that accept a signal, such as [`fetch()`](/workers/runtime-apis/fetch/), to cancel that work when the client disconnects.
