---
_build:
  publishResources: false
  render: never
  list: never

name: "Disallowing importable environment"
sort_date: "2025-05-05"
enable_flag: "disallow_importable_env"
disable_flag: "allow_importable_env"
---

When the `disallow_importable_env` flag is enabled, Workers will not allow importing the
environment variables via the `cloudflare:workers` module and will not populate the
environment variables in the global `process.env` object when Node.js compatibility is
enabled.

There is no default enabled date for this flag.
