---
_build:
  publishResources: false
  render: never
  list: never

name: "Spec-compliant `dispatchEvent()` exception handling"
sort_date: "2026-09-01"
enable_date: "2026-09-01"
enable_flag: "spec_compliant_dispatch_exceptions"
disable_flag: "no_spec_compliant_dispatch_exceptions"
---

Per the [DOM specification](https://dom.spec.whatwg.org/#dispatching-events), exceptions thrown by event listeners during `dispatchEvent()` should be reported (via the global `error` event and the console) but should not interrupt the dispatch or propagate to the `dispatchEvent()` caller. The remaining listeners for that event should still run.

The original Workers runtime implementation propagated the first listener exception and skipped all remaining listeners for that event. This affected the JS-visible `dispatchEvent()`, `AbortSignal` abort dispatch, and runtime-fired events on `WebSocket`, `EventSource`, and `MessagePort`.

When this flag is enabled, all of these event dispatch surfaces use the spec's report-and-continue semantics. A throwing listener's exception is reported on the global `error` event and logged to the console, but the dispatch continues through the remaining listeners. Top-level event delivery for Worker events (including legacy Service Worker syntax entry points such as `addEventListener("fetch", ...)`, as well as module-style `fetch()` and `scheduled()` handlers) is not affected and always propagates exceptions.
