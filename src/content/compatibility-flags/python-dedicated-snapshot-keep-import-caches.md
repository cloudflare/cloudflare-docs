---
_build:
  publishResources: false
  render: never
  list: never

name: "Keep import caches in Python dedicated snapshots"
sort_date: "2026-12-10"
enable_date: "2026-12-10"
enable_flag: "python_dedicated_snapshot_keep_import_caches"
---

When this flag is set, Python Workers do not call `importlib.invalidate_caches()` when the snapshot is loaded.

This reduces the cold start time of Python Workers.
