---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable eval during startup"
sort_date: "2025-06-01"
enable_date: "2025-06-01"
enable_flag: "allow_eval_during_startup"
disable_flag: "disallow_eval_during_startup"
---

When the `allow_eval_during_startup` flag is set, Workers can use `eval()`
and `new Function(text)` during the startup phase of a Worker script. This
allows for dynamic code execution at the beginning of a Worker lifecycle.

When the `disallow_eval_during_startup` flag is set, using `eval()` or
`new Function(text)` during the startup phase will throw an error.
