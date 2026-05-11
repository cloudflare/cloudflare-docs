---
_build:
  publishResources: false
  render: never
  list: never

name: "Remove Node.js 23.x end-of-life APIs"
sort_date: "2025-09-01"
enable_date: "2025-09-01"
enable_flag: "remove_nodejs_compat_eol_v23"
disable_flag: "add_nodejs_compat_eol_v23"
---

When `remove_nodejs_compat_eol_v23` is enabled, APIs that reached end-of-life in Node.js 23.x (EOL June 2025) are removed.

This flag is automatically enabled when the `remove_nodejs_compat_eol_v24` flag is enabled after 2025-09-01.
