---
_build:
  publishResources: false
  render: never
  list: never

name: "WritableStream abort clears pending write queue"
sort_date: "2024-09-02"
enable_date: "2024-09-02"
enable_flag: "internal_writable_stream_abort_clears_queue"
disable_flag: "internal_writable_stream_abort_does_not_clear_queue"
---

When using the original WritableStream implementation ("internal" streams), the `abort()` operation was previously handled lazily, meaning that the queue of pending writes would not be cleared until the next time the queue was processed. This behavior could cause the stream to hang if the consumer stopped consuming.

With `internal_writable_stream_abort_clears_queue` enabled, the queue is cleared immediately upon `abort()`, preventing hangs in cases where the consumer has stopped processing writes.
