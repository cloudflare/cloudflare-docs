---
_build:
  publishResources: false
  render: never
  list: never

name: "Disable global handlers for Python Workers"
sort_date: "2025-08-14"
enable_date: "2025-08-14"
enable_flag: "python_no_global_handlers"
disable_flag: "disable_python_no_global_handlers"
---

When the `python_no_global_handlers` flag is set, Python Workers will disable
the global handlers and enforce their use via default entrypoint classes.
