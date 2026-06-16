---
_build:
  publishResources: false
  render: never
  list: never

name: "Defer unhandled rejection processing to after microtask checkpoint"
sort_date: "2026-03-03"
enable_date: "2026-03-03"
enable_flag: "unhandled_rejection_after_microtask_checkpoint"
disable_flag: "no_unhandled_rejection_after_microtask_checkpoint"
---

When `unhandled_rejection_after_microtask_checkpoint` is enabled, `unhandledrejection` event processing is deferred until the microtask checkpoint completes. This avoids misfires on multi-tick promise chains where a rejection handler is added in a later microtask.

Previously, unhandled rejection processing could fire prematurely before all microtasks in the current checkpoint had been processed, leading to false `unhandledrejection` events for promises that were actually handled.
