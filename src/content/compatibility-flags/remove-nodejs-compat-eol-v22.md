---
_build:
  publishResources: false
  render: never
  list: never

name: "Remove Node.js 22.x end-of-life APIs"
sort_date: "2027-04-30"
enable_date: "2027-04-30"
enable_flag: "remove_nodejs_compat_eol_v22"
disable_flag: "add_nodejs_compat_eol_v22"
---

When `remove_nodejs_compat_eol_v22` is enabled, APIs that reached end-of-life in Node.js 22.x are removed.

This flag is automatically enabled when the `remove_nodejs_compat_eol` flag is enabled after 2027-04-30.
