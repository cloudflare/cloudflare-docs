---
_build:
  publishResources: false
  render: never
  list: never

name: "Expose error codes in Queue operations"
sort_date: "2026-03-12"
enable_date: "2026-03-12"
enable_flag: "queue_expose_error_codes"
disable_flag: "no_queue_expose_error_codes"
---

When `queue_expose_error_codes` is enabled, [Queue](/queues/) operations will include detailed error information, including error codes and causes, making it easier to handle and diagnose queue-related errors programmatically.
