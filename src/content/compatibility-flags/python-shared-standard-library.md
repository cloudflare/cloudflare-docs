---
_build:
  publishResources: false
  render: never
  list: never

name: "Share Python standard library across Python Workers"
sort_date: "2026-11-19"
enable_date: "2026-11-19"
enable_flag: "python_shared_standard_library"
---

When this flag is set, Python standard library (`/lib/python3XX.zip`) is shared across multiple isolates through shared memory.
This reduces the memory footprint of Python Workers.

